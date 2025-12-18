"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

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

  /* ================= TABLE CONTROLS ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  /* ================= PRICING STATE ================= */
  const [pricingType, setPricingType] = useState("admin");
  const [slabs, setSlabs] = useState([{ min: 0, max: 100, percent: 0 }]);
  const [overrides, setOverrides] = useState([]);
  const [savingPricing, setSavingPricing] = useState(false);

  /* ================= HELPERS ================= */
  const normalizeSlabs = (list) =>
    [...list].sort((a, b) => a.min - b.min);

  const resetControls = () => {
    setSearch("");
    setPage(1);
  };

  const currentData =
    activeTab === "users"
      ? users
      : activeTab === "orders"
      ? orders
      : activeTab === "transactions"
      ? transactions
      : [];

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
    const res = await fetch(
      `/api/admin/users?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setUsers(data.data || []);
  };

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `/api/admin/orders?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setOrders(data.data || []);
  };

  /* ================= FETCH TRANSACTIONS ================= */
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `/api/admin/transactions?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
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

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed");
      }

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
          Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userType: pricingType,
          slabs: normalizeSlabs(slabs),
          overrides,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed");
      } else {
        alert("Pricing updated successfully");
      }
    } finally {
      setSavingPricing(false);
    }
  };

  /* ================= UPDATE ORDER STATUS ================= */
  const updateOrderStatus = async (orderId, status) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId, status }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Failed to update order");
      return;
    }

    fetchOrders();
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    resetControls();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "transactions") fetchTransactions();
    if (activeTab === "pricing") fetchPricing(pricingType);
  }, [activeTab, pricingType, page, search]);

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] px-6 py-5">
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
              {balance !== null ? balance : "Loading..."}
            </p>
          </div>

          {/* TABS */}
          <div className="mb-6 flex flex-wrap gap-3">
            {["users", "orders", "transactions", "pricing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-semibold border text-sm ${
                  activeTab === tab
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--card)] border-[var(--border)]"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          {["users", "orders", "transactions"].includes(activeTab) && (
            <div className="mb-4 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
          )}

          {/* PANEL */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            {activeTab === "users" && (
              <UsersTab
                users={users}
                updatingUserId={updatingUserId}
                onChangeRole={changeUserRole}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                onUpdateStatus={updateOrderStatus}
              />
            )}

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

          {/* PAGINATION (only if data exists) */}
       {/* PAGINATION (only if data exists) */}
{currentData.length > 0 &&
  ["users", "orders", "transactions"].includes(activeTab) && (
    <div className="mt-4 flex justify-between items-center">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft size={20} />
      </button>

      <span className="text-sm text-[var(--muted)]">
        Page {page}
      </span>

      {/* NEXT */}
      <button
        disabled={currentData.length < limit}
        onClick={() => setPage((p) => p + 1)}
        className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
)}

        </div>
      </section>
    </AuthGuard>
  );
}
