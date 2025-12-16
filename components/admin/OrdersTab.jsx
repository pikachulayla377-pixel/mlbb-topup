"use client";

import { useState } from "react";

export default function OrdersTab({ orders, onUpdateStatus }) {
  const STATUS = ["pending", "success", "failed"];
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr>
              <th className="py-3 px-2 text-left">Game</th>
              <th className="py-3 px-2 text-left">Date</th>
              <th className="py-3 px-2 text-left">Item</th>
              <th className="py-3 px-2 text-left">Price</th>
              <th className="py-3 px-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o._id}
                onClick={() => setSelectedOrder(o)}
                className="border-b border-[var(--border)] cursor-pointer
                           hover:bg-[var(--background)] transition"
              >
                <td className="py-3 px-2 font-medium">{o.gameSlug}</td>

                <td className="py-3 px-2 text-xs text-[var(--muted)]">
                  {new Date(o.createdAt).toLocaleString()}
                </td>

                <td className="py-3 px-2">{o.itemName}</td>

                <td className="py-3 px-2 font-semibold">₹{o.price}</td>

                <td
                  className="py-3 px-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={o.status}
                    disabled={o.status === "success"}
                    onChange={(e) =>
                      onUpdateStatus(o.orderId, e.target.value)
                    }
                    className={`px-3 py-1 rounded-lg text-xs border
                      ${
                        o.status === "success"
                          ? "bg-green-500/10 border-green-500 text-green-500 cursor-not-allowed"
                          : "bg-[var(--card)] border-[var(--border)]"
                      }`}
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-[var(--muted)] py-6">
            No orders found
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </>
  );
}

/* ================= MODAL COMPONENT ================= */

function OrderModal({ order, onClose, onUpdateStatus }) {
  const STATUS = ["pending", "success", "failed"];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-[var(--card)] border border-[var(--border)]
                      rounded-2xl w-full max-w-lg p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sm text-[var(--muted)] hover:text-red-500"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4">Order Details</h3>

        <div className="space-y-3 text-sm">
          <Detail label="Order ID" value={order.orderId} mono />
          <Detail label="Game" value={order.gameSlug} />
          <Detail label="Item Slug" value={order.itemSlug} />
          <Detail label="Item Name" value={order.itemName} />
          <Detail label="Player ID" value={order.playerId} />
          <Detail label="Zone ID" value={order.zoneId} />
          <Detail label="Payment" value={order.paymentMethod} />
          <Detail label="Email" value={order.email} />
          <Detail label="Phone" value={order.phone} />
          <Detail label="Topup Status" value={order.topup} />
          <Detail label="Price" value={`₹${order.price}`} />
          <Detail
            label="Created"
            value={new Date(order.createdAt).toLocaleString()}
          />


          {/* STATUS UPDATE */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <span className="font-medium">Status</span>

            <select
              value={order.status}
              disabled={order.status === "success"}
              onChange={(e) =>
                onUpdateStatus(order.orderId, e.target.value)
              }
              className={`px-3 py-1 rounded-lg text-xs border
                ${
                  order.status === "success"
                    ? "bg-green-500/10 border-green-500 text-green-500 cursor-not-allowed"
                    : "bg-[var(--background)] border-[var(--border)]"
                }`}
            >
              {STATUS.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER ================= */

function Detail({ label, value, mono }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--muted)]">{label}</span>
      <span className={mono ? "font-mono text-xs" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}
