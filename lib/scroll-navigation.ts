export function isHeroSequenceLocked() {
  if (typeof document === "undefined") {
    return false;
  }

  const hero = document.querySelector("#hero");

  if (!(hero instanceof HTMLElement)) {
    return false;
  }

  return hero.dataset.heroLock === "true";
}

export const HERO_NAVIGATION_EVENT = "hero:navigate";

type HeroNavigationDetail = {
  href: string;
};

export function findScrollTarget(href: string) {
  const element = document.querySelector(href);

  if (!(element instanceof HTMLElement)) {
    return null;
  }

  return element;
}

export function scrollToTarget(href: string) {
  const element = findScrollTarget(href);

  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function navigateWithHeroAwareness(href: string) {
  if (typeof window !== "undefined" && href !== "#hero" && isHeroSequenceLocked()) {
    window.dispatchEvent(
      new CustomEvent<HeroNavigationDetail>(HERO_NAVIGATION_EVENT, {
        detail: { href },
      }),
    );
    return;
  }

  scrollToTarget(href);
}
