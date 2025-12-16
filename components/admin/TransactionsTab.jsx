"use client";

import { useState } from "react";

export default function TransactionsTab({ transactions }) {
  const [selectedTx, setSelectedTx] = useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">User</th>
              <th className="py-3 px-2">Game</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                onClick={() => setSelectedTx(t)}
                className="
                  border-b border-[var(--border)]
                  cursor-pointer
                  hover:bg-[var(--card)]
                  transition
                "
              >
                <td className="py-3 px-2 text-xs text-[var(--muted)]">
                  {new Date(t.createdAt).toLocaleString()}
                </td>

                <td className="py-3 px-2 font-mono text-xs">
                  {t.orderId}
                </td>

                <td className="py-3 px-2">
                  {t.email || t.userId || "—"}
                </td>

                <td className="py-3 px-2">
                  {t.gameSlug}
                </td>

                <td className="py-3 px-2 font-semibold text-green-400">
                  ₹{t.price}
                </td>

                <td className="py-3 px-2 capitalize text-green-400">
                  {t.status}
                </td>
              </tr>
            ))}

            {!transactions.length && (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-[var(--muted)]"
                >
                  No successful transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-lg rounded-xl bg-[var(--card)] border border-[var(--border)] p-6">

            {/* Close button */}
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-3 right-3 text-[var(--muted)] hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">
              Transaction Details
            </h3>

            <div className="space-y-3 text-sm">
              <Detail label="Order ID" value={selectedTx.orderId} />
              <Detail label="Game" value={selectedTx.gameSlug} />
              <Detail
                label="Item"
                value={`${selectedTx.itemName} (${selectedTx.itemSlug})`}
              />
              <Detail label="Player ID" value={selectedTx.playerId} />
              <Detail label="Zone ID" value={selectedTx.zoneId} />
              <Detail label="Payment Method" value={selectedTx.paymentMethod} />
              <Detail label="Amount" value={`₹${selectedTx.price}`} />
              <Detail label="Status" value={selectedTx.status} />
              <Detail label="Payment Status" value={selectedTx.paymentStatus} />
              <Detail label="Topup Status" value={selectedTx.topupStatus} />
              <Detail label="Email" value={selectedTx.email || "—"} />
              <Detail label="Phone" value={selectedTx.phone || "—"} />
              <Detail
                label="Created At"
                value={new Date(selectedTx.createdAt).toLocaleString()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= SMALL HELPER ================= */

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-medium text-right break-all">
        {value}
      </span>
    </div>
  );
}
