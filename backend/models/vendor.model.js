const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    // Contact Person
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

    // Company Details
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    businessType: {
      type: String,
      enum: [
        "Manufacturer",
        "Trader",
        "Service Provider",
        "Raw Material Supplier",
        "Transporter",
        "Other",
      ],
      required: true,
    },

    // Address
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
    },

    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
    },

    state: {
      type: String,
      trim: true,
      required: [true, "State is required"],
    },

    country: {
      type: String,
      trim: true,
      required: [true, "Country is required"],
    },

    pincode: {
      type: String,
      trim: true,
    },

    // Business Information
    productsServices: {
      type: String,
      trim: true,
      required: [true, "Products/Services are required"],
    },

    experience: {
      type: Number,
      min: 0,
    },

    website: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    // Approval Status
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Vendor", vendorSchema);
