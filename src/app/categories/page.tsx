"use client";

import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
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
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed",
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
    badgeBg: "bg-secondary-fixed",
    badgeText: "text-on-secondary-fixed",
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
    badgeBg: "bg-tertiary-fixed",
    badgeText: "text-on-tertiary-fixed",
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
    badgeBg: "bg-primary-fixed-dim",
    badgeText: "text-on-primary-fixed",
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
    badgeBg: "bg-error-container",
    badgeText: "text-on-error-container",
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
    badgeBg: "bg-secondary-fixed-dim",
    badgeText: "text-on-secondary-fixed",
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
        <AppHeader title="Categories" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-28 bg-surface flex-1">
          <div className="flex flex-col w-full pb-6">
            {/* Vibe Segmented Pill Toggle */}
            <div className="flex bg-surface-container p-1 rounded-full mb-5">
              {(["Dating Apps", "Texting", "IG Replies"] as const).map((tab) => {
                const isActive = currentTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setCurrentTab(tab)}
                    className={`flex-1 py-2 px-3 rounded-full font-label-lg transition-all text-center cursor-pointer ${
                      isActive
                        ? "bg-primary text-on-primary shadow-sm font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vibes, topics, or keywords..."
                className="w-full bg-surface-container-low text-on-surface placeholder:text-outline py-3.5 pl-11 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-body-md shadow-xs transition-all"
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

            {/* Daily Special Flash Sale Card */}
            <div className="bg-gradient-to-br from-primary-container to-secondary-container rounded-card p-5 mb-6 text-on-primary-container shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-label-sm font-bold tracking-wide uppercase backdrop-blur-md">
                  ✨ Daily Special
                </span>
                <div className="flex items-center gap-1 bg-black/25 px-3 py-1 rounded-full text-label-sm backdrop-blur-md text-white font-mono">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  <span>
                    {countdown.h}:{countdown.m}:{countdown.s}
                  </span>
                </div>
              </div>

              <h3 className="font-headline-lg mb-1 text-white">Rizz God Ultimate Pack</h3>
              <p className="font-body-md text-white/90 mb-4 leading-relaxed">
                50+ irresistible icebreakers guaranteed to get a reply in under 10 minutes.
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsUnlocked(true);
                  showToast("Unlocked 50+ Icebreakers! 🎉");
                }}
                disabled={isUnlocked}
                className="bg-white text-primary font-label-lg px-6 py-2.5 rounded-full shadow-md hover:bg-surface active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-85"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isUnlocked ? "verified" : "bolt"}
                </span>
                <span>{isUnlocked ? "Pack Unlocked!" : "Unlock Free Today"}</span>
              </button>
            </div>

            {/* Category Grid Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-md text-on-surface">Explore Vibes</h2>
              <span
                onClick={() => setSearchQuery("")}
                className="text-label-sm text-primary font-bold cursor-pointer hover:underline"
              >
                View All
              </span>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-surface-container rounded-card p-4 flex flex-col justify-between h-44 relative overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out border border-outline-variant/15 active:scale-95"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${cat.badgeBg} flex items-center justify-center ${cat.badgeText} mb-2 shadow-xs group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {cat.icon}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-headline-md text-on-surface mb-1 leading-snug">
                      {cat.name}
                    </h4>
                    <p className="text-label-sm text-on-surface-variant">{cat.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Modal / Bottom Drawer for selected vibe */}
            {selectedCategory && (
              <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-xs flex items-end justify-center p-0 md:p-4">
                <div className="w-full max-w-md bg-surface-container-lowest rounded-t-3xl md:rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full ${selectedCategory.badgeBg} flex items-center justify-center ${selectedCategory.badgeText}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {selectedCategory.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-on-surface">
                          {selectedCategory.name}
                        </h3>
                        <p className="text-label-sm text-outline">
                          {selectedCategory.subtitle}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-label-sm text-on-surface-variant font-semibold">
                      Sample Openers:
                    </p>
                    {selectedCategory.sampleLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2"
                      >
                        <p className="text-body-md text-on-surface">{line}</p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(line);
                              showToast("Line copied!");
                            }}
                            className="text-label-sm text-primary font-semibold flex items-center gap-1 hover:underline"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              content_copy
                            </span>
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="w-full py-3 rounded-full bg-primary text-on-primary font-label-lg shadow-sm hover:bg-surface-tint active:scale-95 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Custom Vibe Request Banner */}
            <div className="bg-surface-container-high rounded-card p-5 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-on-surface leading-tight">
                    Need a custom vibe?
                  </h4>
                  <p className="text-body-md text-on-surface-variant text-xs mt-0.5">
                    Describe your exact situation and let AI generate.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast("Opening custom prompt creator")}
                className="bg-primary text-on-primary p-3 rounded-full shadow-md hover:opacity-90 transition-transform active:scale-95 shrink-0 cursor-pointer"
                title="Create custom vibe"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
