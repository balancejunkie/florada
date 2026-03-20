"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// [hevc 4K original, h264 4K fallback]
const VIDEOS = [
  { hevc: "/videos/hero-loop-3-hevc.mp4", h264: "/videos/hero-loop-3.mp4" },
  { hevc: "/videos/hero-loop-2-hevc.mp4", h264: "/videos/hero-loop-2.mp4" },
  { hevc: "/videos/hero-loop-web-hevc.mp4", h264: "/videos/hero-loop-web.mp4" },
];

function supportsHevc(): boolean {
  if (typeof document === "undefined") return false;
  const v = document.createElement("video");
  return v.canPlayType('video/mp4; codecs="hvc1"') !== "";
}

function getVideoSrc(index: number, useHevc: boolean): string {
  const entry = VIDEOS[index % VIDEOS.length];
  return useHevc ? entry.hevc : entry.h264;
}

function getStartIndex(): number {
  if (typeof window === "undefined") return 0;
  const last = parseInt(sessionStorage.getItem("heroVideoIndex") ?? "-1", 10);
  const next = (last + 1) % VIDEOS.length;
  sessionStorage.setItem("heroVideoIndex", String(next));
  return next;
}

export default function HeroVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
  const hevcRef = useRef(false);
  const videoIndexRef = useRef(0);
  const [srcA, setSrcA] = useState<string | null>(null);
  const [srcB, setSrcB] = useState<string | null>(null);

  // Initialize on mount
  useEffect(() => {
    hevcRef.current = supportsHevc();
    const startIdx = getStartIndex();
    videoIndexRef.current = startIdx;
    setSrcA(getVideoSrc(startIdx, hevcRef.current));
    // Preload next video into B
    setSrcB(getVideoSrc(startIdx + 1, hevcRef.current));
  }, []);

  // Advance to next video: swap active, preload the one after next
  const advanceVideo = useCallback((fromLabel: "A" | "B") => {
    videoIndexRef.current += 1;
    const nextLabel = fromLabel === "A" ? "B" : "A";
    setActiveVideo(nextLabel);

    // Preload the video after the one about to play
    const preloadIdx = videoIndexRef.current + 1;
    const preloadSrc = getVideoSrc(preloadIdx, hevcRef.current);
    if (fromLabel === "A") {
      // B is about to play, preload into A for next transition
      setTimeout(() => setSrcA(preloadSrc), 1500);
    } else {
      setTimeout(() => setSrcB(preloadSrc), 1500);
    }
  }, []);

  // Set up crossfade listeners
  useEffect(() => {
    if (!srcA || !srcB) return;
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const CROSSFADE_TIME = 1.0;

    const handleNearEnd = (
      current: HTMLVideoElement,
      next: HTMLVideoElement,
      currentLabel: "A" | "B"
    ) => {
      if (
        current.duration &&
        current.duration - current.currentTime <= CROSSFADE_TIME &&
        next.paused
      ) {
        next.currentTime = 0;
        next.play().catch(() => {});
        advanceVideo(currentLabel);
      }
    };

    const onA = () => handleNearEnd(videoA, videoB, "A");
    const onB = () => handleNearEnd(videoB, videoA, "B");

    videoA.addEventListener("timeupdate", onA);
    videoB.addEventListener("timeupdate", onB);

    // Start the active video
    if (activeVideo === "A") {
      videoA.play().catch(() => {});
    } else {
      videoB.play().catch(() => {});
    }

    return () => {
      videoA.removeEventListener("timeupdate", onA);
      videoB.removeEventListener("timeupdate", onB);
    };
  }, [srcA, srcB, advanceVideo, activeVideo]);

  return (
    <div className="video-container absolute inset-0 overflow-hidden">
      <video
        ref={videoARef}
        src={srcA ?? undefined}
        muted
        playsInline
        autoPlay
        className={`absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "A" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoBRef}
        src={srcB ?? undefined}
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "B" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
    </div>
  );
}
