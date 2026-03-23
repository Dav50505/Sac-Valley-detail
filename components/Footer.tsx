"use client";

import Image from "next/image";
import { navigateWithHeroAwareness } from "@/lib/scroll-navigation";
import { logoPath } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[linear-gradient(180deg,#050505_0%,#080808_38%,#040404_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.78),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:gap-8 lg:py-16">
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => navigateWithHeroAwareness("#hero")}
              className="group flex items-center gap-3 text-left"
              aria-label="Scroll to top"
            >
              <Image
                src={logoPath}
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <span className="block truncate font-[family:var(--font-heading)] text-[1.8rem] uppercase leading-none tracking-[0.08em] text-white min-[360px]:text-[2.1rem] sm:text-[2.2rem] sm:tracking-[0.14em]">
                  Sac Valley Detail
                </span>
                <span className="mt-1 block truncate text-[0.55rem] uppercase tracking-[0.2em] text-white/48 min-[360px]:text-[0.65rem] sm:tracking-[0.34em]">
                  Sacramento Valley Mobile Detailing
                </span>
              </div>
            </button>

            <p className="max-w-md text-sm leading-7 text-white/62 sm:text-base">
              Premium mobile detailing, correction, coatings, tint, wraps, and
              specialty upgrades built for Sacramento Valley drivers who want a
              sharper finish without the shop drop-off.
            </p>
          </div>

          <div className="space-y-5">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
              Navigate
            </p>
            <nav className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:max-w-sm">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigateWithHeroAwareness(item.href)}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-left text-[0.68rem] uppercase tracking-[0.18em] text-white/68 transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,107,0,0.28)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,107,0,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] min-[360px]:text-[0.72rem] min-[360px]:tracking-[0.26em]"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-5">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
              Contact
            </p>

            <div className="space-y-4">
              <a
                href="tel:+19167490339"
                aria-label="Call Sac Valley Detail"
                className="group flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(8,8,8,0.96))] px-4 py-4 text-white/76 transition-[border-color,transform,color] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,107,0,0.28)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,107,0,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <span>
                  <span className="block text-[0.62rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
                    Phone
                  </span>
                  <span className="mt-2 block font-[family:var(--font-heading)] text-[1.6rem] uppercase leading-none tracking-[0.03em] text-white min-[360px]:text-[1.9rem] min-[360px]:tracking-[0.04em]">
                    (916) 749-0339
                  </span>
                </span>
                <span className="text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              {/* TODO: Replace placeholder href with Sac Valley Detail's real Facebook profile URL. */}
              <a
                href="#"
                aria-label="Visit Sac Valley Detail on Facebook"
                className="inline-flex items-center gap-3 rounded-full border border-[rgba(255,107,0,0.22)] bg-[rgba(255,107,0,0.08)] px-4 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-white/78 transition-[border-color,transform,color] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,107,0,0.45)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,107,0,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-[var(--color-accent)]"
                >
                  <path d="M13.5 21v-7h2.35l.4-2.75H13.5V9.5c0-.8.27-1.5 1.68-1.5H16.4V5.62c-.21-.03-.95-.12-2.05-.12-2.03 0-3.42 1.24-3.42 3.52v2.23H8.6V14h2.33v7h2.57Z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 py-5 text-center text-[0.7rem] uppercase tracking-[0.28em] text-white/42 sm:py-6">
          © 2025 Sac Valley Detail. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
