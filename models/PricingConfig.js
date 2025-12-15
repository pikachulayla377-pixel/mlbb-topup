import mongoose from "mongoose";

const PricingConfigSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      unique: true,
    },

    /* ================= SLAB PRICING (EXISTING) ================= */
    slabs: [
      {
        min: { type: Number, required: true },     // inclusive
        max: { type: Number, required: true },     // exclusive
        percent: { type: Number, required: true }, // markup %
      },
    ],

    /* ================= FIXED PRICE OVERRIDES (NEW) ================= */
    overrides: [
      {
        gameSlug: {
          type: String,
          required: true,
          index: true,
        },
        itemSlug: {
          type: String,
          required: true,
        },
        fixedPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

/* ================= OPTIONAL SAFETY ================= */
/* Prevent duplicate override for same game+item */
PricingConfigSchema.index(
  { userType: 1, "overrides.gameSlug": 1, "overrides.itemSlug": 1 },
  { unique: true, sparse: true }
);

export default mongoose.models.PricingConfig ||
  mongoose.model("PricingConfig", PricingConfigSchema);
