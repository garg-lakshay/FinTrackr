"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

interface TransactionForm {
  name: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
}

export default function AddTransactionPage(): React.ReactElement {
  const router = useRouter();
  const [form, setForm] = useState<TransactionForm>({
    name: "",
    amount: "",
    type: "INCOME",
    category: "",
    date: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    // 🔧 Ensure type is stored in uppercase for backend compatibility
    if (name === "type") {
      setForm((prev) => ({ ...prev, [name]: value.toUpperCase() as "INCOME" | "EXPENSE" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!token) {
      setError("Unauthorized. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/dashboard/add-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Transaction added successfully!");
        setForm({
          name: "",
          amount: "",
          type: "INCOME",
          category: "",
          date: "",
        });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-10">
      {/* Header */}
      <header className="w-full max-w-3xl flex items-center justify-between mb-10">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Add New Transaction
        </h1>
      </header>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-white border border-neutral-200 rounded-xl shadow-sm p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-2">
              Transaction Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Grocery Shopping"
              className="border border-neutral-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400"
              required
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g., 1200"
              className="border border-neutral-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400"
              required
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-neutral-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              required
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g., Salary, Food, Rent"
              className="border border-neutral-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400"
              required
            />
          </div>

          {/* Date */}
          <div className="sm:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-2">
              Transaction Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-neutral-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-medium text-base transition ${
            loading
              ? "bg-neutral-400 text-white cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Adding Transaction..." : "Add Transaction"}
        </button>

        {/* Feedback */}
        {message && (
          <div className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-md py-2">
            <CheckCircle size={20} /> <p>{message}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 flex items-center justify-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md py-2">
            <XCircle size={20} /> <p>{error}</p>
          </div>
        )}
      </motion.form>

      <footer className="mt-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} FinTrackr —{" "}
        <span className="text-neutral-800 font-medium">Lakshay Garg</span>
      </footer>
    </main>
  );
}
