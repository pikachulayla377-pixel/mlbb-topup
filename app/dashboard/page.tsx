"use client";

import { useState, useEffect } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import OrderItem from "../../components/Dashboard/OrderItem";
import WalletTab from "../../components/Dashboard/WalletTab";
import AccountTab from "../../components/Dashboard/AccountTab";
import QueryTab from "../../components/Dashboard/QueryTab";

type OrderType = {
  orderId: string;
  gameSlug: string;
  itemSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  createdAt: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /* ================= SEARCH + PAGINATION ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;

        setUserDetails({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        });

        setWalletBalance(data.user.wallet || 0);
        setTotalOrders(data.user.order || 0);
      });
  }, [token]);

  /* ================= LOAD ORDERS ================= */
  useEffect(() => {
    if (!token || activeTab !== "orders") return;

    fetch("/api/order/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        limit,
        search,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders || []);
        }
      });
  }, [token, page, search, activeTab]);

  /* ================= RESET PAGE ON SEARCH ================= */
  useEffect(() => {
    setPage(1);
  }, [search]);

  const tabCards = [
    { key: "orders", label: "Orders", value: totalOrders },
    { key: "wallet", label: "Wallet", value: `₹${walletBalance}` },
    { key: "account", label: "Account", value: "Manage" },
    { key: "query", label: "Support", value: "Help" },
  ];

  return (
    <AuthGuard>
      <section className="min-h-screen px-5 py-10 bg-[var(--background)] text-[var(--foreground)]">

        {/* ================= HERO HEADER ================= */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {userDetails.name || "Player"} 👋
            </h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Track orders, manage wallet & account
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/games")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r 
                       from-[var(--accent)] to-purple-600
                       text-white font-semibold shadow-lg
                       hover:scale-[1.04] transition"
          >
            Buy Diamonds ⚡
          </button>
        </div>

        {/* ================= WALLET BANNER ================= */}
        {walletBalance > 0 && (
          <div className="max-w-5xl mx-auto mb-8 p-5 rounded-2xl
                          bg-gradient-to-r from-emerald-500/20 to-emerald-500/10
                          border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-400">Wallet Balance</p>
                <p className="text-2xl font-bold">₹{walletBalance}</p>
              </div>

              <button
                onClick={() => setActiveTab("wallet")}
                className="px-4 py-2 rounded-lg bg-emerald-500
                           text-black font-semibold hover:scale-105 transition"
              >
                Use Wallet
              </button>
            </div>
          </div>
        )}

        {/* ================= DASHBOARD CARDS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
          {tabCards.map((tab) => (
            <DashboardCard
              key={tab.key}
              tab={tab}
              activeTab={activeTab}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </div>

        {/* ================= CONTENT PANEL ================= */}
        <div className="max-w-4xl mx-auto bg-[var(--card)]
                        border border-[var(--border)]
                        rounded-2xl p-6 shadow-xl">

          {/* ================= ORDERS ================= */}
          {activeTab === "orders" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Orders</h2>
                <span className="text-sm text-[var(--muted)]">
                  {totalOrders} total
                </span>
              </div>

              {/* SEARCH */}
              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl
                             border border-[var(--border)]
                             bg-[var(--background)]
                             focus:ring-2 focus:ring-[var(--accent)]
                             outline-none"
                />
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium mb-2">
                    No orders yet 🚀
                  </p>
                  <p className="text-sm text-[var(--muted)] mb-5">
                    Start your first top-up and get instant diamonds
                  </p>

                  <button
                    onClick={() => (window.location.href = "/games/mlbb")}
                    className="px-6 py-3 rounded-xl bg-[var(--accent)]
                               text-white font-semibold shadow-md
                               hover:scale-105 transition"
                  >
                    Top-Up Now
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-5">
                    {orders.map((order) => (
                      <OrderItem key={order.orderId} order={order} />
                    ))}
                  </div>

                  {/* PAGINATION */}
                  <div className="mt-6 flex justify-center items-center gap-4">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-lg border
                                 disabled:opacity-40"
                    >
                      Prev
                    </button>

                    <span className="text-sm text-[var(--muted)]">
                      Page {page}
                    </span>

                    <button
                      disabled={orders.length < limit}
                      onClick={() => setPage((p) => p + 1)}
                      className="px-4 py-2 rounded-lg border
                                 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ================= WALLET ================= */}
          {activeTab === "wallet" && (
            <WalletTab
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
          )}

          {/* ================= ACCOUNT ================= */}
          {activeTab === "account" && (
            <AccountTab userDetails={userDetails} />
          )}

          {/* ================= QUERY ================= */}
          {activeTab === "query" && <QueryTab />}
        </div>
      </section>
    </AuthGuard>
  );
}
