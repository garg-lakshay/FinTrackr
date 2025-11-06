"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpCircle } from "lucide-react";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

interface IncomeResponse {
  message: string;
  incomeTransactions?: Transaction[];
}

interface TotalIncomeResponse {
  message: string;
  totalIncome?: number;
}

export default function IncomePage(): React.ReactElement {
  const router = useRouter();
  const [incomeTransactions, setIncomeTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchIncomeData = async (): Promise<void> => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const [incomeRes, totalRes] = await Promise.all([
        fetch("/api/dashboard/income/income-list", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/dashboard/income/totalincome", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const incomeData: IncomeResponse = await incomeRes.json();
      const totalData: TotalIncomeResponse = await totalRes.json();

      if (incomeRes.ok && Array.isArray(incomeData.incomeTransactions)) {
        setIncomeTransactions(incomeData.incomeTransactions);
      } else {
        setIncomeTransactions([]);
      }

      if (totalRes.ok && typeof totalData.totalIncome === "number") {
        setTotalIncome(totalData.totalIncome);
      } else {
        setTotalIncome(0);
      }
    } catch (err) {
      console.error("Error fetching income data:", err);
      setError("Failed to load income data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIncomeData();
    }, 0);
    return () => clearTimeout(timer);
  }, [token]);

  const filteredTransactions = incomeTransactions.filter((tx) =>
    tx.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-10">
      {/* Header */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-8 flex-wrap gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-neutral-900">
          <ArrowUpCircle size={26} className="text-green-600" /> Income
          Transactions
        </h1>
      </div>

      {/* Total Income Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl bg-white border border-neutral-200 rounded-xl shadow-sm p-6 mb-10"
      >
        <h2 className="text-sm text-neutral-500 uppercase mb-1 tracking-wide">
          Total Income
        </h2>
        <p className="text-4xl font-semibold text-green-600">
          ₹ {totalIncome.toLocaleString()}
        </p>
      </motion.section>

      {/* Search Bar */}
      <div className="w-full max-w-6xl mb-6">
        <input
          type="text"
          placeholder="Search income by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-neutral-300 rounded-md px-4 py-2 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Income Transactions Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white border border-neutral-200 rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">
          Income List
        </h2>

        {loading ? (
          <p className="text-neutral-500 text-center py-8">
            Loading income data...
          </p>
        ) : error ? (
          <p className="text-red-600 text-center py-8">{error}</p>
        ) : filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-neutral-500 border-b border-neutral-200">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                  >
                    <td className="py-3">{tx.name}</td>
                    <td className="py-3 text-neutral-500">{tx.category}</td>
                    <td className="py-3 text-green-600 font-medium">
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
            No income transactions found.
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
