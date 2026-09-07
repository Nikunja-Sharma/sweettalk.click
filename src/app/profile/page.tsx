"use client";

import { useState } from "react";
import Image from "next/image";
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
        <AppHeader title="Profile" />

        <main className="flex flex-col relative w-full px-4 pt-20 pb-28 bg-surface flex-1">
          <div className="flex flex-col w-full gap-6">
            {/* Profile Header Card */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-card p-6 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
              {/* Avatar with Verified Badge */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full p-1 bg-surface border border-outline-variant/30 shadow-sm overflow-hidden flex items-center justify-center bg-gradient-to-tr from-primary to-tertiary">
                  <div className="w-full h-full rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-3xl">
                    AR
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-surface border border-outline-variant/30 text-on-surface flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    verified
                  </span>
                </div>
              </div>

              {/* Name & Handle */}
              <h2 className="font-headline-lg text-on-surface mb-1">Alex Rivera</h2>
              <p className="font-body-md text-on-surface-variant mb-4">@alex_rizz</p>

              {/* VIP Badge */}
              <Link
                href="/pricing"
                className="bg-surface border border-outline-variant/30 text-on-surface px-4 py-2 rounded-full flex items-center gap-2 shadow-sm mb-6 hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[20px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <span className="font-label-lg font-semibold">Rizz Master VIP</span>
                <span className="material-symbols-outlined text-[16px] text-outline ml-0.5">
                  chevron_right
                </span>
              </Link>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 w-full pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handleCheckIn}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-primary font-headline-md group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                    <span>{streakCount}</span>
                  </div>
                  <span className="font-label-sm text-on-surface-variant">
                    {hasCheckedInToday ? "Checked in" : "Day Streak"}
                  </span>
                </button>

                <div className="flex flex-col items-center">
                  <span className="font-headline-md text-on-surface">128</span>
                  <span className="font-label-sm text-on-surface-variant">Lines Saved</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-headline-md text-on-surface">94%</span>
                  <span className="font-label-sm text-on-surface-variant">Charm Rate</span>
                </div>
              </div>
            </div>

            {/* VIP Membership & Billing Card */}
            <div className="bg-gradient-to-br from-primary-container to-secondary-container rounded-card p-5 text-on-primary-container shadow-lg relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-label-sm font-bold tracking-wide uppercase backdrop-blur-md text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                  VIP Member
                </span>
                <span className="text-label-sm text-white/80">Auto-renews May 2027</span>
              </div>
              <h3 className="font-headline-lg text-white mb-1">Rizz Master VIP Pass</h3>
              <p className="font-body-md text-white/90 text-sm mb-4 leading-relaxed">
                Enjoy unlimited AI chat replies, screenshot uploads, 99% charm rating, and priority generations.
              </p>
              <Link
                href="/pricing"
                className="bg-white text-primary font-label-lg px-5 py-2.5 rounded-full shadow-md hover:bg-surface active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">credit_card</span>
                <span>Manage VIP &amp; Billing</span>
              </Link>
            </div>

            {/* Favorite Topics Section */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-on-surface">Favorite Vibe Topics</h3>
                <button
                  type="button"
                  onClick={() => setIsEditingTopics(!isEditingTopics)}
                  className="text-primary font-label-lg font-semibold hover:underline cursor-pointer"
                >
                  {isEditingTopics ? "Done" : "Edit"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Flirty & Playful", icon: "bolt", primary: true },
                  { name: "Romantic", icon: "favorite", primary: true },
                  { name: "Witty Banter", icon: "psychology", primary: true },
                  { name: "Coffee Dates", icon: "local_cafe", primary: false },
                  { name: "First Text", icon: "waving_hand", primary: false },
                  { name: "Late Night", icon: "nights_stay", primary: false },
                ]
                  .filter((item) => isEditingTopics || topics.includes(item.name))
                  .map((item) => {
                    const isSelected = topics.includes(item.name);
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => isEditingTopics && toggleTopic(item.name)}
                        className={`px-4 py-2 rounded-full font-label-lg flex items-center gap-1.5 transition-all shadow-xs border ${
                          isSelected
                            ? "bg-surface border-outline-variant/30 text-on-surface"
                            : "bg-surface-container-highest border-transparent text-outline"
                        } ${isEditingTopics ? "cursor-pointer hover:border-primary" : "cursor-default"}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${
                            isSelected ? "text-primary" : "text-outline"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                        {isEditingTopics && (
                          <span className="text-xs ml-1 font-bold">
                            {isSelected ? "✕" : "+"}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Settings Options List */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-card p-3 shadow-sm flex flex-col gap-1">
              <Link
                href="/pricing"
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <span className="font-label-lg text-on-surface block font-semibold">
                      VIP Membership &amp; Billing
                    </span>
                    <span className="font-body-md text-on-surface-variant text-xs">
                      Manage subscription, invoices &amp; plans
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  chevron_right
                </span>
              </Link>
              <button
                type="button"
                onClick={() => showToast("Account settings opened")}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 text-on-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      manage_accounts
                    </span>
                  </div>
                  <div>
                    <span className="font-label-lg text-on-surface block font-semibold">
                      Account &amp; Profile
                    </span>
                    <span className="font-body-md text-on-surface-variant text-xs">
                      Personal info and preferences
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Reminders configured for 8:00 PM")}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 text-on-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      notifications
                    </span>
                  </div>
                  <div>
                    <span className="font-label-lg text-on-surface block font-semibold">
                      Daily Reminders
                    </span>
                    <span className="font-body-md text-on-surface-variant text-xs">
                      Streak alerts &amp; custom times
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => showToast("App appearance: Light Pastel (Default)")}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 text-on-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      palette
                    </span>
                  </div>
                  <div>
                    <span className="font-label-lg text-on-surface block font-semibold">
                      App Appearance
                    </span>
                    <span className="font-body-md text-on-surface-variant text-xs">
                      Light pastel theme
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Help & Support: support@sweettalk.click")}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/30 text-on-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      help
                    </span>
                  </div>
                  <div>
                    <span className="font-label-lg text-on-surface block font-semibold">
                      Help &amp; Support
                    </span>
                    <span className="font-body-md text-on-surface-variant text-xs">
                      FAQ and contact team
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Logout Button */}
            <div className="flex justify-center pb-4">
              <button
                type="button"
                onClick={() => showToast("Logged out successfully")}
                className="w-full py-3.5 px-6 rounded-full bg-surface border border-outline-variant/30 text-error font-label-lg hover:bg-surface-container transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span className="font-semibold">Log Out</span>
              </button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
