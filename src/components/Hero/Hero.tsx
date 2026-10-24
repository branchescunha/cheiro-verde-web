"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  calculateScrollProgress,
  progressToVideoTime,
} from "./hero-progress";
import styles from "./Hero.module.css";

const desktopMediaQuery = "(min-width: 64rem)";
const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

const mediaByViewport = {
  desktop: {
    poster: "/images/site/paladar-hero-poster-desktop.webp",
    video: "/videos/hero/paladar-hero-desktop.mp4",
  },
  mobile: {
    poster: "/images/site/paladar-hero-poster-mobile.webp",
    video: "/videos/hero/paladar-hero-mobile.mp4",
  },
} as const;

type HeroProps = {
  children: ReactNode;
  labelledBy: string;
};

export function Hero({ children, labelledBy }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !videoRef.current) {
      return;
    }

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;

    const desktopPreference = window.matchMedia(desktopMediaQuery);
    const reducedMotionPreference = window.matchMedia(
      reducedMotionMediaQuery,
    );
    let animationFrameId: number | null = null;
    let progress = 0;
    let waitingForInitialSeek = false;

    function updateVideoTime() {
      const stickyTop = Number.parseFloat(
        window.getComputedStyle(sticky).top,
      );
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      progress = calculateScrollProgress({
        scrollY: window.scrollY,
        sectionTop,
        sectionHeight: section.offsetHeight,
        stickyHeight: sticky.offsetHeight,
        stickyTop: Number.isFinite(stickyTop) ? stickyTop : 0,
      });

      if (
        reducedMotionPreference.matches ||
        video.readyState < HTMLMediaElement.HAVE_METADATA
      ) {
        return;
      }

      const targetTime = progressToVideoTime(progress, video.duration);

      if (Math.abs(video.currentTime - targetTime) >= 1 / 60) {
        video.currentTime = targetTime;
      }
    }

    function scheduleVideoUpdate() {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateVideoTime();
      });
    }

    function showVideo() {
      section.dataset.videoReady = "true";
    }

    function handleLoadedMetadata() {
      video.pause();

      const targetTime = progressToVideoTime(progress, video.duration);
      waitingForInitialSeek = targetTime > 1 / 60;
      video.currentTime = targetTime;

      if (
        !waitingForInitialSeek &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        showVideo();
      }
    }

    function handleLoadedData() {
      if (!waitingForInitialSeek) {
        showVideo();
      }
    }

    function handleSeeked() {
      waitingForInitialSeek = false;
      video.pause();
      showVideo();
    }

    function applyMediaPreference() {
      updateVideoTime();

      if (reducedMotionPreference.matches) {
        section.dataset.videoReady = "false";
        video.pause();
        video.removeAttribute("src");
        video.removeAttribute("poster");
        video.load();
        return;
      }

      const selectedMedia = desktopPreference.matches
        ? mediaByViewport.desktop
        : mediaByViewport.mobile;

      video.poster = selectedMedia.poster;

      if (video.getAttribute("src") === selectedMedia.video) {
        scheduleVideoUpdate();
        return;
      }

      section.dataset.videoReady = "false";
      video.pause();
      video.src = selectedMedia.video;
      video.load();
    }

    window.addEventListener("scroll", scheduleVideoUpdate, { passive: true });
    window.addEventListener("resize", scheduleVideoUpdate, { passive: true });
    desktopPreference.addEventListener("change", applyMediaPreference);
    reducedMotionPreference.addEventListener("change", applyMediaPreference);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);

    applyMediaPreference();
    scheduleVideoUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleVideoUpdate);
      window.removeEventListener("resize", scheduleVideoUpdate);
      desktopPreference.removeEventListener("change", applyMediaPreference);
      reducedMotionPreference.removeEventListener(
        "change",
        applyMediaPreference,
      );
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.heroScroll}
      aria-labelledby={labelledBy}
      data-video-ready="false"
    >
      <div ref={stickyRef} className={styles.heroSticky}>
        <picture className={styles.poster}>
          <source
            media={desktopMediaQuery}
            srcSet={mediaByViewport.desktop.poster}
          />
          <img
            className={styles.posterImage}
            src={mediaByViewport.mobile.poster}
            alt=""
            width="936"
            height="1664"
            fetchPriority="high"
          />
        </picture>

        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />

        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
