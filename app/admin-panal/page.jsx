"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

export default function AdminPanalPage() {
  const [role, setRole] = useState("user");
  const [expiry, setExpiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("silver");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.userType) setRole(data.userType);
        if (data?.membershipExpiresAt)
          setExpiry(new Date(data.membershipExpiresAt));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  /* ================= ROLE MAP ================= */
  const isOwner = role === "owner";
  const isReseller = role === "admin";   // reseller
  const isSilver = role === "member";    // silver
  const isUser = role === "user";

  const currentTier = isOwner
    ? "Owner"
    : isReseller
    ? "Reseller"
    : isSilver
    ? "Silver"
    : "Free User";

  const daysLeft =
    expiry ? Math.max(0, Math.ceil((expiry - new Date()) / 86400000)) : null;

  return (
    <AuthGuard>
      <section className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
        <div className="w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-3xl p-10 shadow-xl text-[var(--foreground)]">

          {/* ================= CURRENT TIER ================= */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm text-[var(--muted)]">Current Tier</p>
              <p className="text-xl font-bold">{currentTier}</p>
            </div>

            {(isSilver || isReseller) && expiry && (
              <div className="text-right">
                <p className="text-sm text-[var(--muted)]">Expires in</p>
                <p className="text-lg font-semibold">
                  {daysLeft} days
                </p>
              </div>
            )}
          </div>

          {/* ================= OWNER ================= */}
          {isOwner && (
            <p className="text-center text-lg text-[var(--muted)]">
              You have lifetime access. No membership required 👑
            </p>
          )}

          {/* ================= TABS ================= */}
          {!isOwner && (
            <>
              <div className="flex justify-center gap-2 mb-8">
                <TabButton
                  active={activeTab === "silver"}
                  onClick={() => setActiveTab("silver")}
                  label="Silver"
                />
                <TabButton
                  active={activeTab === "reseller"}
                  onClick={() => setActiveTab("reseller")}
                  label="Reseller"
                />
              </div>

              {/* ================= SILVER ================= */}
              {activeTab === "silver" && (
                <>
                  <PerkTable
                    perks={[
                      "Cheaper product pricing",
                      "Collage / Profile Maker access",
                      "ID Rent priority access",
                    ]}
                  />

                  {(isUser || isSilver) && (
                    <div className="flex justify-center mt-8">
                      <ActionButton
                        href={
                          isSilver
                            ? "/games/membership/reseller-membership"
                            : "/games/membership/silver-membership"
                        }
                        label={
                          isSilver
                            ? "Upgrade to Reseller"
                            : "Buy Silver Membership"
                        }
                        style="silver"
                      />
                    </div>
                  )}
                </>
              )}

              {/* ================= RESELLER ================= */}
              {activeTab === "reseller" && (
                <>
                  <PerkTable
                    perks={[
                      "Lowest possible prices",
                      "Bulk tools & reseller dashboard",
                      "Collage / Profile Maker access",
                      "Highest priority ID Rent access",
                    ]}
                  />

                  {(isUser || isSilver) && (
                    <div className="flex justify-center mt-8">
                      <ActionButton
                        href="/games/membership/reseller-membership"
                        label="Buy Reseller Membership"
                        style="gold"
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </AuthGuard>
  );
}

/* ================= COMPONENTS ================= */

function TabButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition
        ${
          active
            ? "bg-[var(--accent)] text-black"
            : "bg-[var(--background)] border border-[var(--border)]"
        }`}
    >
      {label}
    </button>
  );
}

function PerkTable({ perks }) {
  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      {perks.map((perk, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-6 py-4 text-sm
            ${i % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--card)]"}`}
        >
          <span className="text-green-500">✔</span>
          <span>{perk}</span>
        </div>
      ))}
    </div>
  );
}

function ActionButton({ href, label, style }) {
  return (
    <Link
      href={href}
      className={`px-8 py-3 rounded-xl font-semibold transition
        ${
          style === "gold"
            ? "bg-yellow-400 text-black hover:opacity-90"
            : "bg-gray-300 text-black hover:opacity-90"
        }`}
    >
      {label}
    </Link>
  );
}
