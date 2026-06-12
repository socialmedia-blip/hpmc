const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
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
      trim: true,
      required: [true, "Company name is required"],
    },

    products: [
      {
        type: String,
        trim: true,
      },
    ],

    message: {
      type: String,
      trim: true,
    },

    // Lead Status
    verified: {
      type: Boolean,
      default: false,
    },

    marked: {
      type: Boolean,
      default: false,
    },

    leadStatus: {
      type: String,
      enum: ["new", "contacted", "follow-up", "qualified", "won", "lost"],
      default: "new",
    },

    notes: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },

        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Lead", leadSchema);
