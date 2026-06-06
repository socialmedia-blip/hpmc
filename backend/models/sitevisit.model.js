const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema(
  {
    // Customer Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    // Site Visit Details
    visitDateTime: {
      type: Date,
      required: [true, "Visit date and time is required"],
    },

    message: {
      type: String,
      trim: true,
    },

    // Visit Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SiteVisit", siteVisitSchema);
