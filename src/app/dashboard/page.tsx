"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PlusCircle,
  CalendarDays,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
} from "lucide-react";


interface User {
  id: number;
  name: string | null;
  email: string;
}

interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        Promise.resolve().then(() => setUser(parsed));
      } catch {
        console.error("Failed to parse user data.");
      }
    }
  }, []);

  const safeJson = async (res: Response) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [balanceRes, txRes] = await Promise.all([
          fetch("/api/dashboard/balance", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("/api/dashboard/transactions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const balanceData = await safeJson(balanceRes);
        const txData = await safeJson(txRes);

        setBalance(balanceData.balance || 0);
        setTransactions(txData.transaction?.slice(0, 5) || []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-10">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
            FinTrackr
          </h1>
          {user && (
            <p className="text-neutral-500 text-sm mt-1">
              Welcome back,{" "}
              <span className="font-medium text-neutral-800">
                {user.name || "User"}
              </span>
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md text-sm font-medium bg-neutral-800 hover:bg-neutral-700 text-white transition"
        >
          Logout
        </button>
      </header>

      {/* Balance Section */}
      <section className="w-full max-w-6xl mb-12">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm text-neutral-500 mb-1 uppercase tracking-wide">
            Current Balance
          </h2>
          <p className="text-4xl font-semibold text-neutral-900">
            ₹ {balance.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl mb-12">
        {[
          {
            title: "Add Transaction",
            icon: <PlusCircle className="text-neutral-600" size={26} />,
            desc: "Record income or expense instantly.",
            route: "/dashboard/add-transaction",
          },
          {
            title: "Calendar View",
            icon: <CalendarDays className="text-neutral-600" size={26} />,
            desc: "Browse your monthly transactions by date.",
            route: "/dashboard/calendar",
          },
          {
            title: "Income Tracker",
            icon: <ArrowUpCircle className="text-green-600" size={26} />,
            desc: "Review your income streams in detail.",
            route: "/dashboard/income",
          },
          {
            title: "Expense Tracker",
            icon: <ArrowDownCircle className="text-red-600" size={26} />,
            desc: "Track and analyze your spending patterns.",
            route: "/dashboard/expense",
          },
          {
            title: "Date Range Analysis",
            icon: <Clock className="text-indigo-600" size={26} />,
            desc: "View transactions between specific dates.",
            route: "/dashboard/DateRange",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3 }}
            onClick={() => router.push(card.route)}
            className="cursor-pointer border border-neutral-200 bg-white rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-neutral-900">
                {card.title}
              </h3>
              {card.icon}
            </div>
            <p className="text-sm text-neutral-500">{card.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Recent Transactions */}
<section className="w-full max-w-6xl">
  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4 text-neutral-900">
      Recent Transactions
    </h2>
    {transactions.length > 0 ? (
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
                    tx.type === "INCOME" 
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "INCOME" 
                    ? "Income"
                    : "Expense"}
                </td>
                <td
                  className={`py-3 font-semibold ${
                    tx.type === "INCOME" 
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "INCOME"
                    ? "+ "
                    : "- "}
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
      <p className="text-neutral-500 text-sm">
        No recent transactions found.
      </p>
    )}
  </div>
</section>

{/* Footer */}
<footer className="mt-12 text-sm text-neutral-500">
  © {new Date().getFullYear()} FinTrackr —{" "}
  <span className="text-neutral-800 font-medium">Lakshay Garg</span>
</footer>
    </main>
  );
}
