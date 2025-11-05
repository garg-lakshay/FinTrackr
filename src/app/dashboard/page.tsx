"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string | null;
  email: string;
}

interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TransactionForm {
  name: string;
  amount: string;
  type: "income" | "expense";
  category: string;
  date: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [form, setForm] = useState<TransactionForm>({
    name: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch user info from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch transactions & balance
  const fetchDashboardData = async (): Promise<void> => {
    if (!token) return;

    try {
      const [transactionsRes, balanceRes] = await Promise.all([
        fetch("/api/dashboard/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/dashboard/balance", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const transactionsData = await transactionsRes.json();
      const balanceData = await balanceRes.json();

      if (transactionsRes.ok) {
        setTransactions(transactionsData.transaction || []);
      } else {
        setTransactions([]);
      }

      if (balanceRes.ok) {
        setBalance(balanceData.balance || 0);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Add transaction handler
  const handleAddTransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setMessage("");

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
      setMessage(data.message);

      if (res.ok) {
        setForm({
          name: "",
          amount: "",
          type: "income",
          category: "",
          date: "",
        });
        await fetchDashboardData(); // refresh list
      }
    } catch (err) {
      console.error("Error adding transaction:", err);
      setMessage("Failed to add transaction.");
    }
  };

  // Input handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔒 Logout Handler
  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-900 text-white p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center max-w-6xl mb-8">
        <h1 className="text-3xl font-bold text-indigo-400">
          FinTrackr Dashboard
        </h1>

        <div className="flex items-center gap-4">
          {user && (
            <p className="text-gray-300 text-sm">
              Welcome,{" "}
              <span className="text-indigo-400 font-semibold">
                {user.name || "User"}
              </span>{" "}
              👋
            </p>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Balance Section */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full max-w-6xl mb-10">
        <h2 className="text-xl font-semibold mb-2 text-indigo-300">
          Current Balance
        </h2>
        <p className="text-3xl font-bold text-white">
          ₹ {balance.toLocaleString()}
        </p>
      </section>

      {/* Add Transaction Form */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full max-w-6xl mb-10">
        <h2 className="text-xl font-semibold mb-4 text-indigo-300">
          Add Transaction
        </h2>
        <form
          onSubmit={handleAddTransaction}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <select
            name="type"
            className="p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="p-3 rounded-lg bg-white/20 outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.date}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 rounded-lg py-3 font-semibold transition-all col-span-full sm:col-span-2 lg:col-span-1"
          >
            Add Transaction
          </button>
        </form>
        {message && <p className="text-sm mt-3 text-gray-300">{message}</p>}
      </section>

      {/* Transactions List */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full max-w-6xl">
        <h2 className="text-xl font-semibold mb-4 text-indigo-300">
          Recent Transactions
        </h2>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 border-b border-gray-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-800 hover:bg-white/10 transition-all"
                  >
                    <td className="p-3">{tx.name}</td>
                    <td className="p-3">{tx.category}</td>
                    <td
                      className={`p-3 font-semibold ${
                        tx.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {tx.type}
                    </td>
                    <td className="p-3">₹ {tx.amount}</td>
                    <td className="p-3">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No transactions found.</p>
        )}
      </section>

      <footer className="mt-10 text-sm text-gray-400">
        Made with ❤️ by <span className="text-indigo-400">Lakshay Garg</span>
      </footer>
    </main>
  );
}
