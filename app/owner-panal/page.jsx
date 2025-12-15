"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import UsersTab from "@/components/admin/UsersTab";
import OrdersTab from "@/components/admin/OrdersTab";
import PricingTab from "@/components/admin/PricingTab";
import TransactionsTab from "@/components/admin/TransactionsTab";

export default function AdminPanalPage() {
  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);

  const [updatingUserId, setUpdatingUserId] = useState(null);

  /* ================= PRICING STATE ================= */
  const [pricingType, setPricingType] = useState("admin");

  const [slabs, setSlabs] = useState([
    { min: 0, max: 100, percent: 0 },
  ]);

  const [overrides, setOverrides] = useState([]); // ✅ FIXED ITEM PRICES

  const [savingPricing, setSavingPricing] = useState(false);

  /* ================= HELPERS ================= */
  const normalizeSlabs = (list) =>
    [...list].sort((a, b) => a.min - b.min);

  /* ================= FETCH BALANCE ================= */
  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/game/balance");
      const data = await res.json();
      if (data.success) {
        setBalance(data?.balance?.data?.balance ?? data.balance);
      }
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  };

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data.data || []);
  };

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data.data || []);
  };

  /* ================= FETCH TRANSACTIONS ================= */
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTransactions(data.data || []);
  };

  /* ================= CHANGE USER ROLE ================= */
  const changeUserRole = async (userId, newUserType) => {
    try {
      setUpdatingUserId(userId);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/users/change-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, newUserType }),
      });

      const data = await res.json();
      if (!res.ok) alert(data.message || "Failed");

      fetchUsers();
    } finally {
      setUpdatingUserId(null);
    }
  };

  /* ================= FETCH PRICING ================= */
  const fetchPricing = async (type) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/admin/pricing?userType=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (data.success) {
      setSlabs(
        data.data?.slabs?.length
          ? data.data.slabs
          : [{ min: 0, max: 0, percent: 0 }]
      );
      setOverrides(data.data?.overrides || []);
    }
  };

  /* ================= SAVE PRICING ================= */
  const savePricing = async () => {
    try {
      setSavingPricing(true);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/pricing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userType: pricingType,
          slabs: normalizeSlabs(slabs),
          overrides, // ✅ SEND FIXED ITEM PRICES
        }),
      });

      const data = await res.json();
      if (!res.ok) alert(data.message || "Failed");
      else alert("Pricing updated successfully");
    } finally {
      setSavingPricing(false);
    }
  };

  /* ================= ON LOAD ================= */
  useEffect(() => {
    fetchBalance();
  }, []);

  /* ================= TAB CHANGE ================= */
  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "transactions") fetchTransactions();
    if (activeTab === "pricing") fetchPricing(pricingType);
  }, [activeTab, pricingType]);

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-5">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[var(--accent)]">
              Admin Panel
            </h1>
            <p className="text-[var(--muted)]">
              Manage users, orders, transactions & pricing
            </p>
          </div>

          {/* BALANCE */}
          <div className="mb-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <p className="text-sm text-[var(--muted)]">Account Balance</p>
            <p className="text-2xl font-bold text-[var(--accent)]">
              {balance !== null ? `₹${balance}` : "Loading..."}
            </p>
          </div>

          {/* TABS */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
            {["users", "orders", "transactions", "pricing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-semibold border text-sm transition ${
                  activeTab === tab
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--card)] border-[var(--border)]"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* PANEL */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            {activeTab === "users" && (
              <UsersTab
                users={users}
                updatingUserId={updatingUserId}
                onChangeRole={changeUserRole}
              />
            )}

            {activeTab === "orders" && <OrdersTab orders={orders} />}

            {activeTab === "transactions" && (
              <TransactionsTab transactions={transactions} />
            )}

            {activeTab === "pricing" && (
              <PricingTab
                pricingType={pricingType}
                setPricingType={setPricingType}
                slabs={slabs}
                setSlabs={setSlabs}
                overrides={overrides}
                setOverrides={setOverrides}
                savingPricing={savingPricing}
                onSave={savePricing}
              />
            )}
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}
