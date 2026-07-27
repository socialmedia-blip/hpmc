const mongoose = require("mongoose");

const landingLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    landingPage: { type: String, required: true, trim: true },
    source: { type: String, trim: true, default: "Landing page" },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true },
);

landingLeadSchema.index({ email: 1, landingPage: 1, createdAt: -1 });

module.exports = mongoose.model("LandingLead", landingLeadSchema);
