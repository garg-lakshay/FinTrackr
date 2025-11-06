"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Transaction {
id: number;
name: string;
amount: number;
type: "income" | "expense";
category: string;
date: string;
}

export default function CalendarPage() {
const [currentDate, setCurrentDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [loading, setLoading] = useState(false);
const router = useRouter();

const token =
typeof window !== "undefined" ? localStorage.getItem("token") : null;

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = new Date(year, month, 1).getDay();

const today = new Date();

const fetchTransactions = async (date: string) => {
setLoading(true);
try {
const res = await fetch(`/api/dashboard/date?date=${date}`, {
headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
setTransactions(res.ok ? data.dateTransaction || [] : []);
} catch (err) {
console.error("Error fetching date transactions:", err);
} finally {
setLoading(false);
}
};

const handleDateClick = (day: number) => {
const dateStr = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
const date = new Date(dateStr);
setSelectedDate(date);
fetchTransactions(dateStr);
};

const changeMonth = (offset: number) => {
const newDate = new Date(year, month + offset, 1);
setCurrentDate(newDate);
};

const changeYear = (offset: number) => {
const newDate = new Date(year + offset, month, 1);
setCurrentDate(newDate);
};

const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
const newDate = new Date(year, Number(event.target.value), 1);
setCurrentDate(newDate);
};

const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
const newDate = new Date(Number(event.target.value), month, 1);
setCurrentDate(newDate);
};

const months = Array.from({ length: 12 }, (_, i) =>
new Date(0, i).toLocaleString("default", { month: "long" })
);

const years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

return ( <main className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center px-6 py-10">
{/* Header */} <header className="w-full max-w-6xl flex justify-between items-center mb-10"> <h1 className="text-2xl font-semibold text-neutral-900">
Transaction Calendar </h1>
<button
onClick={() => router.push("/dashboard")}
className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
>
← Back to Dashboard </button> </header>


  {/* Month & Year Controls */}
  <div className="flex flex-wrap justify-between items-center w-full max-w-6xl mb-8 gap-3">
    <div className="flex gap-2">
      <button
        onClick={() => changeYear(-1)}
        className="border border-neutral-300 bg-white hover:bg-neutral-100 px-3 py-2 rounded-md text-sm font-medium"
      >
        « Year
      </button>
      <button
        onClick={() => changeMonth(-1)}
        className="border border-neutral-300 bg-white hover:bg-neutral-100 px-3 py-2 rounded-md text-sm font-medium"
      >
        ← Month
      </button>
    </div>

    <div className="flex gap-3 items-center">
      <select
        value={month}
        onChange={handleMonthSelect}
        className="border border-neutral-300 rounded-md bg-white px-3 py-2 text-sm font-medium"
      >
        {months.map((m, i) => (
          <option key={i} value={i}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={handleYearSelect}
        className="border border-neutral-300 rounded-md bg-white px-3 py-2 text-sm font-medium"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>

    <div className="flex gap-2">
      <button
        onClick={() => changeMonth(1)}
        className="border border-neutral-300 bg-white hover:bg-neutral-100 px-3 py-2 rounded-md text-sm font-medium"
      >
        Month →
      </button>
      <button
        onClick={() => changeYear(1)}
        className="border border-neutral-300 bg-white hover:bg-neutral-100 px-3 py-2 rounded-md text-sm font-medium"
      >
        Year »
      </button>
    </div>
  </div>

  {/* Calendar Grid */}
  <section className="bg-white border border-neutral-200 p-6 rounded-xl max-w-6xl w-full shadow-sm">
    <div className="grid grid-cols-7 gap-3 mb-3">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div
          key={d}
          className="text-center text-neutral-500 font-semibold text-sm"
        >
          {d}
        </div>
      ))}
    </div>

    <AnimatePresence mode="wait">
      <motion.div
        key={`${month}-${year}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-7 gap-3"
      >
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isSelected =
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === month &&
            selectedDate?.getFullYear() === year;

          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDateClick(day)}
              className={`p-3 rounded-lg text-center text-sm font-medium transition border ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow"
                  : isToday
                  ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                  : "border-transparent bg-neutral-100 hover:bg-indigo-100 hover:text-indigo-600"
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  </section>

  {/* Transaction List */}
  <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm w-full max-w-6xl mt-10">
    {selectedDate ? (
      <>
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">
          Transactions for{" "}
          <span className="text-indigo-600 font-medium">
            {selectedDate.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </h2>

        {loading ? (
          <p className="text-neutral-500">Loading...</p>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-neutral-500 border-b border-neutral-200">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                  >
                    <td className="py-3">{tx.name}</td>
                    <td className="py-3 text-neutral-500">
                      {tx.category}
                    </td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-neutral-500">No transactions for this date.</p>
        )}
      </>
    ) : (
      <p className="text-neutral-500 text-center">
        Select a date to view transactions.
      </p>
    )}
  </section>

  <footer className="mt-10 text-sm text-neutral-500">
    © {new Date().getFullYear()} FinTrackr —{" "}
    <span className="text-neutral-800 font-medium">Lakshay Garg</span>
  </footer>
</main>
  );
}
