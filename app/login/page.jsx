"use client";

import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  /* ---------- VALIDATION HELPERS ---------- */
  const isGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const minLen = (txt, min) => txt.length >= min;
  const maxLen = (txt, max) => txt.length <= max;

  /* ======================================================
     ---------------------- LOGIN -------------------------
     ====================================================== */
  const handleLogin = async () => {
    let errs = {};

    if (!loginData.user.trim()) errs.user = "Email or Phone is required";
    if (!loginData.password.trim()) errs.password = "Password is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!data.success) {
      setErrors({ user: data.message });
      return;
    }

    /* ================= SAVE SAFE DATA ONLY ================= */
    localStorage.setItem("token", data.token); // 🔐 JWT (source of truth)
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("phone", data.user.phone);
    localStorage.setItem("userId", data.user.userId);

    setSuccess("Login successful! Redirecting...");
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  /* ======================================================
     -------------------- REGISTER ------------------------
     ====================================================== */
  const handleRegister = async () => {
    let errs = {};

    if (!regData.name.trim()) errs.name = "Name is required";
    else if (!minLen(regData.name, 3)) errs.name = "Minimum 3 characters";
    else if (!maxLen(regData.name, 15)) errs.name = "Maximum 15 characters";

    if (!regData.email.trim()) errs.email = "Email is required";
    else if (!isGmail(regData.email))
      errs.email = "Email must be a valid Gmail";

    if (!regData.phone.trim()) errs.phone = "Phone number is required";
    else if (!isPhone(regData.phone))
      errs.phone = "Phone number must be exactly 10 digits";

    if (!regData.password.trim()) errs.password = "Password is required";
    else if (!minLen(regData.password, 6))
      errs.password = "Password must be at least 6 characters";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });

    const data = await res.json();

    if (!data.success) {
      setErrors({ email: data.message });
      return;
    }

    setSuccess("Account created! Please log in.");
    setTab("login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)]">
      <div className="bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-xl p-6 w-full max-w-md">

        {/* Tabs */}
        <div className="flex mb-6 border-b border-[var(--border)]">
          <button
            className={`flex-1 py-3 font-semibold ${
              tab === "login"
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
            onClick={() => {
              setErrors({});
              setSuccess("");
              setTab("login");
            }}
          >
            Login
          </button>

          <button
            className={`flex-1 py-3 font-semibold ${
              tab === "register"
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
            onClick={() => {
              setErrors({});
              setSuccess("");
              setTab("register");
            }}
          >
            Register
          </button>
        </div>

        {success && (
          <p className="text-green-500 text-center mb-4 font-medium">
            {success}
          </p>
        )}

        {/* LOGIN */}
        {tab === "login" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Phone"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={loginData.user}
              onChange={(e) =>
                setLoginData({ ...loginData, user: e.target.value })
              }
            />
            {errors.user && (
              <p className="text-red-500 text-sm">{errors.user}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-semibold"
            >
              Login
            </button>
          </div>
        )}

        {/* REGISTER */}
        {tab === "register" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.name}
              onChange={(e) =>
                setRegData({ ...regData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              placeholder="Gmail Address"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.email}
              onChange={(e) =>
                setRegData({ ...regData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              placeholder="Phone Number"
              maxLength={10}
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.phone}
              onChange={(e) =>
                setRegData({ ...regData, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <input
              type="password"
              placeholder="Password (min 6 characters)"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.password}
              onChange={(e) =>
                setRegData({ ...regData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-semibold"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
