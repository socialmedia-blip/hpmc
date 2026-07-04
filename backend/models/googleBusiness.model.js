const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,
    text: String,
    author: String,
    authorPhoto: String,
    timeDescription: String,
    publishTime: String,
  },
  { _id: false },
);

const competitorSchema = new mongoose.Schema(
  {
    placeId: String,
    name: String,
    address: String,
    rating: Number,
    userRatingCount: Number,
    types: [String],
    lat: Number,
    lng: Number,
    googleMapsUri: String,
    searchRank: Number,
  },
  { _id: false },
);

const googleBusinessSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "default",
      unique: true,
    },
    placeId: String,
    placeName: String,
    formattedAddress: String,
    lat: Number,
    lng: Number,
    rating: Number,
    userRatingCount: Number,
    types: {
      type: [String],
      default: [],
    },
    businessStatus: String,
    websiteUri: String,
    googleMapsUri: String,
    phoneNumber: String,
    reviewsCache: {
      type: [reviewSchema],
      default: [],
    },
    reviewsCachedAt: Date,
    competitorsCache: {
      type: [competitorSchema],
      default: [],
    },
    competitorsCachedAt: Date,
    competitorsRadius: Number,
    searchRank: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("GoogleBusiness", googleBusinessSchema);
