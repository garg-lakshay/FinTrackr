"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Wallet, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900 text-white flex flex-col items-center justify-between p-6">
      {/* Header */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-indigo-400">Fin</span>Track
        </h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-10"
      >
        <h2 className="text-5xl font-bold mb-4 leading-tight">
          Take Control of Your <span className="text-indigo-400">Finances</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          Track your spending, set budgets, and visualize your goals — all in
          one clean and intelligent dashboard powered by Next.js & FastAPI.
        </p>

        <Link
          href="/register"
          className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition-all"
        >
          Get Started
        </Link>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 mb-16 max-w-6xl w-full"
      >
        <FeatureCard
          icon={<Wallet className="w-10 h-10 text-indigo-400" />}
          title="Track Expenses"
          description="Monitor all your transactions and understand your spending habits easily."
        />
        <FeatureCard
          icon={<BarChart3 className="w-10 h-10 text-purple-400" />}
          title="Visual Reports"
          description="Get clear and interactive charts that make finance data easy to digest."
        />
        <FeatureCard
          icon={<TrendingUp className="w-10 h-10 text-indigo-400" />}
          title="Set Budgets"
          description="Plan monthly budgets and stay on top of your financial goals."
        />
        <FeatureCard
          icon={<ShieldCheck className="w-10 h-10 text-purple-400" />}
          title="Secure Access"
          description="Your data stays safe with JWT authentication and encryption."
        />
      </motion.section>

      {/* Footer */}
      <footer className="pb-6 text-center text-gray-400 text-sm">
        Made with ❤️ by{" "}
        <span className="font-semibold text-white">Lakshay Garg</span>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
