"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  const [topics, setTopics] = useState<string[]>([
    "Flirty & Playful",
    "Romantic",
    "Witty Banter",
    "Coffee Dates",
  ]);
  const [isEditingTopics, setIsEditingTopics] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [streakCount, setStreakCount] = useState(14);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleCheckIn = () => {
    if (!hasCheckedInToday) {
      setStreakCount((prev) => prev + 1);
      setHasCheckedInToday(true);
      showToast("🔥 Streak extended to " + (streakCount + 1) + " days!");
    } else {
      showToast("Already checked in today!");
    }
  };

  const toggleTopic = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics((prev) => prev.filter((t) => t !== topic));
    } else {
      setTopics((prev) => [...prev, topic]);
    }
  };

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
        <AppHeader title="Profile" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-32 bg-surface flex-1">
          <div className="flex flex-col w-full gap-5">
            {/* Profile Header Card */}
            <div className="bg-white border border-black/[0.06] rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-soft">
              {/* Avatar with Verified Badge */}
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary via-purple-500 to-rose-400 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-primary font-bold text-2xl">
                    AR
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border border-black/[0.08] text-primary flex items-center justify-center shadow-2xs">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
              </div>

              {/* Name & Handle */}
              <h2 className="font-headline-lg text-on-surface text-xl mb-0.5 font-bold">
                Alex Rivera
              </h2>
              <p className="text-xs text-on-surface-variant/70 mb-3">@alex_rizz</p>

              {/* VIP Badge */}
              <Link
                href="/pricing"
                className="bg-primary/10 hover:bg-primary/15 border border-primary/20 text-primary px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs mb-5 transition-colors cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[17px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <span className="text-xs font-bold tracking-tight">Rizz Master VIP</span>
                <span className="material-symbols-outlined text-[14px] opacity-70">
                  chevron_right
                </span>
              </Link>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-black/[0.05]">
                <button
                  type="button"
                  onClick={handleCheckIn}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-amber-500 font-headline-md group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                    <span className="font-bold text-base text-zinc-900">{streakCount}</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant/70 mt-0.5">
                    {hasCheckedInToday ? "Checked in" : "Day Streak"}
                  </span>
                </button>

                <div className="flex flex-col items-center">
                  <span className="font-bold text-base text-zinc-900">128</span>
                  <span className="text-[11px] text-on-surface-variant/70 mt-0.5">Lines Saved</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-bold text-base text-zinc-900">94%</span>
                  <span className="text-[11px] text-on-surface-variant/70 mt-0.5">Charm Rate</span>
                </div>
              </div>
            </div>

            {/* VIP Membership Card */}
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-indigo-950 rounded-3xl p-5 text-white shadow-soft relative overflow-hidden border border-white/10">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex justify-between items-start mb-3">
                <span className="bg-white/15 px-3 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide uppercase backdrop-blur-md text-amber-300 flex items-center gap-1 border border-white/10">
                  <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                  VIP Member
                </span>
                <span className="text-[11px] text-white/60">Renews May 2027</span>
              </div>

              <h3 className="font-headline-lg text-white mb-1 text-lg font-bold">
                Rizz Master VIP Pass
              </h3>
              <p className="text-white/80 text-xs mb-4 leading-relaxed">
                Unlimited AI replies, custom screenshot analysis, tone controls, and 0 ads.
              </p>

              <Link
                href="/pricing"
                className="bg-white text-zinc-950 font-semibold text-xs px-4 py-2 rounded-full shadow-md hover:bg-zinc-100 active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">credit_card</span>
                <span>Manage VIP &amp; Billing</span>
              </Link>
            </div>

            {/* Favorite Topics Section */}
            <div className="bg-white border border-black/[0.06] rounded-3xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-headline-md text-on-surface text-sm font-bold">
                  Favorite Vibe Topics
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingTopics(!isEditingTopics)}
                  className="text-primary text-xs font-semibold hover:underline cursor-pointer"
                >
                  {isEditingTopics ? "Done" : "Edit"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Flirty & Playful", icon: "bolt" },
                  { name: "Romantic", icon: "favorite" },
                  { name: "Witty Banter", icon: "psychology" },
                  { name: "Coffee Dates", icon: "local_cafe" },
                  { name: "First Text", icon: "waving_hand" },
                  { name: "Late Night", icon: "nights_stay" },
                ]
                  .filter((item) => isEditingTopics || topics.includes(item.name))
                  .map((item) => {
                    const isSelected = topics.includes(item.name);
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => isEditingTopics && toggleTopic(item.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                          isSelected
                            ? "bg-zinc-50 border-black/[0.08] text-zinc-900 shadow-2xs"
                            : "bg-zinc-100/70 border-transparent text-outline"
                        } ${isEditingTopics ? "cursor-pointer hover:border-primary" : "cursor-default"}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[15px] ${
                            isSelected ? "text-primary" : "text-outline"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                        {isEditingTopics && (
                          <span className="text-[10px] ml-0.5 font-bold">
                            {isSelected ? "✕" : "+"}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Apple-style Grouped Settings List */}
            <div className="bg-white border border-black/[0.06] rounded-3xl shadow-2xs divide-y divide-black/[0.04] overflow-hidden">
              <Link
                href="/pricing"
                className="w-full flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-on-surface block">
                      VIP Membership &amp; Billing
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      Manage subscription, invoices &amp; plans
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </Link>

              <button
                type="button"
                onClick={() => showToast("Account settings opened")}
                className="w-full flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-on-surface block">
                      Account &amp; Profile
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      Personal info and preferences
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Reminders configured for 8:00 PM")}
                className="w-full flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">notifications</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-on-surface block">
                      Daily Reminders
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      Streak alerts &amp; custom notification times
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Help: support@sweettalk.click")}
                className="w-full flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">help</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-on-surface block">
                      Help &amp; Support
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      FAQ, feedback and contact team
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Logout Button */}
            <div className="flex justify-center pb-2">
              <button
                type="button"
                onClick={() => showToast("Logged out")}
                className="w-full py-3 px-6 rounded-full bg-white border border-black/[0.08] text-red-600 text-xs font-bold hover:bg-red-50/50 transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
