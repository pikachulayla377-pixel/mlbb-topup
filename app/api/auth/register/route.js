import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateUserId } from "@/lib/generateUserId";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, email, phone, password } = body;

    /* ================= BASIC VALIDATION ================= */
    if (!name || !email || !phone || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    /* ================= CHECK EXISTING USER ================= */
    const exists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exists) {
      return Response.json(
        { success: false, message: "Email or phone already registered" },
        { status: 400 }
      );
    }

    /* ================= HASH PASSWORD ================= */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ================= GENERATE USER ID ================= */
    const userId = generateUserId(name, phone);

    /* ================= CREATE USER ================= */
    await User.create({
      userId,
      name,
      email,
      phone,
      password: hashedPassword, // 🔐 hashed
      wallet: 0,
      order: 0,
      userType: "user", // 🔒 default role
    });

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
