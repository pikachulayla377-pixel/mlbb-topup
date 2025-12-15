import { connectDB } from "@/lib/mongodb";
import PricingConfig from "@/models/PricingConfig";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

/* ================= AUTH HELPER ================= */
const requireAdminOrOwner = (req) => {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!["owner", "admin"].includes(decoded.userType)) {
      return { error: "Forbidden", status: 403 };
    }

    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
};

/* =================================================
   GET → Fetch pricing (slabs + overrides)
   ================================================= */
export async function GET(req) {
  try {
    await connectDB();

    const authCheck = requireAdminOrOwner(req);
    if (authCheck.error) {
      return NextResponse.json(
        { success: false, message: authCheck.error },
        { status: authCheck.status }
      );
    }

    const { searchParams } = new URL(req.url);
    const userType = searchParams.get("userType");

    if (!userType) {
      return NextResponse.json(
        { success: false, message: "userType is required" },
        { status: 400 }
      );
    }

    const pricing = await PricingConfig.findOne({ userType }).lean();

    return NextResponse.json({
      success: true,
      data: {
        slabs: pricing?.slabs || [],
        overrides: pricing?.overrides || [],
      },
    });
  } catch (err) {
    console.error("GET pricing error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

/* =================================================
   PATCH → Save pricing (slabs + overrides)
   ================================================= */
export async function PATCH(req) {
  try {
    await connectDB();

    const authCheck = requireAdminOrOwner(req);
    if (authCheck.error) {
      return NextResponse.json(
        { success: false, message: authCheck.error },
        { status: authCheck.status }
      );
    }

    const { userType, slabs = [], overrides = [] } = await req.json();

    if (!userType) {
      return NextResponse.json(
        { success: false, message: "userType is required" },
        { status: 400 }
      );
    }

    /* ================= VALIDATE SLABS ================= */
    for (const s of slabs) {
      if (
        typeof s.min !== "number" ||
        typeof s.max !== "number" ||
        typeof s.percent !== "number"
      ) {
        return NextResponse.json(
          { success: false, message: "Invalid slab format" },
          { status: 400 }
        );
      }
    }

    /* ================= VALIDATE OVERRIDES ================= */
    for (const o of overrides) {
      if (
        !o.gameSlug ||
        !o.itemSlug ||
        typeof o.fixedPrice !== "number" ||
        o.fixedPrice < 0
      ) {
        return NextResponse.json(
          { success: false, message: "Invalid override format" },
          { status: 400 }
        );
      }
    }

    const updated = await PricingConfig.findOneAndUpdate(
      { userType },
      {
        $set: {
          slabs,
          overrides,
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error("PATCH pricing error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
