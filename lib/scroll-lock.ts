export const HERO_SCROLL_LOCK_OWNER = "hero";
export const MOBILE_MENU_SCROLL_LOCK_OWNER = "mobile-menu";

const BODY_SCROLL_LOCK_OWNERS_ATTRIBUTE = "data-scroll-lock-owners";
const BODY_SCROLL_LOCK_PREVIOUS_OVERFLOW_ATTRIBUTE =
  "data-scroll-lock-previous-overflow";

function getLockOwners(body: HTMLElement) {
  const owners = body.getAttribute(BODY_SCROLL_LOCK_OWNERS_ATTRIBUTE);

  if (!owners) {
    return [];
  }

  return owners
    .split(",")
    .map((owner) => owner.trim())
    .filter(Boolean);
}

function setLockOwners(body: HTMLElement, owners: string[]) {
  if (owners.length === 0) {
    body.removeAttribute(BODY_SCROLL_LOCK_OWNERS_ATTRIBUTE);
    return;
  }

  body.setAttribute(BODY_SCROLL_LOCK_OWNERS_ATTRIBUTE, owners.join(","));
}

export function hasBodyScrollLockOwner(owner: string) {
  if (typeof document === "undefined") {
    return false;
  }

  return getLockOwners(document.body).includes(owner);
}

export function addBodyScrollLockOwner(owner: string) {
  if (typeof document === "undefined") {
    return;
  }

  const { body } = document;
  const owners = new Set(getLockOwners(body));

  if (owners.has(owner)) {
    return;
  }

  if (owners.size === 0) {
    body.setAttribute(
      BODY_SCROLL_LOCK_PREVIOUS_OVERFLOW_ATTRIBUTE,
      body.style.overflow,
    );
    body.style.overflow = "hidden";
  }

  owners.add(owner);
  setLockOwners(body, [...owners]);
}

export function removeBodyScrollLockOwner(owner: string) {
  if (typeof document === "undefined") {
    return;
  }

  const { body } = document;
  const owners = new Set(getLockOwners(body));

  if (!owners.delete(owner)) {
    return;
  }

  if (owners.size === 0) {
    body.style.overflow =
      body.getAttribute(BODY_SCROLL_LOCK_PREVIOUS_OVERFLOW_ATTRIBUTE) ?? "";
    body.removeAttribute(BODY_SCROLL_LOCK_PREVIOUS_OVERFLOW_ATTRIBUTE);
    setLockOwners(body, []);
    return;
  }

  setLockOwners(body, [...owners]);
}
