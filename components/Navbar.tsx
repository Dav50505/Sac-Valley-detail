"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navigateWithHeroAwareness } from "@/lib/scroll-navigation";
import {
  addBodyScrollLockOwner,
  MOBILE_MENU_SCROLL_LOCK_OWNER,
  removeBodyScrollLockOwner,
} from "@/lib/scroll-lock";
import { logoPath } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > Math.max(window.innerHeight * 0.45, 120));
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    window.addEventListener("resize", updateScrolledState);

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
      window.removeEventListener("resize", updateScrolledState);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      addBodyScrollLockOwner(MOBILE_MENU_SCROLL_LOCK_OWNER);
    } else {
      removeBodyScrollLockOwner(MOBILE_MENU_SCROLL_LOCK_OWNER);
    }

    return () => {
      if (isMenuOpen) {
        removeBodyScrollLockOwner(MOBILE_MENU_SCROLL_LOCK_OWNER);
      }
    };
  }, [isMenuOpen]);

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    navigateWithHeroAwareness(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-[rgba(10,10,10,0.86)] shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 md:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => handleNavigate("#hero")}
            className="group flex min-w-0 items-center gap-2.5 pr-2 text-left sm:gap-3"
            aria-label="Scroll to top"
          >
            <Image
              src={logoPath}
              alt=""
              width={48}
              height={48}
              priority
              className="h-10 w-10 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
            />
            <div className="min-w-0">
              <span className="block truncate font-[family:var(--font-heading)] text-[1.35rem] uppercase leading-none tracking-[0.1em] text-white min-[360px]:text-[1.5rem] sm:text-[1.9rem] sm:tracking-[0.16em]">
                SVD
              </span>
              <span className="mt-1 block truncate text-[0.52rem] uppercase tracking-[0.24em] text-white/50 min-[360px]:text-[0.56rem] sm:text-[0.62rem] sm:tracking-[0.38em]">
                Sacramento Valley Mobile Detailing
              </span>
            </div>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigate(item.href)}
                className="text-[0.76rem] uppercase tracking-[0.32em] text-white/68 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="shrink-0 flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleNavigate("#contact")}
              className="hidden rounded-full bg-[var(--color-accent)] px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-black transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-colors duration-200 hover:border-[rgba(255,107,0,0.4)] hover:bg-white/10 lg:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    isMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[rgba(3,3,3,0.7)] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-navigation"
        className={`fixed inset-x-3 top-[5.25rem] bottom-3 z-50 overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(6,6,6,0.98))] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.48)] transition-all duration-300 sm:inset-x-4 sm:top-24 sm:bottom-4 sm:max-h-[calc(100svh-7rem)] sm:rounded-[2rem] sm:p-6 lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="space-y-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavigate(item.href)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left text-[0.78rem] uppercase tracking-[0.22em] text-white/78 transition-colors duration-200 hover:border-[rgba(255,107,0,0.28)] hover:text-white sm:text-sm sm:tracking-[0.28em]"
            >
              <span className="min-w-0 flex-1">{item.label}</span>
              <span className="shrink-0 text-[var(--color-accent)]">/</span>
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => handleNavigate("#contact")}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-4 text-[0.74rem] font-medium uppercase tracking-[0.22em] text-black sm:text-[0.78rem] sm:tracking-[0.26em]"
        >
          Book Now
        </button>
      </div>
    </>
  );
}
