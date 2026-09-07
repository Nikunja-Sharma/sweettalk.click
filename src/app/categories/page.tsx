"use client";

import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  tag: "Dating Apps" | "Texting" | "IG Replies";
  sampleLines: string[];
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "coffee-date",
    name: "Coffee Date",
    subtitle: "Warm & casual openers",
    icon: "local_cafe",
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    badgeBg: "bg-amber-100 text-amber-800",
    badgeText: "text-amber-800",
    tag: "Dating Apps",
    sampleLines: [
      "I was going to say something smooth about your coffee, but I got distracted by your smile instead.",
      "Are you an espresso? Because you just woke up my whole week.",
    ],
  },
  {
    id: "late-night",
    name: "Late Night",
    subtitle: "Deep & slightly spicy",
    icon: "nights_stay",
    bgGradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
    badgeBg: "bg-indigo-100 text-indigo-800",
    badgeText: "text-indigo-800",
    tag: "Texting",
    sampleLines: [
      "You're the reason I check my phone with a smile at 2 AM. Sleep is overrated anyway.",
      "Truth or dare over text? You pick first.",
    ],
  },
  {
    id: "compliments",
    name: "Compliments",
    subtitle: "Genuine & flattering",
    icon: "favorite",
    bgGradient: "from-rose-500/10 via-pink-500/5 to-transparent",
    badgeBg: "bg-rose-100 text-rose-800",
    badgeText: "text-rose-800",
    tag: "IG Replies",
    sampleLines: [
      "They say beauty is in the eye of the beholder, but honestly you just set the standard.",
      "That outfit deserves its own national holiday.",
    ],
  },
  {
    id: "playful-teasing",
    name: "Playful Teasing",
    subtitle: "Witty & cheeky banter",
    icon: "sentiment_satisfied",
    bgGradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    badgeBg: "bg-violet-100 text-violet-800",
    badgeText: "text-violet-800",
    tag: "Dating Apps",
    sampleLines: [
      "Are you always this charming, or did you practice on someone else before matching with me?",
      "I give your taste in music a 7/10, but your smile easily bumps it up to an 11.",
    ],
  },
  {
    id: "apology-lines",
    name: "Apology Lines",
    subtitle: "Smooth recovery texts",
    icon: "handshake",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    badgeBg: "bg-emerald-100 text-emerald-800",
    badgeText: "text-emerald-800",
    tag: "Texting",
    sampleLines: [
      "My phone died, but my regret for leaving you on delivered is fully charged. Can I make it up to you with coffee?",
      "I got caught in a meeting that definitely could have been an email. Forgive me?",
    ],
  },
  {
    id: "adventurous",
    name: "Adventurous",
    subtitle: "Bold plans & dates",
    icon: "explore",
    bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent",
    badgeBg: "bg-sky-100 text-sky-800",
    badgeText: "text-sky-800",
    tag: "IG Replies",
    sampleLines: [
      "Let's skip the small talk. Are we getting tacos this Thursday or should I plan something more romantic?",
      "Next weekend, pack a bag. We're getting sunset ice cream and zero excuses.",
    ],
  },
];

