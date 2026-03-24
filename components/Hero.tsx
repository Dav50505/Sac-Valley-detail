"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  findScrollTarget,
  HERO_NAVIGATION_EVENT,
} from "@/lib/scroll-navigation";
import HeroCanvas from "./HeroCanvas";

const TOTAL_FRAMES = 140;
const FRAME_EXTENSION = "png";
const FRAME_PAD_LENGTH = 4;
const FRAME_PREFIX = "frame_";
const FRAME_DIRECTORY = "/frames";
const PRIORITY_FRAME_COUNT = 12;
const PRELOAD_FRAME_COUNT = 10;
const SCROLL_PIXELS_PER_FRAME = 30;
const LAST_FRAME_INDEX = TOTAL_FRAMES - 1;
const SEQUENCE_SCROLL_DISTANCE = LAST_FRAME_INDEX * SCROLL_PIXELS_PER_FRAME;
const INITIAL_LOCK_SCROLL_THRESHOLD = 24;
const TOUCH_SCROLL_MULTIPLIER = 1.2;
const WHEEL_SCROLL_MULTIPLIER = 28;
const KEYBOARD_SCROLL_STEP = SCROLL_PIXELS_PER_FRAME;
const KEYBOARD_PAGE_SCROLL_STEP = SCROLL_PIXELS_PER_FRAME * 4;
const COMPLETION_SCROLL_TOLERANCE = 2;

const formatFrameNumber = (index: number) =>
  String(index + 1).padStart(FRAME_PAD_LENGTH, "0");

const framePath = (index: number) =>
  `${FRAME_DIRECTORY}/${FRAME_PREFIX}${formatFrameNumber(index)}.${FRAME_EXTENSION}`;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTrackMetrics(track: HTMLElement | null) {
  if (!track || typeof window === "undefined") {
    return null;
  }

  const start = track.offsetTop;
  const end = start + track.offsetHeight - window.innerHeight;
  const distance = Math.max(end - start, 1);

  return { start, end, distance };
}

function progressFromScrollTop(scrollTop: number, track: HTMLElement | null) {
  const metrics = getTrackMetrics(track);

  if (!metrics) {
    return 0;
  }

  return clamp((scrollTop - metrics.start) / metrics.distance, 0, 1);
}

function scrollTopFromProgress(progress: number, track: HTMLElement | null) {
  const metrics = getTrackMetrics(track);

  if (!metrics) {
    return 0;
  }

  return metrics.start + clamp(progress, 0, 1) * metrics.distance;
}

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT" ||
    tagName === "BUTTON"
  );
}

function findNearestLoadedFrame(
  frames: Array<HTMLImageElement | null>,
  index: number,
) {
  if (frames[index]) {
    return frames[index];
  }

  for (let distance = 1; distance < frames.length; distance += 1) {
    const lower = index - distance;
    const upper = index + distance;

    if (lower >= 0 && frames[lower]) {
      return frames[lower];
    }

    if (upper < frames.length && frames[upper]) {
      return frames[upper];
    }
  }

  return null;
}

function drawContainedImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | null,
) {
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const { width, height } = canvas;
  context.clearRect(0, 0, width, height);

  if (!image) {
    const fallback = context.createLinearGradient(0, 0, 0, height);
    fallback.addColorStop(0, "#141414");
    fallback.addColorStop(1, "#050505");
    context.fillStyle = fallback;
    context.fillRect(0, 0, width, height);
    return;
  }

  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export default function Hero() {
  const trackRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>(
    Array.from({ length: TOTAL_FRAMES }, () => null),
  );
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const progressRef = useRef(0);
  const loadedPriorityFramesRef = useRef<Set<number>>(new Set());
  const lockedScrollPixelsRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const bodyLockedByHeroRef = useRef(false);
  const sequenceUnlockedRef = useRef(false);
  const completionHandledRef = useRef(false);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [progress, setProgress] = useState(0);
  const [readyCount, setReadyCount] = useState(0);
  const [hasSequenceCompleted, setHasSequenceCompleted] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(false);
  const [isBodyLockedByHero, setIsBodyLockedByHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    let mounted = true;

    const sizeCanvas = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const ratio = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const image = findNearestLoadedFrame(imagesRef.current, index);
      drawContainedImage(canvas, image);
    };

    const readProgressFromScroll = () =>
      progressFromScrollTop(window.scrollY, trackRef.current);

    const syncWindowScrollToProgress = (nextProgress: number) => {
      const nextScrollTop = scrollTopFromProgress(nextProgress, trackRef.current);

      if (Math.abs(window.scrollY - nextScrollTop) <= 1) {
        return;
      }

      window.scrollTo({ top: Math.max(nextScrollTop, 0), behavior: "auto" });
    };

    const setHeroLockState = (locked: boolean) => {
      bodyLockedByHeroRef.current = locked;
      setIsBodyLockedByHero(locked);
      setIsHeroActive(locked && !sequenceUnlockedRef.current);
    };

    const releaseHeroLock = () => {
      if (!bodyLockedByHeroRef.current) {
        setIsHeroActive(false);
        return;
      }

      setHeroLockState(false);
    };

    const finalizeSequence = () => {
      if (completionHandledRef.current || sequenceUnlockedRef.current) {
        return;
      }

      completionHandledRef.current = true;
      const endScrollTop = scrollTopFromProgress(1, trackRef.current);

      sequenceUnlockedRef.current = true;

      if (Math.abs(window.scrollY - endScrollTop) > COMPLETION_SCROLL_TOLERANCE) {
        window.scrollTo({ top: Math.max(endScrollTop, 0), behavior: "auto" });
      }

      releaseHeroLock();
    };

    const updateSequenceDisplay = (nextProgress: number) => {
      const clampedProgress = clamp(nextProgress, 0, 1);
      lockedScrollPixelsRef.current = clampedProgress * SEQUENCE_SCROLL_DISTANCE;
      const nextFrame = Math.min(
        LAST_FRAME_INDEX,
        Math.floor(clampedProgress * LAST_FRAME_INDEX),
      );

      drawFrame(nextFrame);

      if (currentFrameRef.current !== nextFrame) {
        currentFrameRef.current = nextFrame;
        setCurrentFrame(nextFrame);
      }

      if (progressRef.current !== clampedProgress) {
        progressRef.current = clampedProgress;
        setProgress(clampedProgress);
      }

      const completed = clampedProgress >= 0.999;
      setHasSequenceCompleted(completed);

      if (completed) {
        finalizeSequence();
      }
    };

    const syncFrameFromCurrentSource = () => {
      updateSequenceDisplay(readProgressFromScroll());
      rafRef.current = null;
    };

    const scheduleSync = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(syncFrameFromCurrentSource);
    };

    const handleViewportChange = () => {
      sizeCanvas();

      if (bodyLockedByHeroRef.current && !sequenceUnlockedRef.current) {
        syncWindowScrollToProgress(progressRef.current);
      }

      updateSequenceDisplay(readProgressFromScroll());
    };

    const applyHeroLock = () => {
      if (sequenceUnlockedRef.current || bodyLockedByHeroRef.current) {
        return;
      }

      setHeroLockState(true);
    };

    const advanceLockedSequence = (deltaPixels: number) => {
      if (!bodyLockedByHeroRef.current || sequenceUnlockedRef.current) {
        return;
      }

      const nextPixels = clamp(
        lockedScrollPixelsRef.current + deltaPixels,
        0,
        SEQUENCE_SCROLL_DISTANCE,
      );

      if (nextPixels === lockedScrollPixelsRef.current) {
        return;
      }

      const nextProgress = nextPixels / SEQUENCE_SCROLL_DISTANCE;
      syncWindowScrollToProgress(nextProgress);
      updateSequenceDisplay(nextProgress);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!bodyLockedByHeroRef.current || sequenceUnlockedRef.current) {
        return;
      }

      event.preventDefault();
      advanceLockedSequence(event.deltaY * WHEEL_SCROLL_MULTIPLIER);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!bodyLockedByHeroRef.current || event.touches.length === 0) {
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (
        !bodyLockedByHeroRef.current ||
        sequenceUnlockedRef.current ||
        event.touches.length === 0
      ) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (currentY === undefined) {
        return;
      }

      const previousY = touchStartYRef.current ?? currentY;
      const deltaPixels = (previousY - currentY) * TOUCH_SCROLL_MULTIPLIER;

      touchStartYRef.current = currentY;

      if (deltaPixels === 0) {
        return;
      }

      event.preventDefault();
      advanceLockedSequence(deltaPixels);
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !bodyLockedByHeroRef.current ||
        sequenceUnlockedRef.current ||
        isInteractiveElement(event.target)
      ) {
        return;
      }

      let deltaPixels = 0;

      switch (event.key) {
        case "ArrowDown":
          deltaPixels = KEYBOARD_SCROLL_STEP;
          break;
        case "ArrowUp":
          deltaPixels = -KEYBOARD_SCROLL_STEP;
          break;
        case "PageDown":
          deltaPixels = KEYBOARD_PAGE_SCROLL_STEP;
          break;
        case "PageUp":
          deltaPixels = -KEYBOARD_PAGE_SCROLL_STEP;
          break;
        case " ":
          deltaPixels = event.shiftKey
            ? -KEYBOARD_PAGE_SCROLL_STEP
            : KEYBOARD_PAGE_SCROLL_STEP;
          break;
        default:
          return;
      }

      event.preventDefault();
      advanceLockedSequence(deltaPixels);
    };

    const handleHeroNavigation = (event: Event) => {
      const navigationEvent = event as CustomEvent<{ href?: string }>;
      const href = navigationEvent.detail?.href;

      if (!href) {
        return;
      }

      const target = findScrollTarget(href);

      if (!target) {
        return;
      }

      sequenceUnlockedRef.current = true;
      releaseHeroLock();
      touchStartYRef.current = null;

      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    sizeCanvas();

    for (let index = 0; index < TOTAL_FRAMES; index += 1) {
      const image = new Image();
      const src = framePath(index);

      image.decoding = index < PRELOAD_FRAME_COUNT ? "sync" : "async";
      image.fetchPriority = index < 2 ? "high" : "low";
      image.src = src;
      image.onload = () => {
        if (!mounted) {
          return;
        }

        imagesRef.current[index] = image;

        if (
          index < PRIORITY_FRAME_COUNT &&
          !loadedPriorityFramesRef.current.has(index)
        ) {
          loadedPriorityFramesRef.current.add(index);
          setReadyCount(loadedPriorityFramesRef.current.size);
        }

        // Only update display if not on mobile, since mobile doesn't use the canvas sequence
        if (window.innerWidth >= 768 && (index === 0 || index === currentFrameRef.current)) {
          updateSequenceDisplay(progressRef.current);
        }
      };
      image.onerror = () => {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Hero frame failed to load: ${src}`);
        }
      };
    }

    const initialScrollY = window.scrollY;

    // Skip sequence lock and behavior on mobile
    if (window.innerWidth < 768) {
      sequenceUnlockedRef.current = true;
      completionHandledRef.current = true;
    } else {
      if (initialScrollY <= INITIAL_LOCK_SCROLL_THRESHOLD) {
        updateSequenceDisplay(0);
        syncWindowScrollToProgress(0);
        applyHeroLock();
      } else {
        sequenceUnlockedRef.current = true;
        completionHandledRef.current = true;
        updateSequenceDisplay(progressFromScrollTop(initialScrollY, trackRef.current));
      }
    }

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(
      HERO_NAVIGATION_EVENT,
      handleHeroNavigation as EventListener,
    );

    return () => {
      mounted = false;
      touchStartYRef.current = null;

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      releaseHeroLock();
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        HERO_NAVIGATION_EVENT,
        handleHeroNavigation as EventListener,
      );
    };
  }, []);

  const isSequenceReady = readyCount >= PRIORITY_FRAME_COUNT;
  const loadingProgress = Math.round((readyCount / PRIORITY_FRAME_COUNT) * 100);
  const overlayOpacity = 1 - clamp(progress / 0.3, 0, 1);
  const trackHeight = isMobile ? "auto" : `calc(${SEQUENCE_SCROLL_DISTANCE}px + 100svh)`;

  return (
    <section
      id="hero"
      ref={trackRef}
      className={`relative bg-[var(--color-bg)] ${isMobile ? 'min-h-[100svh]' : ''}`}
      data-hero-active={!isMobile && isHeroActive ? "true" : "false"}
      data-hero-lock={!isMobile && isBodyLockedByHero ? "true" : "false"}
      style={isMobile ? {} : { height: trackHeight }}
    >
      <div className={`sticky top-0 overflow-hidden ${isMobile ? 'min-h-[100svh] flex flex-col pt-[12vh]' : 'h-[100svh]'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.14),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.44))]" />
        <div className="absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.92),transparent)]" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,107,0,0.12),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.08),transparent_25%,rgba(0,0,0,0.7)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
            mixBlendMode: "soft-light",
          }}
        />

        {!isMobile && (
          <div className="absolute inset-0 z-0">
            <HeroCanvas canvasRef={canvasRef} />
          </div>
        )}

        {isMobile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-0 flex flex-1 items-center justify-center w-full px-4 -mb-2 mt-4"
          >
            <img
              src="/moblie.png"
              alt="Sac Valley Detail mobile view"
              className="w-full max-h-[50vh] object-contain"
            />
          </motion.div>
        )}

        <div className={`relative z-20 flex w-full px-4 sm:px-6 md:px-10 lg:px-16 ${isMobile ? 'flex-col text-center items-center pb-10 -mt-20' : 'h-full flex-row items-end pb-18 pt-24 lg:pb-18 max-[740px]:pb-24 max-[740px]:pt-22'}`}>
          <motion.div 
            key={isMobile ? "mobile" : "desktop"}
            initial={isMobile ? { opacity: 0, y: 30 } : false}
            animate={isMobile ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full ${isMobile ? 'max-w-lg' : 'max-w-3xl'}`}
          >
            <div
              className={`space-y-5 transition-opacity duration-300 sm:space-y-6 ${isMobile ? 'flex flex-col items-center' : ''}`}
              style={{ opacity: isMobile ? 1 : overlayOpacity }}
            >
              <div className="inline-flex max-w-full items-center gap-3 border border-[rgba(255,107,0,0.28)] bg-[rgba(10,10,10,0.5)] px-3 py-2 text-[0.62rem] uppercase tracking-[0.26em] text-[var(--color-muted)] backdrop-blur-md min-[360px]:px-4 min-[360px]:text-[0.68rem] sm:tracking-[0.4em]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(255,107,0,0.7)]" />
                Sac Valley Detail
              </div>
              <div className="space-y-4 sm:space-y-5">
                <h1 className="max-w-[8ch] font-[family:var(--font-heading)] text-[clamp(2.8rem,16vw,4.2rem)] uppercase leading-[0.9] tracking-[0.03em] text-[var(--color-text)] min-[400px]:text-[clamp(3.2rem,15vw,4.8rem)] sm:max-w-4xl sm:text-[clamp(4.8rem,10vw,5.8rem)] lg:text-[7rem]">
                  Get the Look You and Your Car Deserve
                </h1>
                <p className="max-w-lg text-sm leading-7 text-white/74 min-[360px]:text-base sm:max-w-xl sm:text-lg sm:leading-8">
                  Mobile detailing • Sacramento Valley
                </p>
              </div>
            </div>

            <div className={`mt-6 flex max-w-xl flex-wrap items-center gap-x-4 gap-y-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/55 min-[360px]:text-[0.68rem] sm:mt-8 sm:text-[0.72rem] sm:tracking-[0.34em] ${isMobile ? 'justify-center mx-auto' : ''}`}>
              {!isMobile && <div className="h-px w-12 bg-[linear-gradient(90deg,rgba(255,107,0,0.95),transparent)] sm:w-16" />}
              <span>{isMobile ? "Discover the Difference Below" : (hasSequenceCompleted ? "Sequence complete" : "Scroll to rotate")}</span>
              {!isMobile && (
                <div
                  className={`flex items-center transition-opacity duration-300 ${hasSequenceCompleted ? "opacity-0" : "opacity-100"
                    }`}
                >
                  <span className="hero-scroll-cue" aria-hidden="true" />
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {!isMobile && (
          <div
            className={`absolute inset-0 z-30 flex items-center justify-center bg-[rgba(5,5,5,0.82)] backdrop-blur-md transition-opacity duration-500 ${isSequenceReady ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
          >
            <div className="w-[min(24rem,calc(100vw-2rem))] space-y-4 rounded-[1.5rem] border border-[rgba(255,107,0,0.2)] bg-[linear-gradient(180deg,rgba(17,17,17,0.95),rgba(8,8,8,0.92))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.48)] min-[360px]:w-[min(24rem,calc(100vw-3rem))] min-[360px]:space-y-5 min-[360px]:rounded-[1.75rem] min-[360px]:p-7">
              <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-muted)] min-[360px]:text-[0.72rem] min-[360px]:tracking-[0.38em]">
                Preloading sequence
              </p>
              <div className="space-y-3">
                <p className="font-[family:var(--font-heading)] text-[2.2rem] uppercase tracking-[0.06em] text-[var(--color-text)] min-[360px]:text-4xl min-[360px]:tracking-[0.08em]">
                  {loadingProgress}%
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#ff6b00,#ff9a47)] transition-[width] duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <p className="text-sm leading-6 text-white/62 sm:leading-7">
                  Staging the 140-frame showroom pass before the scroll sequence
                  begins.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[0.56rem] uppercase tracking-[0.18em] text-white/55 backdrop-blur-md min-[360px]:px-4 min-[360px]:text-[0.62rem] sm:bottom-8 sm:left-auto sm:right-10 sm:translate-x-0 sm:px-4 sm:text-[0.68rem] sm:tracking-[0.3em] lg:right-16 max-[700px]:max-w-[calc(100vw-2rem)]">
            Frame {formatFrameNumber(currentFrame)} / {String(TOTAL_FRAMES).padStart(FRAME_PAD_LENGTH, "0")}
          </div>
        )}
      </div>
    </section>
  );
}
