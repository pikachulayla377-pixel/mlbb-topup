"use client";

import { useState } from "react";
import HelpImagePopup from "../../components/HelpImage/HelpImagePopup";
import { saveVerifiedPlayer } from "@/utils/storage/verifiedPlayerStorage";
import RecentVerifiedPlayers from "./RecentVerifiedPlayers";

export default function RegionPage() {
  const [id, setId] = useState("");
  const [zone, setZone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);

    const res = await fetch("/api/check-region", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, zone }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
     if (data?.success === 200) {
    saveVerifiedPlayer({
      playerId: id,
      zoneId: zone,
      username: data.data.username,
      region: data.data.region,
      savedAt: Date.now(),
    });
  }
  };

  return (
    <section className="min-h-screen pt-24 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-lg mx-auto">

  <div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl font-bold">Check Region</h2>
  <HelpImagePopup />
</div>


        <input
          className="w-full p-3 mb-3 rounded bg-[var(--card)] border border-[var(--border)]"
          placeholder="Enter Player ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 rounded bg-[var(--card)] border border-[var(--border)]"
          placeholder="Enter Zone ID"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full py-3 rounded bg-[var(--accent)] text-white font-semibold hover:opacity-90"
        >
          {loading ? "Checking..." : "Check"}
        </button>

         {/* ✅ Recent IDs (NEW) */}
        <div className="mt-6">
          <RecentVerifiedPlayers
            limit={10}
            onSelect={(player) => {
              setId(player.playerId);
              setZone(player.zoneId);
            }}
          />
        </div>

        {result && (
          <div className="mt-5 p-4 bg-[var(--card)] rounded border border-[var(--border)]">

            {result?.success === 200 ? (
              <div>
                <p className="text-lg font-semibold">
                  Username: <span className="font-normal">{result.data?.username}</span>
                </p>

                <p className="text-lg font-semibold">
                  Region: <span className="font-normal">{result.data?.region}</span>
                </p>
              </div>
            ) : (
              <p className="text-red-500 font-semibold">{ "ID not found"}</p>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