export default function CategoriesPage() {
  const [currentTab, setCurrentTab] = useState<"Dating Apps" | "Texting" | "IG Replies">("Dating Apps");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ h: "04", m: "12", s: "55" });

  useEffect(() => {
    let totalSeconds = 4 * 3600 + 12 * 60 + 55;
    const interval = setInterval(() => {
      totalSeconds--;
      if (totalSeconds < 0) totalSeconds = 0;
      const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
      const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
      const s = (totalSeconds % 60).toString().padStart(2, "0");
      setCountdown({ h, m, s });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const filteredCategories = CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
        <AppHeader title="Categories" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-32 bg-surface flex-1">
          <div className="flex flex-col w-full pb-6">
            {/* Vibe Segmented Pill Toggle */}
            <div className="flex bg-zinc-100/90 p-1 rounded-full mb-4 border border-black/[0.04]">
              {(["Dating Apps", "Texting", "IG Replies"] as const).map((tab) => {
                const isActive = currentTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setCurrentTab(tab)}
                    className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all duration-200 text-center cursor-pointer active:scale-95 ${
                      isActive
                        ? "bg-white text-zinc-900 shadow-sm font-bold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative mb-5">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vibes, topics, or keywords..."
                className="w-full bg-white text-on-surface placeholder:text-outline/70 py-3 pl-10 pr-9 rounded-2xl border border-black/[0.06] focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs sm:text-sm shadow-2xs transition-all"
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

            {/* Daily Special Flash Sale Card */}
            <div className="bg-gradient-to-br from-primary to-indigo-700 rounded-3xl p-5 mb-6 text-white shadow-soft relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-6 -top-6 w-28 h-28 bg-rose-400/20 rounded-full blur-xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase backdrop-blur-md border border-white/20">
                    ✨ Daily Drop
                  </span>
                  <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full text-[11px] backdrop-blur-md text-white font-mono border border-white/10">
                    <span className="material-symbols-outlined text-[13px] text-amber-300">timer</span>
                    <span>
                      {countdown.h}:{countdown.m}:{countdown.s}
                    </span>
                  </div>
                </div>

                <h3 className="font-headline-lg mb-1 text-white text-lg sm:text-xl">
                  Rizz God Ultimate Pack
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mb-4 leading-relaxed">
                  50+ irresistible icebreakers tailored to get a reply in under 10 minutes.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsUnlocked(true);
                    showToast("Unlocked 50+ Icebreakers! 🎉");
                  }}
                  disabled={isUnlocked}
                  className="bg-white text-primary font-semibold text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-zinc-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-85"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isUnlocked ? "verified" : "bolt"}
                  </span>
                  <span>{isUnlocked ? "Pack Unlocked!" : "Unlock Free Today"}</span>
                </button>
              </div>
            </div>

            {/* Category Grid Header */}
            <div className="flex justify-between items-center mb-3 px-1">
              <div>
                <h2 className="font-headline-md text-on-surface text-base sm:text-lg">
                  Explore Vibes
                </h2>
                <p className="text-[11px] text-outline">Categorized by conversation tone</p>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            </div>

            {/* 2-Column Grid with rich card styling */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full text-left bg-white rounded-3xl p-4 flex flex-col justify-between h-40 relative overflow-hidden group cursor-pointer hover:shadow-soft hover:-translate-y-1 transition-all duration-300 ease-out border border-black/[0.05] active:scale-95 shadow-2xs select-none touch-manipulation"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-60 pointer-events-none`}
                  ></div>

                  <div className="relative z-10 pointer-events-none">
                    <div
                      className={`w-9 h-9 rounded-2xl ${cat.badgeBg} flex items-center justify-center mb-2 shadow-2xs group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {cat.icon}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-on-surface leading-tight mt-1">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant/70 mt-0.5 leading-snug">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-2 border-t border-black/[0.04] pointer-events-none">
                    <span className="text-[10px] font-semibold text-primary">
                      {cat.sampleLines.length} lines
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Category Modal / Bottom Drawer for selected vibe */}
            {selectedCategory && (
              <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-xs flex items-end justify-center p-0 md:p-4">
                <div className="w-full max-w-md bg-white rounded-t-3xl md:rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom border border-black/[0.06]">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-2xl ${selectedCategory.badgeBg} flex items-center justify-center`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {selectedCategory.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-on-surface text-base">
                          {selectedCategory.name}
                        </h3>
                        <p className="text-xs text-outline">{selectedCategory.subtitle}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-on-surface-variant font-semibold">
                      Curated Icebreakers:
                    </p>
                    {selectedCategory.sampleLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-zinc-50 border border-black/[0.05] flex flex-col gap-2"
                      >
                        <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                          {line}
                        </p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(line);
                              showToast("Line copied! 📋");
                            }}
                            className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              content_copy
                            </span>
                            Copy Line
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="w-full py-3 rounded-full bg-primary text-white font-semibold text-xs shadow-md hover:bg-surface-tint active:scale-95 transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Custom Vibe Request Banner */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-2xs border border-black/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface leading-tight">
                    Need a custom vibe?
                  </h4>
                  <p className="text-xs text-on-surface-variant/70 mt-0.5">
                    Describe your exact conversation context.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast("Opening custom generator...")}
                className="bg-primary text-white w-9 h-9 rounded-full shadow-md hover:opacity-90 active:scale-90 transition-transform flex items-center justify-center shrink-0 cursor-pointer"
                title="Create custom vibe"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
