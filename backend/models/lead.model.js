const mongoose = require("mongoose");

const LEAD_STATUSES = [
  "new",
  "contacted",
  "follow-up",
  "interested",
  "not-interested",
];

const LEAD_CATEGORIES = ["general", "important"];

const normalizeLeadStatus = (status) => {
  if (status === "qualified" || status === "won") return "interested";
  if (status === "lost") return "not-interested";
  return LEAD_STATUSES.includes(status) ? status : "new";
};

const normalizeLeadCategory = (category) => {
  const normalized = String(category || "").trim().toLowerCase();
  if (["important", "priority", "hot", "starred"].includes(normalized)) {
    return "important";
  }
  return LEAD_CATEGORIES.includes(normalized) ? normalized : "general";
};

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

    message: {
      type: String,
      trim: true,
    },

    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Lead Status
    verified: {
      type: Boolean,
      default: false,
    },

    source: {
      type: String,
      trim: true,
      default: "Website",
    },

    leadStatus: {
      type: String,
      enum: LEAD_STATUSES,
      set: normalizeLeadStatus,
      default: "new",
    },

    leadCategory: {
      type: String,
      enum: LEAD_CATEGORIES,
      set: normalizeLeadCategory,
      default: "general",
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    followUpRemark: {
      type: String,
      trim: true,
      default: "",
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    lastActivityAt: {
      type: Date,
      default: Date.now,
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

    activityLog: [
      {
        type: {
          type: String,
          enum: [
            "created",
            "assigned",
            "status",
            "note",
            "follow-up",
            "call",
            "whatsapp",
            "email",
            "site-visit",
            "quotation",
            "category",
          ],
          required: true,
        },
        message: {
          type: String,
          required: true,
          trim: true,
        },
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
          default: null,
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

leadSchema.pre("validate", function normalizeLegacyLeadStatus() {
  this.leadStatus = normalizeLeadStatus(this.leadStatus);
  this.leadCategory = normalizeLeadCategory(this.leadCategory);
});

leadSchema.index({ assignedTo: 1, leadStatus: 1, followUpDate: 1 });
leadSchema.index({ leadCategory: 1, createdAt: -1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
module.exports.LEAD_STATUSES = LEAD_STATUSES;
module.exports.LEAD_CATEGORIES = LEAD_CATEGORIES;
module.exports.normalizeLeadCategory = normalizeLeadCategory;
module.exports.normalizeLeadStatus = normalizeLeadStatus;
