const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    // Business Information
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    businessType: {
      type: String,
      enum: [
        "Distributor",
        "Dealer",
        "Trader",
        "Manufacturer",
        "Wholesaler",
        "Other",
      ],
      required: true,
    },

    experience: {
      type: Number,
      min: 0,
    },

    // Location
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    // Business Details
    currentProducts: {
      type: String,
      trim: true,
    },

    monthlyRequirement: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    // Admin Status
    status: {
      type: String,
      enum: ["pending", "contacted", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Agent", agentSchema);
