/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Optimus 導覽簡報的內容資料。
 * --------------------------------------------------------------------------
 * 只要編輯下方的 `tourSlides` 陣列即可決定導覽要展示哪些內容，順序＝陣列順序。
 * 每一頁（slide）的 `content` 可以是下列其中一種：
 *
 *   { kind: "image",  src: "/xxx.png", alt?, fit? }   靜態圖片 / 螢幕截圖
 *   { kind: "video",  src: "/xxx.mp4", poster?, autoPlay?, loop? }  影片
 *   { kind: "webpage", src: "https://..." }           內嵌實際網頁（iframe）
 *   { kind: "pdf",    src: "/xxx.pdf", page? }         內嵌 PDF（page 可指定起始頁）
 *   { kind: "placeholder", hint?: "說明文字" }          尚未決定內容的佔位
 *
 * 圖片 / 影片 / PDF 放在 public/ 之下，再用 "/檔名" 引用即可。
 */

export type SlideContent =
  | { kind: "image"; src: string; alt?: string; fit?: "contain" | "cover" }
  | {
      kind: "video";
      src: string;
      poster?: string;
      autoPlay?: boolean;
      loop?: boolean;
    }
  | { kind: "webpage"; src: string }
  | { kind: "pdf"; src: string; page?: number }
  | { kind: "placeholder"; hint?: string };

export interface TourSlide {
  /** 穩定的識別字串（給 React key 用，隨意命名但不要重複）。 */
  id: string;
  /** 大標題。 */
  title: string;
  /** 小標 / 補充說明（可省略）。 */
  description?: string;
  /** 這一頁要展示的主要內容。 */
  content: SlideContent;
  /**
   * 選填：相關網址。不論 content 是哪一種 kind，只要填了 url，
   * 該頁就會出現「開啟網頁」按鈕，點擊後以新分頁開啟此網址。
   * 需要錨點時直接寫在網址後面即可，例如 "/page.html#ceo"。
   */
  url?: string;
  /**
   * 選填：側邊裝飾圖要放在左側還是右側，預設 "right"。
   * （圖片來源依此頁的流水號自動對應 optimus-N，不需另外指定。）
   */
  decoSide?: "left" | "right";
}

export const tourSlides: TourSlide[] = [
  {
    id: "overview",
    title: "Overview",
    description: "Overview",
    content: {
      kind: "pdf",
      src: "/optimus-ai.pdf",
    },
  },
  // {
  //   id: "cover",
  //   title: "Optimus 開發進度",
  //   description: "CEO 專屬數位助理 — 進度導覽",
  //   content: {
  //     kind: "image",
  //     src: "/optimus-screen-1.png",
  //   },
  // },
  {
    id: "screenshot-demo",
    title: "WEB - CEO 工作台",
    description: "進入 CEO 工作台，可以查看所有會議、邀約、待辦事項",
    content: {
      kind: "image",
      src: "/optimus-screen-1.png",
    },
    url: "http://100.101.75.40/dashboard",
  },
  {
    id: "video-demo",
    title: "WEB - 操作影片",
    description: "操作示範影片",
    content: {
      kind: "video",
      src: "/web-demo.mp4",
    },
    url: "http://100.101.75.40/dashboard",
  },
  {
    id: "demoflow",
    title: "Demo Flow",
    description: "Demo Flow",
    content: {
      kind: "webpage",
      src: "/optimus-demo.html",
    },
  },

  {
    id: "live-webpage",
    title: "模擬問題",
    description: "向 Optimus 提問，例如：會議議程、待辦事項、邀約等",
    content: {
      kind: "image",
      src: "/optimus-ask.png",
    },
    url: "/frontdesk-meeting-qa.html#ceo",
  },
  {
    id: "todo",
    title: "問題點列表",
    description: "列出可能的問題點",
    content: {
      kind: "image",
      src: "/todo.png",
    },
  },
];
