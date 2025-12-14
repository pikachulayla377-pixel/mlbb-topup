import mongoose from "mongoose";

const SupportQuerySchema = new mongoose.Schema(
  {
    email: { type: String, default: null },
    phone: { type: String, default: null },
    type: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.SupportQuery ||
  mongoose.model("SupportQuery", SupportQuerySchema);
