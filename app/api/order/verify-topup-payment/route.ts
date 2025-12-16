import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { orderId } = await req.json();
    console.log("Verifying Order ID:", orderId);
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Missing orderId" });
    }

    // ----------------------------------
    // FETCH LOCAL ORDER
    // ----------------------------------
    let order = await Order.findOne({ orderId });
    
    console.log("Local Order:", order);

    if (!order) {
      return NextResponse.json({
        success: false,
        message: "Order not found",
      });
    }

    // If already successful, prevent duplicate topups
    if (order.status === "success") {
      return NextResponse.json({
        success: true,
        message: "Already processed",
        topupResponse: order.externalResponse,
      });
    }

    // ----------------------------------
    // CHECK PAYMENT STATUS VIA GATEWAY
    // ----------------------------------
    const formData = new URLSearchParams();
    formData.append("user_token", process.env.XTRA_USER_TOKEN!);
    formData.append("order_id", orderId);

    const resp = await fetch("https://xtragateway.site/api/check-order-status", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await resp.json();
    console.log("Gateway Response:", data);

    // ----------------------------------
    // FIXED SUCCESS CONDITIONS
    // ----------------------------------
    const isSuccess =
      data?.status == true ||
      data?.result?.txnStatus == "COMPLETED" ||
      data?.result?.txnStatus == "SUCCESS";

    if (!isSuccess) {
      order.status = "failed";
       order.paymentStatus = "failed";
      await order.save();

      return NextResponse.json({
        success: false,
        message: "Payment Failed or Pending",
      });
    }

    // ----------------------------------
    // PAYMENT SUCCESS
    // ----------------------------------
    // order.status = "success";
        order.paymentStatus = "success";

    order.gatewayResponse = data; // Store full raw API response
    await order.save();

    // ----------------------------------
    // EXTRACT USER + PRODUCT FROM ORDER
    // ----------------------------------
    const userId = data?.result?.remark1 || order.userId;      
    const productId = data?.result?.remark2 || order.itemSlug; 

    const externalPayload = {
      playerId: String(order.playerId),     // ✅ force string
  zoneId: String(order.zoneId),         // ✅ force string
  productId: `${order?.gameSlug}_${order?.itemSlug}`, // 🔒 REQUIRED
      currency:  "USD",
    };

    // ----------------------------------
    // CALL GAME API SERVICE
    // ----------------------------------
    const gameResp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api-service/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_SECRET_KEY!,
        },
        body: JSON.stringify(externalPayload),
      }
    );

    const gameData = await gameResp.json();
    console.log("GAME API RESPONSE:", gameData);
    console.log("EXTERNAL PAYLOAD:", externalPayload);

    // ----------------------------------
    // SAVE GAME API RESPONSE
    // ----------------------------------
const topupSuccess =
      gameResp.ok &&
      (gameData?.success === true ||
        gameData?.status === true ||
        gameData?.result?.status === "SUCCESS");

    order.externalResponse = gameData;
      if (topupSuccess) {
      order.topupStatus = "success";
      order.status = "success"; // ✅ FINAL SUCCESS
    } else {
      order.topupStatus = "failed";
      order.status = "failed";
    }
    await order.save();

    return NextResponse.json({
      success: true,
      message: "Topup successful",
      topupResponse: gameData,
    });


    
//     if (isTopupSuccess) {
//   order.topup = "success";  
// } else {
//   order.topup = "failed";    
// }
  } catch (error: any) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
