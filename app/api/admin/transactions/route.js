import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    /* ================= AUTH ================= */
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Owner only (same as orders API)
    if (decoded.userType !== "owner") {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    /* ================= FETCH SUCCESS TRANSACTIONS ================= */
    const transactions = await Order.find({
      paymentStatus: { $in: ["success", "completed", "paid"] }, // 👈 adjust if needed
    })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    console.error("Transaction API Error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
