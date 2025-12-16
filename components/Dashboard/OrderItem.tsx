"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type OrderType = {
  orderId: string;
  gameSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  topupStatus?: string;
  createdAt: string;
};

interface OrderItemProps {
  order: OrderType;
}

export default function OrderItem({ order }: OrderItemProps) {
  const [open, setOpen] = useState(false);

  const finalStatus = order.topupStatus || order.status;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-400 border border-green-500/30";
      case "failed":
        return "bg-red-500/10 text-red-400 border border-red-500/30";
      default:
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30";
    }
  };

  const getGameName = (slug: string) => {
    if (slug.toLowerCase().includes("mlbb")) {
      return "Mobile Legends";
    }
    return slug;
  };

  return (
    <div
      onClick={() => setOpen(!open)}
      className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm cursor-pointer transition-all hover:shadow-lg hover:border-[var(--accent)]/40 select-none"
    >
      {/* TOP SECTION */}
      <div className="flex justify-between items-center">
        <div>
 
          <p className="font-mono text-sm font-semibold">
            {order.orderId}
          </p>

          <p className="text-xs text-[var(--muted)] mt-2">
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <p className="text-xl font-semibold mt-1">
            ₹{order.price}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${getStatusStyle(
              finalStatus
            )}`}
          >
            {finalStatus.toUpperCase()}
          </span>

          <div
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <FiChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <div className="pt-4 border-t border-[var(--border)] text-sm space-y-2">
          <p>
            <strong>Game:</strong> {getGameName(order.gameSlug)}
          </p>
          <p>
            <strong>Player ID:</strong> {order.playerId}
          </p>
          <p>
            <strong>Zone ID:</strong> {order.zoneId}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}
          </p>

          <div className="p-3 rounded-xl bg-[var(--background)]/40 border border-[var(--border)] mt-2">
            <p className="text-[var(--muted)] text-sm mb-1">
              Item Details
            </p>
            <p className="font-medium">
              {order.itemName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
