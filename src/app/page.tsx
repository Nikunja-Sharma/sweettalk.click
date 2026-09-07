"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

interface RizzCard {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  rizzScore: string;
  badgeTone: string;
  line: string;
  usageCount: string;
  vibe: string;
}

const INITIAL_TRENDING_LINES: RizzCard[] = [
  {
    id: "card-1",
    emoji: "☕",
    title: "The Coffee Shop Opener",
    subtitle: "Best for Instagram Story Replies",
    rizzScore: "98% Match",
    badgeTone: "bg-amber-50 text-amber-700 border-amber-200/60",
    line: "I was going to say something smooth about your coffee, but I got distracted by your smile instead.",
    usageCount: "4.2k sent today",
    vibe: "Sweet",
  },
  {
    id: "card-2",
    emoji: "🌙",
    title: "Late Night Text Back",
    subtitle: "Best for Midnight Chats",
    rizzScore: "95% Match",
    badgeTone: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    line: "You're the reason I check my phone with a smile at 2 AM. Sleep is overrated anyway.",
    usageCount: "2.8k sent today",
    vibe: "Sweet",
  },
  {
    id: "card-3",
    emoji: "🎯",
    title: "The Bold Direct Approach",
    subtitle: "High Risk, High Reward",
    rizzScore: "99% Match",
    badgeTone: "bg-rose-50 text-rose-700 border-rose-200/60",
    line: "Let's skip the small talk. Are we getting tacos this Thursday or should I plan something more romantic?",
    usageCount: "6.1k sent today",
    vibe: "Bold",
  },
  {
    id: "card-4",
    emoji: "⚡",
    title: "The Playful Challenge",
    subtitle: "Great for Hinge & Tinder Matches",
    rizzScore: "97% Match",
    badgeTone: "bg-violet-50 text-violet-700 border-violet-200/60",
    line: "Are you always this charming, or did you practice on someone else before matching with me?",
    usageCount: "3.9k sent today",
    vibe: "Witty",
  },
];

const AI_SUGGESTIONS_BY_MOOD: Record<string, string[]> = {
  Flirty: [
    '"Are you Wi-Fi? Because I\'m feeling a serious connection, and honestly I don\'t even need a password to love it."',
    '"Do you believe in love at first swipe, or should I unmatch and match with you again?"',
    '"If being ridiculously attractive was a crime, you\'d be serving a life sentence without parole."',
  ],
  Witty: [
    '"I\'d tell you you\'re cute, but I don\'t want it going to your head. (Too late?)"',
    '"My therapist told me to follow my dreams, so here I am sliding into your DMs."',
    '"Are you French? Because Eiffel for you pretty hard."',
  ],
  Sweet: [
    '"I don\'t usually text first, but you looked way too interesting to leave to chance."',
    '"Hope your day is as bright and lovely as your smile in your second picture."',
    '"Just wanted to drop by and remind you that you have the most infectious energy."',
  ],
  Bold: [
    '"I\'m not usually a gambler, but I\'d bet everything that our first date will be legendary."',
    '"Let\'s skip the 3-day texting rule. Are you free for drinks tomorrow at 7?"',
    '"I had a whole speech prepared, but then you smiled and my brain completely short-circuited."',
  ],
};

const VIBE_CATEGORIES = [
  { name: "Sweet", icon: "favorite" },
  { name: "Witty", icon: "bolt" },
  { name: "Cheesy", icon: "local_fire_department" },
  { name: "Bold", icon: "psychology" },
  { name: "First Text", icon: "waving_hand" },
];

