/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowLeft, Headset, Sparkles } from "lucide-react";
import TechBackground from "../components/TechBackground";

interface OptimusFrontdeskProps {
  onNavigateHome?: () => void;
}

export default function OptimusFrontdesk({
  onNavigateHome,
}: OptimusFrontdeskProps) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white overflow-hidden relative font-sans flex flex-col">
      <TechBackground videoSrc="/optimus-frontdesk.mp4" />

      {/* Top bar */}
      <header className="relative z-40 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <img src="/flexium_logo_sm.png" alt="Flexium" className="h-5" />
          <span className="font-display font-bold text-xl tracking-tight text-white">
            台郡科技
          </span>
        </div>

        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/70 hover:bg-neutral-800/80 border border-neutral-800 backdrop-blur text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            入口頁
          </button>
        )}
      </header>

      {/* Body */}
      <main className="relative z-30 max-w-4xl mx-auto px-6 grow flex flex-col items-center justify-center text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="absolute -inset-6 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.6)_0%,transparent_70%)] blur-2xl" />
          <div className="relative w-20 h-20 rounded-2xl bg-linear-to-b from-[#2582ff] to-[#005cf5] flex items-center justify-center shadow-xl shadow-blue-500/30">
            <Headset className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-shine font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] select-none"
        >
          Optimus Frontdesk
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-neutral-400 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl mx-auto mt-6 select-none"
        >
          對外接待數位助理即將上線，負責處理外部與 CEO 的邀約、會面與行程安排。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Coming soon
        </motion.div>
      </main>

      <footer className="w-full relative z-20 py-10 text-center text-xs text-neutral-600/50 select-none font-sans font-light tracking-widest max-w-7xl mx-auto">
        Flexium © 2026
      </footer>
    </div>
  );
}
