/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  ImageOff,
  ExternalLink,
} from "lucide-react";
import TechBackground from "../components/TechBackground";
import { tourSlides, type SlideContent } from "./optimusTour";

/**
 * 側邊裝飾圖來源，依 slide 流水號對應：第 1 頁用 SIDE_IMAGES[0]、第 2 頁用 [1]…
 * 順序請與 tourSlides 對齊；頁數超過圖片數時，該頁就不顯示裝飾圖。
 */
const SIDE_IMAGES = [
  "/optimus-1.png",
  "/optimus-2.png",
  "/optimus-3.png",
  "/optimus-4.png",
  "/optimus-5.png",
  "/optimus-6.png",
  "/optimus-7.png",
];

interface OptimusProps {
  onNavigateHome?: () => void;
}

export default function Optimus({ onNavigateHome }: OptimusProps) {
  const [isTouring, setIsTouring] = useState(false);
  const [current, setCurrent] = useState(0);

  const total = tourSlides.length;

  const startTour = () => {
    setCurrent(0);
    setIsTouring(true);
  };

  const exitTour = useCallback(() => setIsTouring(false), []);
  const next = useCallback(
    () => setCurrent((i: number) => Math.min(i + 1, total - 1)),
    [total],
  );
  const prev = useCallback(
    () => setCurrent((i: number) => Math.max(i - 1, 0)),
    [],
  );

  // Keyboard navigation while touring.
  useEffect(() => {
    if (!isTouring) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") exitTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isTouring, next, prev, exitTour]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white overflow-hidden relative font-sans flex flex-col">
      <TechBackground videoSrc="/optimus.mp4" showVideo={!isTouring} />

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

        {isTouring ? (
          <button
            onClick={exitTour}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/70 hover:bg-neutral-800/80 border border-neutral-800 backdrop-blur text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            結束導覽
          </button>
        ) : (
          onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/70 hover:bg-neutral-800/80 border border-neutral-800 backdrop-blur text-xs font-medium text-neutral-300 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              入口頁
            </button>
          )
        )}
      </header>

      <AnimatePresence mode="wait">
        {isTouring ? (
          <TourStage
            key="tour"
            current={current}
            total={total}
            onPrev={prev}
            onNext={next}
            onJump={setCurrent}
          />
        ) : (
          <Intro key="intro" onStart={startTour} />
        )}
      </AnimatePresence>

      <footer className="w-full relative z-20 py-10 text-center text-xs text-neutral-600/50 select-none font-sans font-light tracking-widest max-w-7xl mx-auto">
        Flexium © 2026
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intro screen                                                        */
/* ------------------------------------------------------------------ */

function Intro({ onStart }: { key?: string; onStart: () => void }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-30 max-w-4xl mx-auto px-6 grow flex flex-col items-center justify-center text-center py-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="absolute -inset-6 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.6)_0%,transparent_70%)] blur-2xl" />
        {/* <div className="relative w-20 h-20 rounded-2xl bg-linear-to-b from-[#2582ff] to-[#005cf5] flex items-center justify-center shadow-xl shadow-blue-500/30">
          <Bot className="w-10 h-10 text-white" />
        </div> */}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="text-shine font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] select-none"
      >
        Optimus
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="text-neutral-400 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl mx-auto mt-6 select-none"
      >
        CEO 專屬數位助理 — 開發進度導覽，帶您快速了解目前的進展與規劃。
      </motion.p>

      {/* Start tour */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="relative mt-10 group"
      >
        <div className="absolute -inset-3 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.85)_0%,transparent_65%)] blur-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <button
          onClick={onStart}
          className="relative px-8 py-3.5 bg-linear-to-b from-[#2582ff] to-[#005cf5] hover:from-[#4092ff] hover:to-[#1a6eff] active:scale-[0.98] text-white font-medium text-sm md:text-base rounded-xl transition duration-200 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          開始導覽
        </button>
      </motion.div>
    </motion.main>
  );
}

/* ------------------------------------------------------------------ */
/* Tour stage                                                          */
/* ------------------------------------------------------------------ */

function TourStage({
  current,
  total,
  onPrev,
  onNext,
  onJump,
}: {
  key?: string;
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}) {
  const slide = tourSlides[current];
  const isFirst = current === 0;
  const isLast = current === total - 1;

  // Decorative gutter image: mapped to the slide's serial number (1st slide -> 1st image).
  // Side is configurable per slide via `decoSide`, defaulting to "right".
  const decoSrc = SIDE_IMAGES[current];
  const decoSide = slide.decoSide ?? "right";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-30 max-w-6xl mx-auto w-full px-6 grow flex flex-col py-4 md:py-8"
    >
      {/* Decorative side image, only on screens wide enough to have empty gutters */}
      {decoSrc && (
        <AnimatePresence mode="wait">
          <motion.img
            key={`${decoSide}-${decoSrc}`}
            src={decoSrc}
            alt=""
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`hidden min-[1450px]:block fixed top-1/2 -translate-y-1/2 z-20 w-[min(280px,calc(50vw-38rem))] h-auto max-h-[68vh] object-cover rounded-2xl shadow-2xl pointer-events-none select-none ${
              decoSide === "left"
                ? "right-[calc(50%+37rem)]"
                : "left-[calc(50%+37rem)]"
            }`}
          />
        </AnimatePresence>
      )}
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-xs text-neutral-500 tabular-nums">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <div className="flex-1 h-1 rounded-full bg-neutral-800/80 overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-[#2582ff] to-[#005cf5]"
            initial={false}
            animate={{ width: `${((current + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Stage */}
      <div className="relative grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col grow"
          >
            {/* Title block */}
            <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between gap-3 text-center md:text-left">
              <div>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-white tracking-tight">
                  {slide.title}
                </h2>
                {slide.description && (
                  <p className="text-neutral-400 text-sm md:text-[15px] mt-1.5">
                    {slide.description}
                  </p>
                )}
              </div>

              {slide.url && (
                <button
                  onClick={() =>
                    window.open(slide.url, "_blank", "noopener,noreferrer")
                  }
                  className="shrink-0 self-center md:self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-600/60 text-sm font-medium text-neutral-200 hover:text-white transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  開啟網頁
                </button>
              )}
            </div>

            {/* Content surface — 16:9 stage */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950/60 shadow-[0_0_60px_rgba(0,112,243,0.08)]">
              <SlideRenderer content={slide.content} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 mt-6">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-sm font-medium text-neutral-200 transition enabled:hover:bg-neutral-800 enabled:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          上一頁
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {tourSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onJump(i)}
              aria-label={`前往第 ${i + 1} 頁`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === current
                  ? "w-6 bg-blue-500"
                  : "w-2 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-linear-to-b from-[#2582ff] to-[#005cf5] text-sm font-medium text-white transition enabled:hover:from-[#4092ff] enabled:hover:to-[#1a6eff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          下一頁
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.main>
  );
}

/* ------------------------------------------------------------------ */
/* Slide content renderer                                              */
/* ------------------------------------------------------------------ */

function SlideRenderer({ content }: { content: SlideContent }) {
  switch (content.kind) {
    case "image":
      return (
        <img
          src={content.src}
          alt={content.alt ?? ""}
          className={`absolute inset-0 w-full h-full ${
            content.fit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
      );

    case "video":
      return (
        <video
          src={content.src}
          poster={content.poster}
          controls
          autoPlay={content.autoPlay}
          loop={content.loop}
          muted={content.autoPlay}
          playsInline
          className="absolute inset-0 w-full h-full object-contain bg-black"
        />
      );

    case "webpage":
      return (
        <iframe
          src={content.src}
          title="webpage"
          className="absolute inset-0 w-full h-full bg-white"
        />
      );

    case "pdf":
      return (
        <iframe
          src={`${content.src}#page=${content.page ?? 1}&view=FitH`}
          title="pdf"
          className="absolute inset-0 w-full h-full bg-neutral-900"
        />
      );

    case "placeholder":
    default:
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_60%)]">
          <ImageOff className="w-10 h-10 text-neutral-600 mb-4" />
          <p className="text-neutral-500 text-sm max-w-md">
            {content.kind === "placeholder" && content.hint
              ? content.hint
              : "尚未放入內容，請於 optimusTour.ts 設定此頁的 content。"}
          </p>
        </div>
      );
  }
}
