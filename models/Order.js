import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String,required: true, unique: true },
    gameSlug: String,
    itemSlug: String,
    itemName: String,
    playerId: String,
    zoneId: String,
    paymentMethod: String,
    price: Number,
    email: String,
    phone: String,
    status: {
      type: String,
      enum: [
        "pending", "success", "failed",    // lowercase
        "PENDING", "SUCCESS", "FAILED"     // uppercase (optional)
      ],
      default: "pending"
    },
     // ✅ NEW: Top-up status
    topup: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
