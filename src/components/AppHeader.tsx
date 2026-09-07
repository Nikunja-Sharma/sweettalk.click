"use client";

import { useState } from "react";
import Link from "next/link";

interface AppHeaderProps {
  title: string;
}

export default function AppHeader({ title }: AppHeaderProps) {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <header className="fixed top-0 max-w-md w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe border-b border-outline-variant/15">
      <div className="h-16 px-4 flex items-center justify-between">
        <span className="font-headline-lg text-on-surface tracking-tight">{title}</span>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotification((prev) => !prev)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            </button>

            {showNotification && (
              <div className="absolute right-0 top-12 w-64 p-3 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xl z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <span className="font-label-sm text-on-surface font-semibold">Notifications</span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-outline hover:text-on-surface text-[12px]"
                  >
                    Close
                  </button>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                      local_fire_department
                    </span>
                    <p className="text-body-md text-xs text-on-surface leading-snug">
                      Your 14-day charm streak is active! Check today&apos;s daily drop.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs hover:opacity-90 transition-opacity"
            title="Profile"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
