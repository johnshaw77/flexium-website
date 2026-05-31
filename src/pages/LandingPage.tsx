/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Building2, Bot, Headset, ArrowRight } from "lucide-react";
import TechBackground from "../components/TechBackground";

interface LandingPageProps {
  onEnterCompany: () => void;
  onEnterOptimus: () => void;
  onEnterFrontdesk: () => void;
}

export default function LandingPage({
  onEnterCompany,
  onEnterOptimus,
  onEnterFrontdesk,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white overflow-hidden relative font-sans flex flex-col">
      <TechBackground showVideo={false} />

      {/* Brand */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-40 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-6 flex items-center gap-3 select-none"
      >
        <img src="/flexium_logo_sm.png" alt="Flexium" className="h-5" />
        <span className="font-display font-bold text-xl tracking-tight text-white">
          台郡科技
        </span>
      </motion.header>

      {/* Hero */}
      <main className="relative z-30 max-w-5xl mx-auto px-6 flex-grow flex flex-col items-center justify-center text-center py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-shine font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium tracking-tight leading-[1.1] select-none"
        >
          歡迎來到 Flexium
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="text-neutral-400 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl mx-auto mt-6 select-none"
        >
          請選擇您要前往的頁面
        </motion.p>

        {/* Entry cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 w-full max-w-5xl"
        >
          {/* Company website */}
          <button
            onClick={onEnterCompany}
            id="enter-company"
            className="group relative text-left rounded-2xl bg-[#0a0a0a]/80 hover:bg-[#101010] border border-neutral-800/80 hover:border-blue-600/60 p-7 transition duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-linear-to-b from-[#2582ff] to-[#005cf5] flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display font-semibold text-xl text-white tracking-tight">
                公司網頁
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mt-2">
                了解台郡科技的 FPC 軟板產品、技術與解決方案
              </p>
              <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium mt-5 group-hover:gap-2.5 transition-all">
                進入網站 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Optimus */}
          <button
            onClick={onEnterOptimus}
            id="enter-optimus"
            className="group relative text-left rounded-2xl bg-[#0a0a0a]/80 hover:bg-[#101010] border border-neutral-800/80 hover:border-blue-600/60 p-7 transition duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-linear-to-b from-[#2582ff] to-[#005cf5] flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display font-semibold text-xl text-white tracking-tight">
                Optimus
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mt-2">
                CEO 專屬數位助理，協助行程、決策與日常事務
              </p>
              <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium mt-5 group-hover:gap-2.5 transition-all">
                播放 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Optimus Frontdesk */}
          <button
            onClick={onEnterFrontdesk}
            id="enter-frontdesk"
            className="group relative text-left rounded-2xl bg-[#0a0a0a]/80 hover:bg-[#101010] border border-neutral-800/80 hover:border-blue-600/60 p-7 transition duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-linear-to-b from-[#2582ff] to-[#005cf5] flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5">
                <Headset className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display font-semibold text-xl text-white tracking-tight">
                Optimus Frontdesk
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mt-2">
                對外接待數位助理，處理與 CEO 的邀約與會面安排
              </p>
              <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium mt-5 group-hover:gap-2.5 transition-all">
                播放 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        </motion.div>
      </main>

      <footer className="w-full relative z-20 py-10 text-center text-xs text-neutral-600/50 select-none font-sans font-light tracking-widest max-w-7xl mx-auto">
        Flexium © 2026
      </footer>
    </div>
  );
}
