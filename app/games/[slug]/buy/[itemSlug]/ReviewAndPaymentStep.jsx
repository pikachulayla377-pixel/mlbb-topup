"use client";

import { useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import logo from "@/public/logo.png";

export default function ReviewAndPaymentStep({
  step,
  setStep,
  itemName,
  itemImage,
  price,
  discount,
  totalPrice,
  userEmail,
  userPhone,
  reviewData,
  walletBalance,
  paymentMethod,
  setPaymentMethod,
  onPaymentComplete,
  slug,
  itemSlug,
}) {
  const [upiQR, setUpiQR] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);


  // Generate UPI QR
  const handleUPI = async () => {
    setPaymentMethod("upi");

    const upiId = "yourupi@bank";
    const upiString = `upi://pay?pa=${upiId}&pn=YourStore&am=${totalPrice}&cu=INR`;

    const qr = await QRCode.toDataURL(upiString);
    setUpiQR(qr);
  };


  // Handle proceed to payment
const handleProceed = async () => {
  if (!paymentMethod) {
    alert("Please select a payment method");
    return;
  }

  setIsRedirecting(true); // 🔑 start loading

  try {
    const userId = localStorage.getItem("userId");
    const storedPhone = userPhone || localStorage.getItem("phone");

    if (!storedPhone) {
      alert("Phone number missing. Please log in again.");
      setIsRedirecting(false);
      return;
    }

    const orderPayload = {
      gameSlug: slug,
      itemSlug,
      itemName,
      playerId: reviewData.playerId,
      zoneId: reviewData.zoneId,
      paymentMethod,
      price: totalPrice,
      email: userEmail || null,
      phone: storedPhone,
      userId: userId || null,
      currency: "INR",
    };

    const res = await fetch("/api/order/create-gateway-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Order failed: " + data.message);
      setIsRedirecting(false);
      return;
    }

    localStorage.setItem("pending_topup_order", data.orderId);

    // 🚀 redirect
    window.location.href = data.paymentUrl;
  } catch (err) {
    alert("Something went wrong. Please try again.");
    setIsRedirecting(false);
  }
};



return (
  <div className="space-y-8">
    {/* STEP 2 */}
    {step === 2 && (
      <>
        {/* PAYMENT METHOD */}
        <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-black/40 to-black/20 p-5">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

          <div className="space-y-3">
            {/* Wallet */}
            <button
              disabled
              onClick={() => {
                if (walletBalance < totalPrice) return;
                setPaymentMethod("wallet");
              }}
              className={`w-full p-4 rounded-xl border transition-all text-left flex justify-between items-center
                ${
                  paymentMethod === "wallet"
                    ? "border-[var(--accent)] bg-[var(--accent)]/15"
                    : "border-gray-700 hover:border-gray-500"
                }
                ${walletBalance < totalPrice && "opacity-50 cursor-not-allowed"}
              `}
            >
              <span className="font-medium">Wallet</span>
              <span className="text-sm text-gray-300">₹{walletBalance}</span>
            </button>

            {walletBalance < totalPrice && (
              <p className="text-xs text-red-400">
                Insufficient balance (₹{totalPrice} required)
              </p>
            )}

            {/* UPI */}
            <button
              onClick={handleUPI}
              className={`w-full p-4 rounded-xl border transition-all text-left flex justify-between items-center
                ${
                  paymentMethod === "upi"
                    ? "border-[var(--accent)] bg-[var(--accent)]/15"
                    : "border-gray-700 hover:border-gray-500"
                }
              `}
            >
              <span className="font-medium">UPI / QR Payment</span>
              <span className="text-xs text-gray-400">Instant</span>
            </button>
          </div>
        </div>

    

        {/* USER DETAILS */}
     {/* USER DETAILS */}
<div className="border border-gray-700/60 rounded-xl bg-black/20 px-4 py-3">
  <h3 className="text-sm font-semibold mb-2 text-gray-200">Your Details</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
    <div className="flex justify-between gap-2">
      <span className="text-gray-400">Email</span>
      <span className="font-medium truncate">
        {userEmail || "Not provided"}
      </span>
    </div>

    <div className="flex justify-between gap-2">
      <span className="text-gray-400">Phone</span>
      <span className="font-medium">
        {userPhone || "Not provided"}
      </span>
    </div>
  </div>
</div>


        {/* GAME DETAILS */}
     {/* GAME DETAILS */}
<div className="border border-gray-700/60 rounded-xl bg-black/20 px-4 py-3">
  <h3 className="text-sm font-semibold mb-2 text-gray-200">
    Game Account
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
    <div className="flex justify-between gap-2">
      <span className="text-gray-400">Username</span>
      <span className="font-medium truncate">
        {reviewData.userName}
      </span>
    </div>

    <div className="flex justify-between gap-2">
      <span className="text-gray-400">Player ID</span>
      <span className="font-medium truncate">
        {reviewData.playerId}
      </span>
    </div>

    <div className="flex justify-between gap-2">
      <span className="text-gray-400">Zone</span>
      <span className="font-medium">
        {reviewData.zoneId}
      </span>
    </div>
  </div>
</div>

    {/* PRICE SUMMARY */}
        <div className="rounded-2xl border border-gray-700 bg-black/30 p-5">
          <h3 className="text-lg font-semibold mb-3">Order Summary</h3>

          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>₹{price}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-400">- ₹{discount}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-lg">Total</span>
            <span className="text-xl font-bold">₹{totalPrice}</span>
          </div>

          <button
            onClick={handleProceed}
            disabled={
              isRedirecting ||
              !paymentMethod ||
              (paymentMethod === "wallet" && walletBalance < totalPrice)
            }
            className="mt-5 w-full rounded-xl bg-[var(--accent)] text-black py-3 font-semibold
              transition-all hover:scale-[1.01] active:scale-[0.99]
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isRedirecting ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Redirecting…
              </>
            ) : (
              "Proceed to Pay"
            )}
          </button>
        </div>

      </>
    )}

    {/* STEP 3 */}
    {step === 3 && paymentMethod === "upi" && (
      <div className="rounded-2xl border border-gray-700 bg-black/30 p-6 text-center">
        <p className="font-semibold mb-3">Scan & Pay via UPI</p>

        <div className="w-52 h-52 mx-auto bg-white p-4 rounded-2xl shadow">
          {upiQR ? (
            <Image src={upiQR} alt="UPI QR" width={200} height={200} />
          ) : (
            <p className="text-sm">Generating QR…</p>
          )}
        </div>

        <button
          onClick={onPaymentComplete}
          className="mt-6 w-full py-3 rounded-xl bg-[var(--accent)] text-black font-semibold"
        >
          I Have Paid
        </button>
      </div>
    )}
  </div>
);

}