"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export default function DateRangePage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchTransactions = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🧠 Always send in YYYY-MM-DD format for backend compatibility
      const formattedStart = new Date(startDate).toISOString().split("T")[0];
      const formattedEnd = new Date(endDate).toISOString().split("T")[0];

      const res = await fetch(
        `/api/dashboard/summary?startdate=${formattedStart}&enddate=${formattedEnd}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setTransactions(data.transaction || []);
      } else {
        setTransactions([]);
        setError(data.message || "No transactions found for this range.");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-10">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Transactions by Date Range
        </h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Date Range Picker */}
      <section className="w-full max-w-6xl bg-white border border-neutral-200 rounded-xl shadow-sm p-6 mb-10">
        <h2 className="text-sm text-neutral-500 uppercase mb-4 tracking-wide">
          Select Date Range
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-neutral-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchTransactions}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md shadow-sm transition sm:mt-5"
          >
            Fetch Transactions
          </motion.button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </section>

      {/* Transaction Results */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl bg-white border border-neutral-200 rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">
          Transaction Results
        </h2>

        {loading ? (
          <p className="text-neutral-500 text-center py-8">
            Loading transactions...
          </p>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-neutral-500 border-b border-neutral-200">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                  >
                    <td className="py-3">{tx.name}</td>
                    <td className="py-3 text-neutral-500">{tx.category}</td>
                    <td
                      className={`py-3 font-medium ${
                        tx.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.type}
                    </td>
                    <td className="py-3 text-neutral-900">
                      ₹ {tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3 text-neutral-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-neutral-500 text-center py-6">
            No transactions found for the selected date range.
          </p>
        )}
      </motion.section>

      <footer className="mt-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} FinTrackr —{" "}
        <span className="text-neutral-800 font-medium">Lakshay Garg</span>
      </footer>
    </main>
  );
}

