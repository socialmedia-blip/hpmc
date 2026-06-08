const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    currentLocation: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    currentCompany: {
      type: String,
      trim: true,
    },

    currentCTC: {
      type: String,
      trim: true,
    },

    expectedCTC: {
      type: String,
      trim: true,
    },

    noticePeriod: {
      type: String,
      trim: true,
    },

    coverLetter: {
      type: String,
      trim: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected", "hired"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
