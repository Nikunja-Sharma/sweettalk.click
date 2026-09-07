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
    <nav className="fixed bottom-0 max-w-md w-full z-50 pb-safe pointer-events-none">
      <div className="mx-4 mb-3 pointer-events-auto">
        <div className="glass-nav rounded-full px-3 py-2 flex justify-around items-center h-[68px] shadow-lg shadow-black/5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-center transition-all duration-300 ease-out cursor-pointer select-none ${
                  isActive
                    ? "w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white shadow-md shadow-primary/25 scale-105"
                    : "flex-col gap-0.5 w-14 h-12 text-on-surface-variant/80 hover:text-on-surface active:scale-90"
                }`}
                title={item.name}
              >
                <span
                  className={`material-symbols-outlined transition-transform duration-300 ${
                    isActive ? "text-[22px] scale-105" : "text-[21px]"
                  }`}
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {!isActive && (
                  <span className="text-[10.5px] font-medium tracking-tight">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
