"use client";

import { useState } from "react";
import Link from "next/link";

interface AppHeaderProps {
  title: string;
}

export default function AppHeader({ title }: AppHeaderProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  return (
    <header className="fixed top-0 max-w-md w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe border-b border-black/[0.04]">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Brand / Title */}
        <div className="flex items-center gap-2">
          {title === "Home" ? (
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-headline-lg font-bold tracking-tight text-on-surface">
                  SweetTalk
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              </div>
            </div>
          ) : (
            <h1 className="font-headline-lg font-bold text-on-surface tracking-tight">
              {title}
            </h1>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Streak Pill */}
          <button
            type="button"
            onClick={() => setShowStreakModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-all active:scale-95 cursor-pointer text-xs font-semibold text-on-surface border border-outline-variant/30 shadow-2xs"
            title="14 Day Charm Streak"
          >
            <span
              className="material-symbols-outlined text-[15px] text-amber-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span>14</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotification((prev) => !prev)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all active:scale-95 cursor-pointer relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            </button>

            {showNotification && (
              <div className="absolute right-0 top-11 w-64 p-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xl z-50 animate-scale-in">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <span className="font-label-sm text-on-surface font-semibold">Activity</span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-outline hover:text-on-surface text-[12px]"
                  >
                    Close
                  </button>
                </div>
                <div className="pt-2.5 flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    </div>
                    <p className="text-body-md text-xs text-on-surface leading-snug">
                      Your 14-day charm streak is active! 5 new lines dropped today.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-primary to-tertiary shadow-xs hover:opacity-90 active:scale-95 transition-all block"
            title="Profile"
          >
            <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-bold text-[12px]">
              AR
            </div>
          </Link>
        </div>
      </div>

      {/* Streak Modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-surface-container-lowest rounded-3xl p-5 shadow-2xl flex flex-col items-center text-center gap-3 animate-scale-in border border-outline-variant/30">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm">
              <span
                className="material-symbols-outlined text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <h3 className="font-headline-md text-on-surface">14-Day Streak!</h3>
            <p className="text-body-md text-xs text-on-surface-variant leading-relaxed">
              You&apos;ve crafted charm every day for two weeks straight. Keep the momentum going!
            </p>
            <button
              type="button"
              onClick={() => setShowStreakModal(false)}
              className="w-full mt-2 py-2.5 rounded-full bg-primary text-on-primary font-label-lg shadow-sm hover:bg-surface-tint active:scale-95 transition-all cursor-pointer"
            >
              Awesome
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
