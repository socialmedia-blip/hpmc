const axios = require("axios");

const PLACES_API_BASE = "https://places.googleapis.com/v1";

const SEARCH_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.types",
  "places.businessStatus",
  "places.googleMapsUri",
].join(",");

const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "location",
  "rating",
  "userRatingCount",
  "reviews",
  "types",
  "businessStatus",
  "websiteUri",
  "googleMapsUri",
  "internationalPhoneNumber",
  "regularOpeningHours",
].join(",");

function getPlacesApiKey() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    const error = new Error(
      "GOOGLE_PLACES_API_KEY is not configured in backend .env",
    );
    error.statusCode = 400;
    throw error;
  }

  return apiKey;
}

function getHeaders(fieldMask) {
  return {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": getPlacesApiKey(),
    "X-Goog-FieldMask": fieldMask,
  };
}

function getGoogleError(error, fallback) {
  return (
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

async function textSearch(query, maxResults = 10) {
  try {
    const response = await axios.post(
      `${PLACES_API_BASE}/places:searchText`,
      {
        textQuery: query,
        maxResultCount: Math.min(Math.max(maxResults, 1), 20),
      },
      { headers: getHeaders(SEARCH_FIELD_MASK), timeout: 30000 },
    );

    return response.data;
  } catch (error) {
    const message = getGoogleError(error, "Google Places search failed");
    const wrapped = new Error(message);
    wrapped.statusCode = error?.response?.status || 502;
    throw wrapped;
  }
}

async function getPlaceDetails(placeId) {
  try {
    const response = await axios.get(`${PLACES_API_BASE}/places/${placeId}`, {
      headers: getHeaders(DETAILS_FIELD_MASK),
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    const message = getGoogleError(error, "Google Place details failed");
    const wrapped = new Error(message);
    wrapped.statusCode = error?.response?.status || 502;
    throw wrapped;
  }
}

async function nearbySearch(lat, lng, includedTypes, radius = 5000) {
  try {
    const body = {
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius,
        },
      },
      maxResultCount: 20,
    };

    if (includedTypes?.length) {
      body.includedTypes = includedTypes;
    }

    const response = await axios.post(
      `${PLACES_API_BASE}/places:searchNearby`,
      body,
      { headers: getHeaders(SEARCH_FIELD_MASK), timeout: 30000 },
    );

    return response.data;
  } catch (error) {
    const message = getGoogleError(error, "Google nearby search failed");
    const wrapped = new Error(message);
    wrapped.statusCode = error?.response?.status || 502;
    throw wrapped;
  }
}

module.exports = {
  getPlaceDetails,
  nearbySearch,
  textSearch,
};
