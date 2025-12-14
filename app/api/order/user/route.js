import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    /* ================= AUTH ================= */
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT error:", err.message);
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    /* ================= USER ================= */
    const user = await User.findById(decoded.userId).lean();

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log("🔐 Authenticated user:", {
      userId: user.userId,
      email: user.email,
      phone: user.phone,
    });

    /* ================= BUILD STRICT FILTER ================= */
    let filter = {};

    if (user.email && user.phone) {
      // MOST STRICT (recommended)
      filter = {
        email: user.email,
        phone: user.phone,
      };
    } else if (user.email) {
      filter = { email: user.email };
    } else if (user.phone) {
      filter = { phone: user.phone };
    } else {
      return Response.json(
        { success: false, message: "User has no identifiers" },
        { status: 400 }
      );
    }

    console.log("📦 Order filter:", filter);

    /* ================= FETCH ORDERS ================= */
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    console.log(`✅ Orders returned: ${orders.length}`);

    return Response.json(
      {
        success: true,
        orders,
        count: orders.length,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
