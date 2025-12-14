"use client";

import { useState } from "react";

export default function QueryTab() {
  const [queryType, setQueryType] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [querySuccess, setQuerySuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!queryType) return;

    setIsSubmitting(true);
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");

    try {
      const res = await fetch("/api/support/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: storedEmail || null,
          phone: storedPhone || null,
          type: queryType,
          message: queryMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setQuerySuccess("Your query has been submitted.");
      } else {
        setQuerySuccess(data.message || "Something went wrong.");
      }

      setQueryType("");
      setQueryMessage("");
    } catch (error) {
      setQuerySuccess("Failed to submit query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Submit a Query</h2>

      {querySuccess && <p className="text-green-500 mb-3">{querySuccess}</p>}

      <select
        value={queryType}
        onChange={(e) => setQueryType(e.target.value)}
        className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] mb-4"
      >
        <option value="">Select Query Type</option>
        <option value="Order Issue">Order Issue</option>
        <option value="Payment Issue">Payment Issue</option>
        <option value="Wallet Issue">Wallet Issue</option>
        <option value="General Inquiry">General Inquiry</option>
      </select>

      <textarea
        className="w-full p-3 border border-[var(--border)] bg-[var(--background)] rounded-xl h-32"
        placeholder="Write your message..."
        value={queryMessage}
        onChange={(e) => setQueryMessage(e.target.value)}
      />

      <button
        disabled={!queryType || isSubmitting}
        onClick={handleSubmit}
        className={`mt-4 px-5 py-3 text-white rounded-xl ${
          !queryType || isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-[var(--accent)]"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Query"}
      </button>
    </>
  );
}