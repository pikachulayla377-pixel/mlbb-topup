"use client";

import { useState } from "react";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

interface AccountTabProps {
  userDetails: UserDetails;
}

export default function AccountTab({ userDetails }: AccountTabProps) {
  const [newPass, setNewPass] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPass.length < 6) {
      setPassError("Minimum 6 characters required");
      return;
    }

    setLoadingPass(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: userDetails.email || userDetails.phone,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      setLoadingPass(false);

      if (!data.success) {
        setPassError(data.message);
        return;
      }

      setNewPass("");
      setPassSuccess("Password updated!");
      setTimeout(() => setPassSuccess(""), 2000);
    } catch (error) {
      setLoadingPass(false);
      setPassError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Account Details</h2>
        <p className="text-[var(--muted)] text-sm">
          Manage your account information and password.
        </p>
      </div>

      {/* User Info Box */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
        <InfoRow label="Name" value={userDetails.name} />
        <InfoRow label="Email" value={userDetails.email} />
        <InfoRow label="Phone" value={userDetails.phone} />
      </div>

      {/* Password Section */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>

        {/* Status Messages */}
        {passSuccess && (
          <p className="text-green-500 text-sm mb-2 animate-fadeIn">
            {passSuccess}
          </p>
        )}
        {passError && (
          <p className="text-red-500 text-sm mb-2 animate-fadeIn">
            {passError}
          </p>
        )}

        {/* Input */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value);
            setPassError("");
          }}
          className="w-full p-3 rounded-xl border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition mb-4"
        />

        {/* Button */}
        <button
          disabled={loadingPass}
          onClick={handlePasswordUpdate}
          className={`w-full py-3 rounded-xl text-white font-medium transition hover:opacity-90 
          bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loadingPass ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Updating...
            </span>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[var(--border)]/40 last:border-b-0">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
