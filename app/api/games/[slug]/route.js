import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/* ================= PRICE RULES ================= */
const getMarkupPercentByPrice = (userType, price) => {
  const p = Number(price);

  // OWNER → always base price
  if (userType === "owner") return 0;

  // ADMIN PRICING
  if (userType === "admin") {
    if (p < 100) return 0.5;
    if (p < 200) return 1;
    if (p < 500) return 1.5;
    if (p < 700) return 2;
    return 3;
  }

  // NORMAL USER PRICING
  if (p < 100) return 1;
  if (p < 200) return 2;
  if (p < 500) return 3;
  if (p < 700) return 4;
  return 7;
};

export async function GET(req, context) {
  const { slug } =await  context.params;

  try {
    /* ================= OPTIONAL JWT ================= */
    let userType = "user"; // default

    const authHeader = req.headers.get("authorization");
    console.log("Auth Header:", authHeader);

    if (authHeader?.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded?.userType) {
          userType = decoded.userType;
        }

        console.log("JWT received:", {
          userId: decoded.userId,
          userType,
        });
      } catch {
        console.log("Invalid JWT → using user pricing");
      }
    }

    /* ================= FETCH GAME ================= */
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/game/${slug}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_SECRET_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data?.data?.itemId) {
      return NextResponse.json(data);
    }

    /* ================= APPLY DYNAMIC MARKUP ================= */
    data.data.itemId = data.data.itemId.map((item) => {
      const basePrice = Number(item.sellingPrice);
      const markupPercent = getMarkupPercentByPrice(userType, basePrice);

      const finalPrice =
        markupPercent === 0
          ? basePrice
          : Math.ceil(basePrice * (1 + markupPercent / 100));

      return {
        ...item,
        sellingPrice: finalPrice,
        // Optional debug info (remove later if not needed)
        _pricing: {
          basePrice,
          markupPercent,
          userType,
        },
      };
    });

    return NextResponse.json(data);

  } catch (error) {
    console.error("Game Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
