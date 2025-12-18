"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("all"); // all | weekly | monthly

  const limit = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);

    fetch(`/api/leaderboard?limit=${limit}&range=${range}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.success ? res.data : []);
      })
      .finally(() => setLoading(false));
  }, [range]);

  const rankBadge = (rank) => {
    if (rank === 1)
      return "bg-yellow-400/20 text-yellow-400 border-yellow-400";
    if (rank === 2)
      return "bg-gray-400/20 text-gray-300 border-gray-400";
    if (rank === 3)
      return "bg-orange-400/20 text-orange-400 border-orange-400";
    return "bg-gray-800 text-gray-400 border-gray-700";
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2 text-center">
          🏆 Top 10 Spenders
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Climb the leaderboard by making purchases
        </p>

        {/* Range Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          {["all", "weekly", "monthly"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded text-sm font-semibold ${
                range === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {r === "all"
                ? "All Time"
                : r === "weekly"
                ? "This Week"
                : "This Month"}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">
            Loading leaderboard...
          </p>
        ) : data.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-16 border border-dashed border-gray-700 rounded-lg">
            <p className="text-xl font-semibold mb-2">
              🚀 Be the first to purchase!
            </p>
            <p className="text-gray-400 mb-4">
              No players on the leaderboard yet.
            </p>
            <p className="text-sm text-gray-500">
              Make a purchase and secure the #1 spot 🥇
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Orders</th>
                  <th className="p-3 text-left">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const rank = index + 1;

                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-800"
                    >
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full border text-sm font-bold ${rankBadge(
                            rank
                          )}`}
                        >
                          #{rank}
                        </span>
                      </td>
                      <td className="p-3">
                        {item.user?.userId || "—"}
                      </td>
                      <td className="p-3">
                        {item.user?.name || "Anonymous"}
                      </td>
                      <td className="p-3">
                        {item.totalOrders}
                      </td>
                      <td className="p-3 font-semibold text-green-400">
                        ₹{item.totalSpent}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
