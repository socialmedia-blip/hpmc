const GoogleBusiness = require("../models/googleBusiness.model");
const {
  getPlaceDetails,
  nearbySearch,
  textSearch,
} = require("../lib/googlePlaces");

const DEFAULT_KEY = "default";
const GENERIC_TYPES = new Set([
  "point_of_interest",
  "establishment",
  "political",
  "locality",
  "premise",
  "subpremise",
  "route",
]);

function handleError(res, error, fallback) {
  console.error(fallback, error);

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || fallback,
  });
}

function normalizePlace(place) {
  return {
    place_id: place.id,
    name: place.displayName?.text || "",
    address: place.formattedAddress || "",
    rating: place.rating || 0,
    user_rating_count: place.userRatingCount || 0,
    types: place.types || [],
    lat: place.location?.latitude,
    lng: place.location?.longitude,
    business_status: place.businessStatus,
    google_maps_uri: place.googleMapsUri,
  };
}

function normalizeReview(review) {
  const text =
    typeof review.text === "object" ? review.text?.text : review.text || "";

  return {
    rating: review.rating || 0,
    text,
    author: review.authorAttribution?.displayName || "Anonymous",
    authorPhoto: review.authorAttribution?.photoUri || "",
    timeDescription: review.relativePublishTimeDescription || "",
    publishTime: review.publishTime || "",
  };
}

function businessPayload(doc) {
  if (!doc?.placeId) return null;

  return {
    place_id: doc.placeId,
    name: doc.placeName,
    address: doc.formattedAddress,
    rating: doc.rating || 0,
    user_rating_count: doc.userRatingCount || 0,
    types: doc.types || [],
    website_uri: doc.websiteUri,
    google_maps_uri: doc.googleMapsUri,
    phone_number: doc.phoneNumber,
    lat: doc.lat,
    lng: doc.lng,
    business_status: doc.businessStatus,
  };
}

async function getStoredBusiness() {
  return GoogleBusiness.findOne({ key: DEFAULT_KEY });
}

function estimateRatingDistribution(avgRating, totalCount, reviews) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!totalCount) return distribution;

  reviews.forEach((review) => {
    const rating = Number(review.rating);
    if (rating >= 1 && rating <= 5) distribution[rating] += 1;
  });

  const remaining = Math.max(0, totalCount - reviews.length);
  if (!remaining) return distribution;

  const sampleSum = reviews.reduce(
    (sum, review) => sum + (Number(review.rating) || 0),
    0,
  );
  const targetSum = avgRating * totalCount - sampleSum;
  const weights = {};

  for (let star = 1; star <= 5; star += 1) {
    const distance = Math.abs(star - avgRating);
    weights[star] = Math.max(0.05, Math.exp(-distance * 1.2));
  }

  const totalWeight = Object.values(weights).reduce(
    (sum, weight) => sum + weight,
    0,
  );

  for (let star = 1; star <= 5; star += 1) {
    const count = Math.round((remaining * weights[star]) / totalWeight);
    distribution[star] += count;
  }

  const diff = totalCount - Object.values(distribution).reduce((a, b) => a + b, 0);
  if (diff !== 0) {
    const nearestStar = Math.max(1, Math.min(5, Math.round(targetSum / remaining)));
    distribution[nearestStar] += diff;
  }

  return distribution;
}

function getReviewsForTarget(avgRating, totalReviews, targetRating) {
  if (!totalReviews || avgRating >= targetRating) return 0;

  const needed =
    (targetRating * totalReviews - avgRating * totalReviews) /
    (5 - targetRating);

  return Math.max(0, Math.ceil(needed));
}

function getSpecificTypes(types = []) {
  return types.filter((type) => !GENERIC_TYPES.has(type));
}

function computePerformanceScore(doc, competitors) {
  const rating = doc.rating || 0;
  const reviewCount = doc.userRatingCount || 0;
  const ratingScore = rating ? Math.min(30, (rating / 5) * 30) : 0;
  const volumeScore =
    reviewCount > 0 ? Math.min(25, Math.log10(reviewCount + 1) * 10) : 0;
  const completenessScore =
    (doc.websiteUri ? 10 : 0) + (doc.phoneNumber ? 10 : 0);
  let competitiveScore = 25;

  if (competitors.length) {
    const betterCount = competitors.filter(
      (competitor) => (competitor.rating || 0) > rating,
    ).length;
    competitiveScore = Math.max(0, 25 - (betterCount / competitors.length) * 25);
  }

  return {
    total_score: Math.min(
      100,
      Math.round(
        ratingScore + volumeScore + completenessScore + competitiveScore,
      ),
    ),
    rating_score: Math.round(ratingScore),
    volume_score: Math.round(volumeScore),
    completeness_score: Math.round(completenessScore),
    competitive_score: Math.round(competitiveScore),
  };
}

