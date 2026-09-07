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
  badgeBg: string;
  badgeText: string;
}

const INITIAL_SAVED_LINES: SavedLine[] = [
  {
    id: "saved-1",
    category: "Flirty",
    source: "AI Generated",
    line: "Are you a Wi-Fi signal? Because I’m feeling an absolute connection and I’m ready to ask for your password.",
    stats: "Used 3 times · 94% success",
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed",
  },
  {
    id: "saved-2",
    category: "Witty",
    source: "Custom Prompt",
    line: "I was trying to come up with a clever pickup line, but honestly, I'd rather just ask what your favorite midnight snack is.",
    stats: "Used 7 times · 98% success",
    badgeBg: "bg-secondary-fixed",
    badgeText: "text-on-secondary-fixed",
  },
  {
    id: "saved-3",
    category: "Romantic",
    source: "Daily Pick",
    line: "They say beauty is in the eye of the beholder, but clearly they haven't seen you smile across a crowded room.",
    stats: "Used 1 time · New",
    badgeBg: "bg-tertiary-fixed",
    badgeText: "text-on-tertiary-fixed",
  },
  {
    id: "saved-4",
    category: "Icebreakers",
    source: "Trending",
    line: "I was going to say something smooth about your coffee, but I got distracted by your smile instead.",
    stats: "Used 5 times · 96% success",
    badgeBg: "bg-primary-fixed-dim",
    badgeText: "text-on-primary-fixed",
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
    showToast("Copied to clipboard!");
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
    <div className="min-h-screen bg-surface flex flex-col items-center justify-start antialiased text-on-surface">
      {toastMessage && (
        <div className="fixed top-20 z-[60] px-4 py-2 bg-on-surface text-surface rounded-full text-label-sm font-medium shadow-lg animate-bounce flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary-container">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-2xl md:border-x md:border-outline-variant/30">
        <AppHeader title="Saved" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-28 bg-surface flex-1">
          <div className="flex flex-col w-full gap-6">
            {/* Free Premium Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container to-tertiary-container p-6 text-on-primary-container shadow-lg">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface/10 blur-xl pointer-events-none"></div>
              <div className="absolute right-12 -top-6 w-20 h-20 rounded-full bg-secondary-container/20 blur-lg pointer-events-none"></div>

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/20 backdrop-blur-md w-fit text-label-sm font-semibold text-white">
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    <span>Limited Time Perk</span>
                  </div>
                  <h2 className="font-headline-lg text-[22px] leading-tight text-white">
                    Unlock 5 Free AI Rizz Lines!
                  </h2>
                  <p className="font-body-md text-white/90 text-sm leading-relaxed">
                    Tap below to claim your complimentary premium prompt pack and level up your charm.
                  </p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl">card_giftcard</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-surface/15 flex items-center justify-between">
                <span className="text-label-sm text-white/80">Expires in 24 hours</span>
                <button
                  type="button"
                  onClick={handleClaimBonus}
                  disabled={isBonusClaimed}
                  className="px-5 py-2.5 rounded-full bg-surface text-primary font-label-lg shadow-md hover:bg-surface-bright active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-80"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isBonusClaimed ? "verified" : "redeem"}
                  </span>
                  <span>{isBonusClaimed ? "Unlocked!" : "Claim Free Lines"}</span>
                </button>
              </div>
            </div>

            {/* Mood Folders Horizontal Scroll */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-on-surface">Mood Folders</h3>
                <button
                  type="button"
                  onClick={() => showToast("Folder management")}
                  className="text-label-sm text-primary font-semibold hover:underline"
                >
                  Manage
                </button>
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                {MOOD_FOLDERS.map((folder) => {
                  const isActive = selectedFolder === folder.category;
                  return (
                    <button
                      key={folder.name}
                      type="button"
                      onClick={() => setSelectedFolder(folder.category)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl flex-shrink-0 transition-transform active:scale-95 cursor-pointer ${
                        isActive
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {folder.icon}
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="font-label-lg leading-none">{folder.name}</span>
                        <span
                          className={`text-[11px] mt-1 ${
                            isActive ? "opacity-80" : "opacity-60"
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

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-4 flex items-center text-outline pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved lines..."
                  className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-full text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 text-body-md transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => showToast("Sorted by most recent")}
                className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer"
                title="Sort"
              >
                <span className="material-symbols-outlined text-[20px]">sort</span>
              </button>
            </div>

            {/* Saved Lines List */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-on-surface">Saved Favorites</h3>
                <span className="text-label-sm text-on-surface-variant font-medium">
                  {lines.length} total
                </span>
              </div>

              {filteredLines.length > 0 ? (
                filteredLines.map((item) => {
                  const isCopied = copiedId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="group relative bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col gap-3 border border-outline-variant/20"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full ${item.badgeBg} ${item.badgeText} text-label-sm font-semibold`}
                          >
                            {item.category}
                          </span>
                          <span className="text-label-sm text-outline">• {item.source}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="text-primary hover:scale-110 transition-transform cursor-pointer"
                          title="Remove from saved"
                        >
                          <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      <p className="font-body-lg text-on-surface leading-relaxed">{item.line}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 gap-2">
                        <span className="text-xs text-outline whitespace-nowrap shrink-0">{item.stats}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.line, item.id)}
                          className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-label-sm active:scale-95 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                            isCopied
                              ? "bg-secondary text-on-secondary"
                              : "bg-primary-container text-on-primary-container hover:opacity-90"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px] shrink-0">
                            {isCopied ? "check" : "content_copy"}
                          </span>
                          <span className="whitespace-nowrap font-medium">{isCopied ? "Copied!" : "Quick Copy"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
                  <p className="text-body-md text-on-surface-variant">
                    No lines saved in this category yet.
                  </p>
                </div>
              )}

              {/* Inspiration / Call to Action */}
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-headline-md text-on-surface">Want more inspiration?</p>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    Generate fresh replies tailored to your specific chats instantly.
                  </p>
                </div>
                <Link
                  href="/"
                  className="mt-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-lg shadow-md hover:bg-surface-tint active:scale-95 transition-all inline-block"
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
