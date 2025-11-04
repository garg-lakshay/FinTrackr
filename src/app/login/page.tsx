"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h1>
        <p className="text-gray-400 text-center mb-6">
          Login to continue to your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2">
            <Mail className="text-gray-400 mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-100"
              required
            />
          </div>

          <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2">
            <Lock className="text-gray-400 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
        )}

        <p className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Register here
          </a>
        </p>
      </motion.div>

      <footer className="mt-8 text-sm text-gray-400">
        Made with ❤️ by{" "}
        <span className="font-semibold text-indigo-400">Lakshay Garg</span>
      </footer>
    </div>
  );
}