function scoreSentiment(reviews) {
  if (!reviews.length) {
    return {
      overall_sentiment: "neutral",
      positive_percentage: 0,
      neutral_percentage: 0,
      negative_percentage: 0,
      summary: "No review text is available yet for sentiment analysis.",
      strengths: [],
      complaints: [],
      common_themes: [],
    };
  }

  const counts = { positive: 0, neutral: 0, negative: 0 };

  reviews.forEach((review) => {
    if ((review.rating || 0) >= 4) counts.positive += 1;
    else if ((review.rating || 0) === 3) counts.neutral += 1;
    else counts.negative += 1;
  });

  const total = reviews.length;
  const positive = Math.round((counts.positive / total) * 100);
  const neutral = Math.round((counts.neutral / total) * 100);
  const negative = Math.max(0, 100 - positive - neutral);

  return {
    overall_sentiment:
      positive >= 65 ? "positive" : negative >= 35 ? "negative" : "neutral",
    positive_percentage: positive,
    neutral_percentage: neutral,
    negative_percentage: negative,
    summary:
      positive >= 65
        ? "Recent public reviews are mostly positive based on star ratings."
        : "Recent public reviews are mixed and should be monitored closely.",
    strengths: ["Service quality", "Response experience", "Product guidance"],
    complaints:
      negative > 0 ? ["Some customers may need faster follow-up"] : [],
    common_themes: ["Support", "Quality", "Communication"],
  };
}

exports.getStatus = async (req, res) => {
  try {
    const doc = await getStoredBusiness();

    return res.status(200).json({
      success: true,
      configured: Boolean(doc?.placeId),
      has_api_key: Boolean(process.env.GOOGLE_PLACES_API_KEY),
      business: businessPayload(doc),
    });
  } catch (error) {
    return handleError(res, error, "GET GOOGLE BUSINESS STATUS ERROR");
  }
};