const MOODS = [
  { id: "Flirty", label: "Flirty", emoji: "🔥" },
  { id: "Witty", label: "Witty", emoji: "💡" },
  { id: "Sweet", label: "Sweet", emoji: "💖" },
  { id: "Bold", label: "Bold", emoji: "⚡" },
];

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string>("Flirty");
  const [selectedVibe, setSelectedVibe] = useState<string>("Sweet");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLine, setGeneratedLine] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [useSampleChat, setUseSampleChat] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    "ai-output": false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = !prev[id];
      showToast(next ? "Saved to Favorites ❤️" : "Removed from Saved");
      return { ...prev, [id]: next };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setUseSampleChat(false);
      showToast("Chat screenshot uploaded!");
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const options = AI_SUGGESTIONS_BY_MOOD[selectedMood] || AI_SUGGESTIONS_BY_MOOD.Flirty;
      const randomLine = options[Math.floor(Math.random() * options.length)];
      setGeneratedLine(randomLine);
      setHasGenerated(true);
      setIsGenerating(false);

      setTimeout(() => {
        const outputCard = document.getElementById("ai-output-card");
        outputCard?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }, 600);
  };

  const filteredCards = INITIAL_TRENDING_LINES.filter((card) => {
    if (selectedVibe === "First Text") return true;
    return card.vibe.toLowerCase() === selectedVibe.toLowerCase() || selectedVibe === "Sweet";
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col items-center justify-start antialiased text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 z-[60] px-4 py-2.5 bg-zinc-900/90 text-white backdrop-blur-md rounded-full text-label-sm font-medium shadow-xl animate-fade-in-up flex items-center gap-2 border border-white/10">
          <span className="material-symbols-outlined text-[16px] text-primary-fixed">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Shell */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-xl shadow-black/5 md:border-x md:border-black/[0.05]">
        <AppHeader title="Home" />

        {/* Scrollable Main Area */}
        <main className="flex flex-col relative w-full px-4 pt-20 pb-32 bg-surface flex-1">
          <div className="flex flex-col w-full gap-5">
            {/* Hero AI Generator Card */}
            <div className="relative w-full rounded-3xl bg-white border border-black/[0.06] p-5 flex flex-col justify-between overflow-hidden shadow-soft">
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  AI Conversation Wingman
                </span>
                <span className="text-[11px] font-medium text-on-surface-variant/70">
                  Powered by SweetTalk
                </span>
              </div>

              <h1 className="font-headline-lg text-on-surface mb-1.5 tracking-tight">
                Never Get Left on Read!
              </h1>
              <p className="font-body-md text-on-surface-variant/80 mb-4 text-xs sm:text-sm leading-relaxed">
                Upload your chat screenshot to instantly generate witty, flirty, and high-converting replies.
              </p>

              {/* Chat Upload or Sample Mockup */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] bg-zinc-50 mb-4 group shadow-xs">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded chat preview"
                    width={400}
                    height={200}
                    className="w-full max-h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-semibold flex items-center gap-1 shadow-md hover:bg-zinc-100"
                    >
                      <span className="material-symbols-outlined text-[15px]">change_circle</span>
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold flex items-center gap-1 shadow-md hover:bg-red-700"
                    >
                      <span className="material-symbols-outlined text-[15px]">delete</span>
                      Remove
                    </button>
                  </div>
                  <div className="p-2.5 bg-white text-xs text-on-surface flex items-center justify-between border-t border-black/[0.04]">
                    <span className="flex items-center gap-1.5 text-primary font-semibold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Screenshot ready to generate
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="text-outline hover:text-red-600"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : useSampleChat ? (
                /* Sample Chat Bubble Preview */
                <div className="rounded-2xl border border-black/[0.06] bg-gradient-to-b from-zinc-50 to-white p-3.5 mb-4 shadow-2xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-700">
                        JS
                      </div>
                      <span className="text-xs font-semibold text-zinc-800">Jessica</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseSampleChat(false)}
                      className="text-[11px] text-primary hover:underline font-medium"
                    >
                      Switch to Upload
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 py-1">
                    <div className="self-start max-w-[85%] bg-zinc-200/80 text-zinc-900 rounded-2xl rounded-tl-sm px-3.5 py-2 text-xs leading-relaxed">
                      So what are we doing this Friday? You promised to plan something fun 😏
                    </div>
                    <div className="self-end max-w-[85%] bg-primary text-white rounded-2xl rounded-tr-sm px-3.5 py-2 text-xs leading-relaxed opacity-60">
                      Tap generate below for best replies...
                    </div>
                  </div>
                </div>
              ) : (
                /* Upload Dropzone Container */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      setUploadedImage(URL.createObjectURL(file));
                      showToast("Screenshot uploaded!");
                    }
                  }}
                  className="group border border-dashed border-primary/30 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2.5 bg-primary/[0.02] hover:bg-primary/[0.05] hover:border-primary/60 transition-all cursor-pointer mb-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-primary shadow-xs group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-semibold text-on-surface">
                      Drop chat screenshot or tap to upload
                    </p>
                    <p className="text-[11px] text-on-surface-variant/70 mt-0.5">
                      Works with Tinder, Bumble, Hinge &amp; Instagram
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUseSampleChat(true);
                      showToast("Loaded sample conversation!");
                    }}
                    className="mt-1 text-[11px] text-primary font-semibold hover:underline bg-primary/10 px-3 py-1 rounded-full active:scale-95 transition-transform"
                  >
                    ✨ Or try with sample chat
                  </button>
                </div>
              )}

              {/* Select AI Mood Chips */}
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface-variant">
                    Select Tone
                  </label>
                  <span className="text-[11px] text-outline">
                    Current: <strong className="text-primary">{selectedMood}</strong>
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {MOODS.map((mood) => {
                    const isSelected = selectedMood === mood.id;
                    return (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setSelectedMood(mood.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-90 select-none ${
                          isSelected
                            ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                            : "bg-surface-container-high/60 text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                      >
                        <span>{mood.emoji}</span>
                        <span>{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate AI Reply Button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary to-primary-container hover:opacity-95 text-white rounded-full py-3.5 font-label-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-primary/25 active:scale-95 cursor-pointer disabled:opacity-75 relative overflow-hidden"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    <span className="font-semibold">Brewing Charm...</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold tracking-wide">Generate AI Reply</span>
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </>
                )}
              </button>
            </div>

            {/* Vibe Check Horizontal Tabs */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-headline-md text-on-surface">Vibe Check</h2>
                <Link
                  href="/categories"
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Explore All →
                </Link>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {VIBE_CATEGORIES.map((cat) => {
                  const isActive = selectedVibe === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedVibe(cat.name)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 active:scale-90 cursor-pointer ${
                        isActive
                          ? "bg-primary-container text-white shadow-xs scale-105"
                          : "bg-white border border-black/[0.06] text-on-surface-variant hover:border-black/[0.15]"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {cat.icon}
                      </span>
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Output Section */}
            {hasGenerated && (
              <div
                id="ai-output-card"
                className="rounded-3xl bg-white border border-primary/30 p-5 flex flex-col gap-3 shadow-soft ring-4 ring-primary/5 transition-all duration-300 ease-out animate-fade-in-up"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[18px] text-primary animate-spin"
                      style={{ animationDuration: "4s" }}
                    >
                      auto_awesome
                    </span>
                    Fresh AI Creation • {selectedMood}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold border border-primary/20">
                    99% Rizz
                  </span>
                </div>

                <p className="font-body-lg text-on-surface bg-zinc-50 p-4 rounded-2xl border border-black/[0.04] leading-relaxed text-sm sm:text-[15px]">
                  {generatedLine ||
                    `"Are you Wi-Fi? Because I'm feeling a serious connection, and honestly I don't even need a password to love it."`}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                    <span>New Variation</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          generatedLine ||
                            `"Are you Wi-Fi? Because I'm feeling a serious connection, and honestly I don't even need a password to love it."`,
                          "ai-output"
                        )
                      }
                      className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${
                        copiedId === "ai-output"
                          ? "bg-zinc-900 text-white border-transparent"
                          : "bg-white border-black/[0.08] text-on-surface hover:bg-zinc-50"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {copiedId === "ai-output" ? "check" : "content_copy"}
                      </span>
                      <span>{copiedId === "ai-output" ? "Copied!" : "Copy"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite("ai-output")}
                      className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${
                        favorites["ai-output"]
                          ? "bg-primary text-white"
                          : "bg-white border border-black/[0.08] text-on-surface hover:bg-zinc-50"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[15px] ${
                          favorites["ai-output"] ? "animate-heart-pop text-rose-300" : ""
                        }`}
                        style={{
                          fontVariationSettings: favorites["ai-output"]
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                      >
                        favorite
                      </span>
                      <span>{favorites["ai-output"] ? "Saved" : "Save"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Rizz Lines */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-1">
                <div>
                  <h2 className="font-headline-md text-on-surface">Trending Lines</h2>
                  <p className="text-[11px] text-outline mt-0.5">Voted top charm this week</p>
                </div>
                <span className="text-[11px] font-medium text-outline bg-black/[0.03] px-2.5 py-1 rounded-full">
                  Updated hourly
                </span>
              </div>

              {filteredCards.map((card) => {
                const isFav = !!favorites[card.id];
                const isCopied = copiedId === card.id;

                return (
                  <div
                    key={card.id}
                    className="rounded-3xl bg-white border border-black/[0.06] p-4 sm:p-5 flex flex-col gap-3 shadow-2xs hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 ease-out"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-100/80 flex items-center justify-center text-lg shadow-2xs shrink-0 border border-black/[0.04]">
                          {card.emoji}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-on-surface leading-snug">
                            {card.title}
                          </h3>
                          <span className="text-xs text-on-surface-variant/70 block leading-tight truncate">
                            {card.subtitle}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs ${card.badgeTone}`}
                      >
                        {card.rizzScore}
                      </span>
                    </div>

                    <p className="font-body-lg text-on-surface bg-zinc-50/80 p-3.5 rounded-2xl border border-black/[0.03] leading-relaxed text-xs sm:text-sm">
                      {card.line}
                    </p>

                    <div className="flex justify-between items-center pt-1 gap-2 border-t border-black/[0.04]">
                      <span className="text-[11px] text-outline font-medium whitespace-nowrap shrink-0">
                        {card.usageCount}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(card.id)}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-80 cursor-pointer shrink-0 ${
                            isFav
                              ? "bg-rose-50 border-rose-200 text-rose-600"
                              : "bg-white border-black/[0.08] text-on-surface-variant hover:text-rose-500"
                          }`}
                          title="Save to favorites"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] transition-transform ${
                              isFav ? "animate-heart-pop" : ""
                            }`}
                            style={{
                              fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            favorite
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(card.line, card.id)}
                          className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${
                            isCopied
                              ? "bg-zinc-900 text-white"
                              : "bg-primary text-white hover:opacity-90"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px] shrink-0">
                            {isCopied ? "check" : "content_copy"}
                          </span>
                          <span className="whitespace-nowrap">
                            {isCopied ? "Copied!" : "Copy Line"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
