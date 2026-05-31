/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ArrowLeft } from "lucide-react";
import TechBackground from "../components/TechBackground";

interface CompanyWebsiteProps {
  onNavigateHome?: () => void;
}

export default function CompanyWebsite({ onNavigateHome }: CompanyWebsiteProps) {
  const [activeTab, setActiveTab] = useState<string>("");
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white overflow-hidden relative font-sans flex flex-col justify-between">
      {/* High-Fidelity Animated Cyber Tech Backdrop with Automatic Fallbacks */}
      <TechBackground />

      {/* Header / Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-40 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between"
      >
        {/* Logo and Brand */}
        <div
          onClick={() => (onNavigateHome ? onNavigateHome() : triggerToast("Welcome to Flexium"))}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          {/* Logo Icon */}
          <div className="rounded-full h-2 flex items-center justify-center shadow-[0_4px_12px_rgba(28,124,255,0.4)] transition-transform duration-300 group-hover:scale-105">
            {/* <svg
              viewBox="0 0 24 24"
              className="w-5.5 h-5.5 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.5 2L5 13H11.5L9.5 22L19 11H12.5L14.5 2Z" />
            </svg> */}
            <img src="/flexium_logo_sm.png" alt="Flexium" className="h-5" />
          </div>
          {/* Brand Name */}
          <span className="font-display font-bold text-xl tracking-tight text-white select-none">
            台郡科技
          </span>
        </div>

        {/* Central Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            "產品",
            "應用",
            "技術",
            "解決方案",
            "新聞中心",
            "人才招募",
            "聯絡我們",
          ].map((navItem) => (
            <span
              key={navItem}
              onClick={() => {
                setActiveTab(navItem);
                triggerToast(`Navigating to ${navItem} (Demo)`);
              }}
              className={`text-sm tracking-wide transition-all duration-300 cursor-pointer select-none font-medium ${
                activeTab === navItem
                  ? "text-white font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {navItem}
            </span>
          ))}
        </nav>

        {/* Header Right Action Button with Blue Glow styling */}
        <div className="relative group">
          {/* Glow backdrop layer */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
          <button
            onClick={() => triggerToast("Initiating registration workflow...")}
            className="relative px-5 py-2.5 bg-gradient-to-b from-[#2582ff] to-[#005cf5] hover:from-[#3b90ff] hover:to-[#0a66ff] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-900/40 transition duration-250 cursor-pointer font-sans"
            id="nav-get-started"
          >
            Get started
          </button>
        </div>
      </motion.header>

      {/* Hero Body Content */}
      <main className="relative z-30 max-w-5xl mx-auto px-6 flex-grow flex flex-col items-center justify-center text-center py-12 md:py-20 lg:py-28">
        {/* Main Heading Accent & Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-shine font-display text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-medium tracking-tight leading-[1.08] select-none">
            柔性連結，成就無限可能
            <br className="hidden sm:inline" /> 連接各產業的創新核心
          </h1>
        </motion.div>

        {/* Hero Paragraph Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-neutral-400 font-sans text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto mt-6 md:mt-8 select-none"
        >
          專注 FPC 軟板製造，提供高可靠度、高精密度的客製化解決方案,
          <br className="hidden md:inline" />{" "}
          應用於車用電子、醫療設備、穿戴裝置與通訊產品的 FPC 解決方案
        </motion.p>

        {/* CTA Buttons Layout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12 w-full max-w-md"
        >
          {/* Main Action - Get Started with soft radial custom glow */}
          <div className="relative w-full sm:w-auto overflow-visible group">
            {/* Glow backing */}
            <div className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.85)_0%,transparent_65%)] blur-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <button
              onClick={() => triggerToast("Initiating cloud onboarding...")}
              className="relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#2582ff] to-[#005cf5] hover:from-[#4092ff] hover:to-[#1a6eff] active:scale-[0.98] text-white font-medium text-sm md:text-base rounded-xl transition duration-200 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer outline-none"
              id="hero-cta-get-started"
            >
              Get started
            </button>
          </div>

          {/* Secondary Action - See It in Action */}
          <button
            onClick={() => setIsDemoOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#080808]/80 hover:bg-[#121212] active:bg-[#040404] text-white font-semibold text-sm md:text-base rounded-xl border border-neutral-800/80 hover:border-neutral-700/90 shadow-2xl transition duration-200 flex items-center justify-center gap-3 cursor-pointer select-none"
            id="hero-cta-see-action"
          >
            {/* Elegant Square Icon containing standard play symbol as requested */}
            <div className="w-6 h-6 rounded-md bg-zinc-900 border border-neutral-800/80 flex items-center justify-center transition-colors">
              <Play className="w-2.5 h-2.5 text-white fill-white mr-[1px]" />
            </div>
            <span>See It in Action</span>
          </button>
        </motion.div>
      </main>

      {/* Empty visual spacing footer element to give perfect page vertical balance and negative whitespace */}
      <footer className="w-full relative z-20 py-10 text-center text-xs text-neutral-600/50 select-none font-sans font-light tracking-widest max-w-7xl mx-auto">
        Flexium © 2026
      </footer>

      {/* Back to entry page floating button */}
      {onNavigateHome && (
        <button
          onClick={onNavigateHome}
          className="fixed top-6 left-6 z-40 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/70 hover:bg-neutral-800/80 border border-neutral-800 backdrop-blur text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
          id="back-to-entry"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          入口頁
        </button>
      )}

      {/* Beautiful Interactive Lightbox Player Modal (When "See It in Action" is clicked) */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setIsDemoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-4xl aspect-video rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-1 flex flex-col justify-between overflow-hidden relative shadow-[0_0_50px_rgba(0,112,243,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar of simulator */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-950/80 border-b border-neutral-800/60 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-neutral-500">
                    boltshift_demo_interface.mp4
                  </span>
                </div>
                <button
                  onClick={() => setIsDemoOpen(false)}
                  className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md text-[11px] font-semibold transition text-white/90"
                >
                  Close
                </button>
              </div>

              {/* Simulation Dashboard Body */}
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.1)_0%,_transparent_60%)]" />

                <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight relative z-10">
                  Boltshift Studio Interactive Interface
                </h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2 mb-6 relative z-10 leading-relaxed">
                  Experience seamless workflows powered by local container
                  orchestrations and deep LLM telemetry syncs.
                </p>

                {/* Simulated Waveform Animation */}
                <div className="flex items-center gap-1.5 justify-center h-12 relative z-10">
                  {[...Array(14)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [12, 48, 16, 32, 12][i % 5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2 + (i % 3) * 0.2,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 rounded-full bg-blue-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Interactive Toast */}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-medium tracking-wide shadow-2xl flex items-center justify-between gap-3 min-w-[200px]"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
