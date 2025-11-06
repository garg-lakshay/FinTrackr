"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-neutral-200 rounded-xl shadow-sm p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-3 text-neutral-900">
          Create an Account 🚀
        </h1>
        <p className="text-center text-sm text-neutral-500 mb-8">
          Join now and start managing your finances efficiently
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex items-center border border-neutral-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <User className="text-neutral-500 mr-3" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none text-neutral-900 placeholder-neutral-400"
              required
            />
          </div>

          <div className="flex items-center border border-neutral-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <Mail className="text-neutral-500 mr-3" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-neutral-900 placeholder-neutral-400"
              required
            />
          </div>

          <div className="flex items-center border border-neutral-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <Lock className="text-neutral-500 mr-3" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-neutral-900 placeholder-neutral-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md transition"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-sm text-neutral-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </motion.div>

      <footer className="mt-8 text-sm text-neutral-500">
        © {new Date().getFullYear()} FinTrackr —{" "}
        <span className="font-medium text-neutral-800">Lakshay Garg</span>
      </footer>
    </div>
  );
}
