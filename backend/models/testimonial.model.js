const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["written", "video"],
      default: "written",
    },

    review: {
      type: String,
      default: "",
      trim: true,
    },

    youtubeUrl: {
      type: String,
      default: "",
      trim: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

testimonialSchema.pre("validate", function requireReviewOrVideo() {
  if (!this.type) {
    this.type = this.youtubeUrl ? "video" : "written";
  }

  if (this.type === "written") {
    this.youtubeUrl = "";
  }

  if (this.type === "video") {
    this.review = "";
  }

  if (this.type === "written" && !this.review) {
    this.invalidate("review", "Written review or YouTube link is required");
  }

  if (this.type === "video" && !this.youtubeUrl) {
    this.invalidate("youtubeUrl", "YouTube link is required");
  }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
