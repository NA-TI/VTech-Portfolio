"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// Ultra-thin, minimalist icons
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LoadingIcon = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    ></circle>
    <path
      className="opacity-60"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Particle component for ultra-thin background effects
const Particle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.3, 0], scale: [0, 1, 0] }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute w-1 h-1 bg-white/20 rounded-full"
  />
);

interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // Check if already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          credentials: "include",
        });

        if (response.ok) {
          router.replace("/admin");
        }
      } catch (error) {
        // Not logged in, continue with login page
      }
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Login successful!");

        // Small delay for better UX
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vtech-slate-900 via-vtech-slate-800 to-vtech-slate-900 flex items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vtech-slate-900 via-vtech-slate-800 to-vtech-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
          },
        }}
      />

      {/* Ultra-thin particle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Sophisticated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-vtech-cyan-500/5 to-vtech-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-vtech-purple-500/5 to-vtech-cyan-500/5 rounded-full blur-3xl"
        />

        {/* Ultra-thin accent lines */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-vtech-cyan-500/30 to-transparent"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-vtech-purple-500/30 to-transparent"
        />
      </div>

      {/* Ultra-thin login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
          {/* Ultra-thin card accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-vtech-cyan-500/10 via-transparent to-vtech-purple-500/10 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                type: "spring",
                bounce: 0.3,
              }}
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-vtech-cyan-500/20 to-vtech-purple-500/20 rounded-2xl mb-4 border border-white/10 backdrop-blur-sm"
            >
              <ShieldIcon />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl font-light text-white mb-2 tracking-wide"
            >
              Admin Portal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs text-gray-400 tracking-wide"
            >
              Sign in to manage your portfolio
            </motion.p>
          </div>

          {/* Ultra-thin login form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <label
                htmlFor="username"
                className="block text-xs font-medium text-gray-300 mb-2 tracking-wide"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-sm tracking-wide ${
                    focusedField === "username"
                      ? "border-vtech-cyan-500/50 bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  placeholder="Enter your username"
                  required
                />
                {focusedField === "username" && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-300 mb-2 tracking-wide"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-sm tracking-wide ${
                    focusedField === "password"
                      ? "border-vtech-cyan-500/50 bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                {focusedField === "password" && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={form.rememberMe}
                    onChange={handleInputChange}
                    className="w-3.5 h-3.5 text-vtech-cyan-500 bg-white/5 border border-white/20 rounded focus:ring-1 focus:ring-vtech-cyan-500/50 transition-all duration-200"
                  />
                  {form.rememberMe && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 bg-vtech-cyan-500 rounded-full" />
                    </motion.div>
                  )}
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200 tracking-wide">
                  Remember me
                </span>
              </label>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-vtech-cyan-500/20 to-vtech-purple-500/20 text-white font-light py-3 px-4 rounded-xl hover:from-vtech-cyan-500/30 hover:to-vtech-purple-500/30 focus:outline-none focus:ring-1 focus:ring-vtech-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-white/10 backdrop-blur-sm tracking-wide text-sm"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <LoadingIcon />
                    <span>Signing in...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="signin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Ultra-thin footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-500 tracking-wider">
              Protected area for authorized personnel only
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
