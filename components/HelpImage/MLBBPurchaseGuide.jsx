"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  FaShoppingCart,
  FaIdCard,
  FaWallet,
  FaMoneyBillWave,
  FaGem
} from "react-icons/fa";

const steps = [
  {
    title: "Select Diamond Package",
    icon: FaShoppingCart,
    content: "Choose the diamond pack you want to purchase."
  },
  {
    title: "Enter User ID and Zone ID",
    icon: FaIdCard,
    content: "Fill in your MLBB Player ID, Zone ID, and In-Game Name correctly."
  },
  {
    title: "Payment Method",
    icon: FaWallet,
    content: "Select your preferred payment method such as UPI or Wallet."
  },
  {
    title: "Pay with Selected Method",
    icon: FaMoneyBillWave,
    content: "Complete the payment securely using the selected method."
  },
  {
    title: "Receive Diamonds",
    icon: FaGem,
    content: "Diamonds will be credited to your account instantly."
  }
];

export default function MLBBPurchaseGuide() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaShoppingCart className="text-[var(--accent)]" />
        <h3 className="font-semibold text-lg">MLBB Purchase Guide</h3>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-[var(--border)] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-3 hover:bg-[var(--muted-bg)] transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-[var(--accent)]" />
                  <span className="font-medium text-left">
                    {step.title}
                  </span>
                </div>

                <FiChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-3 text-sm text-[var(--muted)]">
                  {step.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
