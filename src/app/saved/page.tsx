"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

interface SavedLine {
  id: string;
  category: "Flirty" | "Witty" | "Romantic" | "Icebreakers";
  source: string;
  line: string;
  stats: string;
  badgeTone: string;
}

const INITIAL_SAVED_LINES: SavedLine[] = [
  {
    id: "saved-1",
    category: "Flirty",
    source: "AI Generated",
    line: "Are you a Wi-Fi signal? Because I’m feeling an absolute connection and I’m ready to ask for your password.",
    stats: "Used 3 times · 94% success",
    badgeTone: "bg-rose-50 text-rose-700 border-rose-200/60",
  },
  {
    id: "saved-2",
    category: "Witty",
    source: "Custom Prompt",
    line: "I was trying to come up with a clever pickup line, but honestly, I'd rather just ask what your favorite midnight snack is.",
    stats: "Used 7 times · 98% success",
    badgeTone: "bg-violet-50 text-violet-700 border-violet-200/60",
  },
  {
    id: "saved-3",
    category: "Romantic",
    source: "Daily Pick",
    line: "They say beauty is in the eye of the beholder, but clearly they haven't seen you smile across a crowded room.",
    stats: "Used 1 time · New",
    badgeTone: "bg-pink-50 text-pink-700 border-pink-200/60",
  },
  {
    id: "saved-4",
    category: "Icebreakers",
    source: "Trending",
    line: "I was going to say something smooth about your coffee, but I got distracted by your smile instead.",
    stats: "Used 5 times · 96% success",
    badgeTone: "bg-amber-50 text-amber-700 border-amber-200/60",
  },
];

const MOOD_FOLDERS = [
  { name: "Flirty & Bold", category: "Flirty", icon: "local_fire_department", count: 14 },
  { name: "Sweet & Romantic", category: "Romantic", icon: "favorite", count: 8 },
  { name: "Witty & Playful", category: "Witty", icon: "psychology", count: 19 },
  { name: "Icebreakers", category: "Icebreakers", icon: "coffee", count: 12 },
];

export default function SavedPage() {
  const [selectedFolder, setSelectedFolder] = useState<string>("Flirty");
  const [searchQuery, setSearchQuery] = useState("");
  const [lines, setLines] = useState<SavedLine[]>(INITIAL_SAVED_LINES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isBonusClaimed, setIsBonusClaimed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to clipboard! 📋");
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  const handleRemove = (id: string) => {
    setLines((prev) => prev.filter((item) => item.id !== id));
    showToast("Line removed from saved");
  };

  const handleClaimBonus = () => {
    setIsBonusClaimed(true);
    showToast("Claimed 5 Free AI Rizz Lines! 🎉");
  };

  const filteredLines = lines.filter((item) => {
    const matchesFolder = item.category === selectedFolder;
    const matchesSearch = item.line.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col items-center justify-start antialiased text-on-surface">
      {toastMessage && (
        <div className="fixed top-20 z-[60] px-4 py-2.5 bg-zinc-900/90 text-white backdrop-blur-md rounded-full text-label-sm font-medium shadow-xl animate-fade-in-up flex items-center gap-2 border border-white/10">
          <span className="material-symbols-outlined text-[16px] text-primary-fixed">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-xl shadow-black/5 md:border-x md:border-black/[0.05]">
        <AppHeader title="Saved" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-32 bg-surface flex-1">
          <div className="flex flex-col w-full gap-5">
            {/* Free Premium Perk Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-indigo-700 p-5 text-white shadow-soft">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
              <div className="absolute right-12 -top-6 w-20 h-20 rounded-full bg-purple-400/20 blur-lg pointer-events-none"></div>

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md w-fit text-[11px] font-semibold text-white border border-white/20">
                    <span className="material-symbols-outlined text-[13px]">bolt</span>
                    <span>Free Perk</span>
                  </div>
                  <h2 className="font-headline-lg text-lg sm:text-xl leading-tight text-white mt-0.5">
                    Unlock 5 Free AI Rizz Lines!
                  </h2>
                  <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                    Claim your complimentary premium prompt pack and level up your charm.
                  </p>
                </div>
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <span className="material-symbols-outlined text-[22px]">card_giftcard</span>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between">
                <span className="text-[11px] text-white/70">Expires in 24 hours</span>
                <button
                  type="button"
                  onClick={handleClaimBonus}
                  disabled={isBonusClaimed}
                  className="px-4 py-2 rounded-full bg-white text-primary font-semibold text-xs shadow-md hover:bg-zinc-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-85"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isBonusClaimed ? "verified" : "redeem"}
                  </span>
                  <span>{isBonusClaimed ? "Unlocked!" : "Claim Free Lines"}</span>
                </button>
              </div>
            </div>

            {/* Mood Folders Horizontal Scroll */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-headline-md text-on-surface text-base">Mood Folders</h3>
                <button
                  type="button"
                  onClick={() => showToast("Manage folders")}
                  className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                >
                  Manage
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                {MOOD_FOLDERS.map((folder) => {
                  const isActive = selectedFolder === folder.category;
                  return (
                    <button
                      key={folder.name}
                      type="button"
                      onClick={() => setSelectedFolder(folder.category)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl flex-shrink-0 transition-all duration-200 active:scale-95 cursor-pointer border ${
                        isActive
                          ? "bg-primary-container text-white border-primary-container shadow-xs scale-105"
                          : "bg-white text-on-surface border-black/[0.06] hover:border-black/[0.15]"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {folder.icon}
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold leading-tight">{folder.name}</span>
                        <span
                          className={`text-[10px] mt-0.5 ${
                            isActive ? "text-white/80" : "text-outline"
                          }`}
                        >
                          {folder.count} items
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-outline pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved lines..."
                className="w-full h-11 pl-10 pr-4 bg-white rounded-2xl border border-black/[0.06] text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs sm:text-sm shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Saved Lines List */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-headline-md text-on-surface text-base">Saved Favorites</h3>
                <span className="text-[11px] text-outline font-medium">
                  {lines.length} total saved
                </span>
              </div>

              {filteredLines.length > 0 ? (
                filteredLines.map((item) => {
                  const isCopied = copiedId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col gap-3 border border-black/[0.06]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.badgeTone}`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[11px] text-outline">• {item.source}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <span
                            className="material-symbols-outlined text-[18px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      <p className="font-body-lg text-on-surface leading-relaxed text-xs sm:text-sm bg-zinc-50/70 p-3.5 rounded-2xl border border-black/[0.03]">
                        {item.line}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-black/[0.04] gap-2">
                        <span className="text-[11px] text-outline whitespace-nowrap shrink-0">
                          {item.stats}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.line, item.id)}
                          className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold active:scale-95 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                            isCopied
                              ? "bg-zinc-900 text-white"
                              : "bg-primary text-white hover:opacity-90"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px] shrink-0">
                            {isCopied ? "check" : "content_copy"}
                          </span>
                          <span className="whitespace-nowrap">
                            {isCopied ? "Copied!" : "Quick Copy"}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white rounded-3xl border border-black/[0.06]">
                  <p className="text-xs text-on-surface-variant">
                    No lines saved in this category yet.
                  </p>
                </div>
              )}

              {/* Inspiration CTA */}
              <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-headline-md text-on-surface text-sm">Want fresh ideas?</p>
                  <p className="text-xs text-on-surface-variant/70">
                    Generate tailored replies for your current matches.
                  </p>
                </div>
                <Link
                  href="/"
                  className="mt-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-xs shadow-md hover:bg-surface-tint active:scale-95 transition-all inline-block"
                >
                  Generate New Lines
                </Link>
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
