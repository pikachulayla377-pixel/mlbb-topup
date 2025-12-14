"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AuthGuard from "../../../../../components/AuthGuard";
import ValidationStep from "./ValidationStep";
import ReviewAndPaymentStep from "./ReviewAndPaymentStep";
import { saveVerifiedPlayer } from "@/utils/storage/verifiedPlayerStorage";

export default function BuyFlowPage() {
  const { slug, itemSlug } = useParams();
  const params = useSearchParams();

  const [step, setStep] = useState(1);
  const [playerId, setPlayerId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showSuccess, setShowSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
const [loading, setLoading] = useState(false);

  // Load user data
  useEffect(() => {
    setUserEmail(localStorage.getItem("email") || "");
    setUserPhone(localStorage.getItem("phone") || "");
    setWalletBalance(Number(localStorage.getItem("walletBalance") || 0));
  }, []);

  // Item data
  const itemName = params.get("name");
  const price = Number(params.get("price"));
  const discount = Number(params.get("discount"));
  const totalPrice = price - discount;
  const itemImage = params.get("image");

  // Validation handler
  const handleValidate = async () => {
    if (!playerId || !zoneId) {
      alert("Please enter Player ID and Zone ID");
      return;
    }
      setLoading(true);


    const res = await fetch("/api/check-region", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: playerId, zone: zoneId }),
    });

    const data = await res.json();

    if (data?.success !== 200) {
      alert("Invalid Player ID / Zone ID");
      return;
    }
     saveVerifiedPlayer({
    playerId,
    zoneId,
    username: data.data.username,
    region: data.data.region,
    savedAt: Date.now(),
  });

    setReviewData({
      userName: data.data.username,
      region: data.data.region,
      playerId,
      zoneId,
    });
   
    setLoading(false);
  

    setStep(2);
  };

  // Payment complete
  const handlePayment = async () => {
    setTimeout(() => setShowSuccess(true), 500);
  };

  return (
    <AuthGuard>
      <section className="px-6 py-8 max-w-3xl mx-auto">
      {/* Selected Item */}
{itemName && (
  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
    {itemImage && (
      <img
        src={itemImage}
        alt={itemName}
        className="w-14 h-14 rounded-lg object-cover"
      />
    )}

    <div className="flex-1">
      <p className="text-sm text-[var(--muted)]">Selected Item</p>
      <h3 className="font-semibold text-base">{itemName}</h3>

      <div className="text-sm mt-1">
        <span className="text-[var(--accent)] font-medium">
          ₹{totalPrice}
        </span>

        {discount > 0 && (
          <span className="ml-2 line-through text-gray-500 text-xs">
            ₹{price}
          </span>
        )}
      </div>
    </div>
  </div>
)}

        {/* Step Indicator */}
        <div className="relative flex items-center justify-between mb-10">
          <div className="absolute top-[31%] left-[15%] w-[70%] h-[3px] bg-gray-700 -z-0 rounded-full">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500 rounded-full"
              style={{
                width:
                  step === 1 ? "0%" :
                  step === 2 ? "50%" :
                  step === 3 ? "100%" : "0%",
              }}
            ></div>
          </div>

          {[1, 2, 3].map((num) => (
            <div key={num} className="relative z-10 flex flex-col items-center w-1/3">
              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm
                  transition-all duration-300
                  ${step >= num
                    ? "border-[var(--accent)] bg-[var(--accent)] text-black shadow-md"
                    : "border-gray-600 bg-[var(--card)] text-gray-400"}
                `}
              >
                {num}
              </div>

              <p
                className={`text-sm mt-2 ${
                  step >= num ? "text-[var(--accent)]" : "text-gray-500"
                }`}
              >
                {num === 1 ? "Validate" : num === 2 ? "Review" : "Payment"}
              </p>
            </div>
          ))}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-600/20 border border-green-600 text-green-500 p-6 rounded-xl text-center shadow-lg">
            <h2 className="text-xl font-bold">Payment Successful! ✔</h2>
            <p className="text-sm mt-2 opacity-80">Your order has been placed.</p>
          </div>
        )}

        {!showSuccess && (
          <>
            {/* Step 1: Validation */}
            {step === 1 && (
              <ValidationStep
                playerId={playerId}
                setPlayerId={setPlayerId}
                zoneId={zoneId}
                setZoneId={setZoneId}
                onValidate={handleValidate}
                loading={loading} // 👈 PASS HERE

              />
            )}

            {/* Steps 2 & 3: Review & Payment */}
            {(step === 2 || step === 3) && reviewData && (
              <ReviewAndPaymentStep
                step={step}
                setStep={setStep}
                itemName={itemName}
                itemImage={itemImage}
                price={price}
                discount={discount}
                totalPrice={totalPrice}
                userEmail={userEmail}
                userPhone={userPhone}
                reviewData={reviewData}
                walletBalance={walletBalance}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onPaymentComplete={handlePayment}
                slug={slug}
                itemSlug={itemSlug}
              />
            )}
          </>
        )}
      </section>
    </AuthGuard>
  );
}