exports.searchBusinesses = async (req, res) => {
  try {
    const query = String(req.body?.query || "").trim();
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const result = await textSearch(query, 10);
    const places = (result.places || []).map(normalizePlace);

    return res.status(200).json({
      success: true,
      places,
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS SEARCH ERROR");
  }
};

exports.selectBusiness = async (req, res) => {
  try {
    const placeId = String(req.body?.place_id || "").trim();
    if (!placeId) {
      return res.status(400).json({
        success: false,
        message: "Place ID is required",
      });
    }

    const details = await getPlaceDetails(placeId);
    const reviews = (details.reviews || []).map(normalizeReview);

    const update = {
      key: DEFAULT_KEY,
      placeId,
      placeName: details.displayName?.text || "",
      formattedAddress: details.formattedAddress || "",
      lat: details.location?.latitude,
      lng: details.location?.longitude,
      rating: details.rating || 0,
      userRatingCount: details.userRatingCount || 0,
      types: details.types || [],
      businessStatus: details.businessStatus,
      websiteUri: details.websiteUri,
      googleMapsUri: details.googleMapsUri,
      phoneNumber: details.internationalPhoneNumber,
      reviewsCache: reviews,
      reviewsCachedAt: new Date(),
      competitorsCache: [],
      competitorsCachedAt: null,
      competitorsRadius: null,
      searchRank: null,
    };

    const doc = await GoogleBusiness.findOneAndUpdate(
      { key: DEFAULT_KEY },
      { $set: update },
      { new: true, upsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Business connected successfully",
      business: businessPayload(doc),
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS SELECT ERROR");
  }
};

exports.removeBusiness = async (req, res) => {
  try {
    await GoogleBusiness.findOneAndUpdate(
      { key: DEFAULT_KEY },
      {
        $unset: {
          placeId: "",
          placeName: "",
          formattedAddress: "",
          lat: "",
          lng: "",
          rating: "",
          userRatingCount: "",
          types: "",
          businessStatus: "",
          websiteUri: "",
          googleMapsUri: "",
          phoneNumber: "",
          reviewsCache: "",
          reviewsCachedAt: "",
          competitorsCache: "",
          competitorsCachedAt: "",
          competitorsRadius: "",
          searchRank: "",
        },
      },
      { upsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Business disconnected successfully",
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS REMOVE ERROR");
  }
};

exports.getReviewStats = async (req, res) => {
  try {
    const doc = await getStoredBusiness();
    if (!doc?.placeId) {
      return res.status(400).json({
        success: false,
        message: "No business connected",
      });
    }

    let reviews = doc.reviewsCache || [];

    if (req.query.refresh === "true") {
      const details = await getPlaceDetails(doc.placeId);
      reviews = (details.reviews || []).map(normalizeReview);

      doc.rating = details.rating || doc.rating;
      doc.userRatingCount = details.userRatingCount || doc.userRatingCount;
      doc.reviewsCache = reviews;
      doc.reviewsCachedAt = new Date();
      await doc.save();
    }

    const averageRating = doc.rating || 0;
    const totalReviews = doc.userRatingCount || 0;
    const targetRating = 4.9;
    const distribution = estimateRatingDistribution(
      averageRating,
      totalReviews,
      reviews,
    );

    return res.status(200).json({
      success: true,
      average_rating: averageRating,
      total_reviews: totalReviews,
      target_rating: targetRating,
      reviews_for_target: getReviewsForTarget(
        averageRating,
        totalReviews,
        targetRating,
      ),
      distribution,
      reviews,
      cached_at: doc.reviewsCachedAt,
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS REVIEW STATS ERROR");
  }
};

exports.getCompetitors = async (req, res) => {
  try {
    const doc = await getStoredBusiness();
    if (!doc?.placeId) {
      return res.status(400).json({
        success: false,
        message: "No business connected",
      });
    }

    const radius = Math.min(
      Math.max(Number(req.query.radius) || 5000, 500),
      50000,
    );
    const useCache =
      req.query.refresh !== "true" &&
      doc.competitorsCache?.length &&
      doc.competitorsRadius === radius;

    if (useCache) {
      return res.status(200).json({
        success: true,
        competitors: doc.competitorsCache,
        search_rank: doc.searchRank || 0,
        total_in_area: doc.competitorsCache.length + 1,
        radius,
        cached_at: doc.competitorsCachedAt,
      });
    }

    const specificTypes = getSpecificTypes(doc.types || []);
    const result = await nearbySearch(
      doc.lat,
      doc.lng,
      specificTypes.slice(0, 1),
      radius,
    );

    const competitors = (result.places || [])
      .filter((place) => place.id !== doc.placeId)
      .map((place, index) => ({
        placeId: place.id,
        name: place.displayName?.text || "",
        address: place.formattedAddress || "",
        rating: place.rating || 0,
        userRatingCount: place.userRatingCount || 0,
        types: place.types || [],
        lat: place.location?.latitude,
        lng: place.location?.longitude,
        googleMapsUri: place.googleMapsUri,
        searchRank: index + 1,
      }))
      .sort(
        (a, b) =>
          (b.rating || 0) - (a.rating || 0) ||
          (b.userRatingCount || 0) - (a.userRatingCount || 0),
      );

    const ourRank =
      competitors.filter(
        (competitor) =>
          (competitor.rating || 0) > (doc.rating || 0) ||
          ((competitor.rating || 0) === (doc.rating || 0) &&
            (competitor.userRatingCount || 0) > (doc.userRatingCount || 0)),
      ).length + 1;

    doc.competitorsCache = competitors;
    doc.competitorsCachedAt = new Date();
    doc.competitorsRadius = radius;
    doc.searchRank = ourRank;
    await doc.save();

    return res.status(200).json({
      success: true,
      competitors,
      search_rank: ourRank,
      total_in_area: competitors.length + 1,
      radius,
      cached_at: doc.competitorsCachedAt,
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS COMPETITORS ERROR");
  }
};

exports.getPerformance = async (req, res) => {
  try {
    const doc = await getStoredBusiness();
    if (!doc?.placeId) {
      return res.status(400).json({
        success: false,
        message: "No business connected",
      });
    }

    const competitors = doc.competitorsCache || [];
    const keywords = getSpecificTypes(doc.types || []).map((type) =>
      type.replace(/_/g, " "),
    );

    return res.status(200).json({
      success: true,
      score: computePerformanceScore(doc, competitors),
      rank: doc.searchRank || 0,
      total_in_area: competitors.length + 1,
      keywords,
      business_name: doc.placeName,
      rating: doc.rating || 0,
      user_rating_count: doc.userRatingCount || 0,
      has_website: Boolean(doc.websiteUri),
      has_phone: Boolean(doc.phoneNumber),
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS PERFORMANCE ERROR");
  }
};

exports.getSentiment = async (req, res) => {
  try {
    const doc = await getStoredBusiness();
    if (!doc?.placeId) {
      return res.status(400).json({
        success: false,
        message: "No business connected",
      });
    }

    return res.status(200).json({
      success: true,
      sentiment: scoreSentiment(doc.reviewsCache || []),
    });
  } catch (error) {
    return handleError(res, error, "GOOGLE BUSINESS SENTIMENT ERROR");
  }
};
