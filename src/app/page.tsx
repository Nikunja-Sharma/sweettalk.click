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
  line: string;
  usageCount: string;
  vibe: string;
}

const INITIAL_TRENDING_LINES: RizzCard[] = [
  {
    id: "card-1",
    emoji: "🔥",
    title: "The Coffee Shop Opener",
    subtitle: "Best for Instagram Replies",
    rizzScore: "98% Rizz",
    line: "I was going to say something smooth about your coffee, but I got distracted by your smile instead.",
    usageCount: "Used 4.2k times today",
    vibe: "Sweet",
  },
  {
    id: "card-2",
    emoji: "💫",
    title: "Late Night Text Back",
    subtitle: "Best for Midnight Chats",
    rizzScore: "95% Rizz",
    line: "You're the reason I check my phone with a smile at 2 AM. Sleep is overrated anyway.",
    usageCount: "Used 2.8k times today",
    vibe: "Sweet",
  },
  {
    id: "card-3",
    emoji: "🎯",
    title: "The Bold Direct Approach",
    subtitle: "High Risk, High Reward",
    rizzScore: "99% Rizz",
    line: "Let's skip the small talk. Are we getting tacos this Thursday or should I plan something more romantic?",
    usageCount: "Used 6.1k times today",
    vibe: "Bold",
  },
  {
    id: "card-4",
    emoji: "⚡",
    title: "The Playful Challenge",
    subtitle: "Great for Tinder Matches",
    rizzScore: "97% Rizz",
    line: "Are you always this charming, or did you practice on someone else before matching with me?",
    usageCount: "Used 3.9k times today",
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

const MOODS = ["Flirty", "Witty", "Sweet", "Bold"];

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string>("Flirty");
  const [selectedVibe, setSelectedVibe] = useState<string>("Sweet");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLine, setGeneratedLine] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
    showToast("Copied to clipboard!");
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = !prev[id];
      showToast(next ? "Added to Saved Lines ❤️" : "Removed from Saved");
      return { ...prev, [id]: next };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      showToast("Screenshot uploaded!");
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
    }, 650);
  };

  const filteredCards = INITIAL_TRENDING_LINES.filter((card) => {
    if (selectedVibe === "First Text") return true;
    return card.vibe.toLowerCase() === selectedVibe.toLowerCase() || selectedVibe === "Sweet";
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-start antialiased text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 z-[60] px-4 py-2 bg-on-surface text-surface rounded-full text-label-sm font-medium shadow-lg animate-bounce flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary-container">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface relative shadow-2xl md:border-x md:border-outline-variant/30">
        <AppHeader title="Home" />

        {/* Scrollable Main Area */}
        <main className="flex flex-col relative w-full px-4 pt-20 pb-28 bg-surface flex-1">
          <div className="flex flex-col w-full gap-6">
            {/* Hero Banner / Chat Screenshot Upload Card */}
            <div className="relative w-full rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 flex flex-col justify-between overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                  SweetTalk AI
                </span>
              </div>

              <h1 className="font-headline-lg text-on-surface mb-2 leading-tight">
                Never Get Left on Read! Upload Chat &amp; Generate
              </h1>
              <p className="font-body-md text-on-surface-variant mb-4">
                Upload a screenshot of your chat to instantly generate irresistible AI replies.
              </p>

              {/* Upload Dropzone */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedImage ? (
                <div className="relative rounded-xl overflow-hidden border border-outline-variant/40 bg-surface-container-low mb-4 group">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded chat preview"
                    width={400}
                    height={200}
                    className="w-full max-h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-full bg-surface text-on-surface text-label-sm font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">change_circle</span>
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="px-3 py-1.5 rounded-full bg-error text-on-error text-label-sm font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Remove
                    </button>
                  </div>
                  <div className="p-2.5 bg-surface-container-low text-label-sm text-on-surface flex items-center justify-between">
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Screenshot ready for AI
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="text-outline hover:text-error text-[12px]"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
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
                  className="border-2 border-dashed border-outline-variant/40 rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-surface-container-low mb-4 cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-lg text-on-surface">Tap to upload chat screenshot</p>
                    <p className="text-label-sm text-outline">or drag and drop images here</p>
                  </div>
                </div>
              )}

              {/* Select AI Mood */}
              <div className="mb-4 flex flex-col gap-1.5">
                <label className="text-label-sm text-on-surface-variant font-medium">
                  Select AI Mood
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {MOODS.map((mood) => {
                    const isSelected = selectedMood === mood;
                    return (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => setSelectedMood(mood)}
                        className={`px-3.5 py-1.5 rounded-full text-label-sm font-medium flex items-center gap-1 transition-all duration-200 cursor-pointer active:scale-90 ${isSelected
                            ? "bg-primary text-on-primary font-bold shadow-xs scale-105"
                            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                          }`}
                      >
                        {mood}
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
                className="w-full bg-primary hover:bg-surface-tint text-on-primary rounded-full py-3.5 font-label-lg flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-75"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <span>Generate AI Reply</span>
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </>
                )}
              </button>
            </div>

            {/* Category Pills (Vibe Check) */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-headline-md text-on-surface">Vibe Check</h2>
                <Link
                  href="/categories"
                  className="text-label-sm text-primary cursor-pointer hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
                {VIBE_CATEGORIES.map((cat) => {
                  const isActive = selectedVibe === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedVibe(cat.name)}
                      className={`px-4 py-2 rounded-full text-label-lg flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 active:scale-90 cursor-pointer ${isActive
                          ? "bg-primary-container text-on-primary-container font-semibold shadow-xs scale-105"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
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
                className="rounded-2xl bg-surface-container-lowest border-2 border-primary/40 p-5 flex flex-col gap-3 shadow-md ring-4 ring-primary/10 transition-all duration-300 ease-out animate-fade-in-up"
              >
                <div className="flex justify-between items-center">
                  <span className="text-label-sm text-on-surface font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-primary animate-spin" style={{ animationDuration: '3s' }}>
                      auto_awesome
                    </span>{" "}
                    Fresh AI Creation ({selectedMood})
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm border border-outline-variant/20 font-bold shadow-2xs">
                    99% Rizz
                  </span>
                </div>
                <p className="font-body-lg text-on-surface bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 leading-relaxed text-[15px]">
                  {generatedLine ||
                    `"Are you Wi-Fi? Because I'm feeling a serious connection, and honestly I don't even need a password to love it."`}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        generatedLine ||
                        `"Are you Wi-Fi? Because I'm feeling a serious connection, and honestly I don't even need a password to love it."`,
                        "ai-output"
                      )
                    }
                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full border border-outline-variant/30 text-label-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${copiedId === "ai-output"
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                      }`}
                  >
                    <span className={`material-symbols-outlined text-[15px] ${copiedId === "ai-output" ? "scale-110" : ""}`}>
                      {copiedId === "ai-output" ? "check" : "content_copy"}
                    </span>
                    <span className="font-medium">{copiedId === "ai-output" ? "Copied!" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite("ai-output")}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-label-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${favorites["ai-output"]
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-low border border-outline-variant/30 text-on-surface hover:bg-surface-container"
                      }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[15px] ${favorites["ai-output"] ? "animate-heart-pop" : ""}`}
                      style={{
                        fontVariationSettings: favorites["ai-output"]
                          ? "'FILL' 1"
                          : "'FILL' 0",
                      }}
                    >
                      favorite
                    </span>
                    <span className="font-medium">{favorites["ai-output"] ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Recommended Pickup Lines & AI Cards */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-headline-md text-on-surface">Trending Rizz Lines</h2>
                <span className="text-label-sm text-outline">Updated hourly</span>
              </div>

              {filteredCards.map((card) => {
                const isFav = !!favorites[card.id];
                const isCopied = copiedId === card.id;

                return (
                  <div
                    key={card.id}
                    className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-4 sm:p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface font-bold text-base border border-outline-variant/20 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                          {card.emoji}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-label-lg text-on-surface font-semibold leading-snug">
                            {card.title}
                          </h3>
                          <span className="text-label-sm text-outline text-xs block leading-tight">{card.subtitle}</span>
                        </div>
                      </div>
                      <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-label-sm font-bold border border-outline-variant/20 shadow-2xs">
                        {card.rizzScore}
                      </span>
                    </div>

                    <p className="font-body-lg text-on-surface bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 leading-relaxed text-sm sm:text-base">
                      {card.line}
                    </p>

                    <div className="flex justify-between items-center pt-1 gap-2">
                      <span className="text-xs sm:text-label-sm text-outline whitespace-nowrap shrink-0">{card.usageCount}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(card.id)}
                          className={`w-9 h-9 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center transition-all duration-200 active:scale-80 cursor-pointer shrink-0 ${isFav ? "text-primary border-primary/30" : "text-on-surface-variant hover:text-primary"
                            }`}
                          title="Save to favorites"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] transition-transform ${isFav ? "animate-heart-pop" : ""}`}
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
                          className={`shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-label-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${isCopied
                              ? "bg-secondary text-on-secondary"
                              : "bg-primary text-on-primary hover:bg-surface-tint"
                            }`}
                        >
                          <span className={`material-symbols-outlined text-[16px] shrink-0 ${isCopied ? "scale-110" : ""}`}>
                            {isCopied ? "check" : "content_copy"}
                          </span>
                          <span className="whitespace-nowrap font-medium">{isCopied ? "Copied!" : "Copy Line"}</span>
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
