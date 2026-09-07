"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: "favorite" },
  { name: "Categories", href: "/categories", icon: "grid_view" },
  { name: "Saved", href: "/saved", icon: "bookmark" },
  { name: "Profile", href: "/profile", icon: "person" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 max-w-md w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20">
      <div className="flex justify-around items-center h-20 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center transition-all duration-300 ease-out cursor-pointer active:scale-90 select-none ${
                isActive
                  ? "w-14 h-14 rounded-full bg-primary-container text-on-primary-container shadow-md scale-105"
                  : "flex-col gap-1 w-16 h-16 text-on-surface-variant hover:text-on-surface hover:scale-105"
              }`}
              title={item.name}
            >
              <span
                className={`material-symbols-outlined text-[24px] transition-transform duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {!isActive && (
                <span className="text-label-sm text-[11px] transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
