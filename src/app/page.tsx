"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Wallet, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center justify-between px-6">
      {/* Header */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          <span className="text-indigo-600">Fin</span>Trackr
        </h1>
        <div className="space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-neutral-300 hover:bg-neutral-100 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-20 mb-12"
      >
        <h2 className="text-5xl font-semibold mb-4 leading-tight text-neutral-900">
          Take Control of Your{" "}
          <span className="text-indigo-600">Finances</span>
        </h2>
        <p className="text-neutral-600 text-lg max-w-2xl mx-auto mb-10">
          Track expenses, set budgets, and visualize your goals — all in one
          intuitive dashboard built with Next.js & FastAPI.
        </p>

        <Link
          href="/register"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg px-8 py-3 rounded-md shadow-sm transition"
        >
          Get Started
        </Link>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 mb-20 max-w-6xl w-full"
      >
        <FeatureCard
          icon={<Wallet className="w-10 h-10 text-indigo-600" />}
          title="Track Expenses"
          description="Monitor your spending and understand where your money goes."
        />
        <FeatureCard
          icon={<BarChart3 className="w-10 h-10 text-indigo-600" />}
          title="Visual Reports"
          description="View interactive charts that make your financial data easy to read."
        />
        <FeatureCard
          icon={<TrendingUp className="w-10 h-10 text-indigo-600" />}
          title="Set Budgets"
          description="Plan your monthly spending and stick to your goals effortlessly."
        />
        <FeatureCard
          icon={<ShieldCheck className="w-10 h-10 text-indigo-600" />}
          title="Secure Access"
          description="Your data stays safe with JWT authentication and encryption."
        />
      </motion.section>

      {/* Footer */}
      <footer className="pb-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} FinTrackr —{" "}
        <span className="text-neutral-800 font-medium">Lakshay Garg</span>
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
    <div className="bg-white border border-neutral-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="text-lg font-medium mt-4 mb-2 text-neutral-900">
          {title}
        </h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
