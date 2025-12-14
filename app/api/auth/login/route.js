import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { user, password } = body; // email or phone

    if (!user || !password) {
      return Response.json(
        { success: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    const foundUser = await User.findOne({
      $or: [{ email: user }, { phone: user }],
    });

    if (!foundUser) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* ================= PASSWORD CHECK ================= */
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* ================= JWT GENERATION ================= */
    const token = jwt.sign(
      {
        userId: foundUser._id,
        userType: foundUser.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    /* ================= RESPONSE ================= */
    return Response.json(
      {
        success: true,
        message: "Login success",
        token, // 🔐 frontend must use this
        user: {
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          userId: foundUser.userId,
          userType: foundUser.userType,
          // wallet/order intentionally excluded from authority
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
