import { useState } from "react";
import RoomSpeakers from "./RoomSpeakers";
import RoomListeners from "./RoomListeners";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  avatar: string;
  isMuted?: boolean;
  isSpeaking?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const SPEAKERS: User[] = [
  {
    id: 1,
    name: "Adriana",
    avatar: "https://i.pravatar.cc/150?img=1",
    isSpeaking: false,
  },
  {
    id: 2,
    name: "Brad",
    avatar: "https://i.pravatar.cc/150?img=12",
    isSpeaking: false,
  },
  {
    id: 3,
    name: "Brian",
    avatar: "https://i.pravatar.cc/150?img=13",
    isSpeaking: true,
  },
  {
    id: 4,
    name: "Rosy",
    avatar: "https://i.pravatar.cc/150?img=5",
    isMuted: true,
    isSpeaking: false,
  },
];

const LISTENERS: User[] = [
  { id: 5, name: "Waheed", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 6, name: "Ivan", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: 7, name: "Adriana", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 8, name: "Waheed", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 9, name: "Adrian", avatar: "https://i.pravatar.cc/150?img=16" },
  { id: 10, name: "Denis", avatar: "https://i.pravatar.cc/150?img=17" },
  { id: 11, name: "Rayu", avatar: "https://i.pravatar.cc/150?img=18" },
  { id: 12, name: "Patrick", avatar: "https://i.pravatar.cc/150?img=19" },
  { id: 13, name: "Maxim", avatar: "https://i.pravatar.cc/150?img=20" },
  { id: 14, name: "Rosy", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: 15, name: "Waheed", avatar: "https://i.pravatar.cc/150?img=21" },
  { id: 16, name: "Ivan", avatar: "https://i.pravatar.cc/150?img=22" },
  { id: 17, name: "Adriana", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 18, name: "Waheed", avatar: "https://i.pravatar.cc/150?img=23" },
  { id: 19, name: "Adrian", avatar: "https://i.pravatar.cc/150?img=24" },
  { id: 20, name: "Denis", avatar: "https://i.pravatar.cc/150?img=25" },
  { id: 21, name: "Rayu", avatar: "https://i.pravatar.cc/150?img=26" },
  { id: 22, name: "Patrick", avatar: "https://i.pravatar.cc/150?img=27" },
  { id: 23, name: "Maxim", avatar: "https://i.pravatar.cc/150?img=28" },
];

const RoomBoard = () => {
  const [isRaised, setIsRaised] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);
  return (
    <main className="container mx-auto px-4 sm:px-1 py-8 space-y-8 fade-up">
      {/* Room header card */}
      <div className="rounded-2xl bg-secondary  p-6">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400 tracking-widest uppercase">
                Live
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white leading-snug max-w-md">
              Artificial intelligence is the future?
            </h1>
            <p className="text-slate-500 text-sm">
              {SPEAKERS.length} speakers · {LISTENERS.length} listening
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsRaised(!isRaised)}
              title="Raise hand"
              className={[
                "w-10 h-10 rounded-xl border transition-all duration-200 flex items-center justify-center text-base",
                isRaised
                  ? "border-amber-500/60 bg-amber-500/10 text-amber-400"
                  : "bg-input border-input  text-slate-400 ",
              ].join(" ")}
            >
              ✋
            </button>

            <button
              onClick={() => setHasLeft(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all duration-200 text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              Leave quietly
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-input mb-8" />

        {/* Speakers section */}
        <RoomSpeakers speakers={SPEAKERS} />

        {/* Divider */}
        <div className="h-px bg-input mb-8" />

        {/* Listeners section */}
        <RoomListeners listeners={LISTENERS} />
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </main>
  );
};

export default RoomBoard;
