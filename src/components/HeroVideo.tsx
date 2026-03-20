"use client";

import { useEffect, useRef, useState } from "react";

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
  const [srcA, setSrcA] = useState<string>("");
  const [srcB, setSrcB] = useState<string>("");

  // All mutable state in refs to avoid re-triggering effects
  const hevcRef = useRef(false);
  const videoIndexRef = useRef(0);
  const activeRef = useRef<"A" | "B">("A");
  const transitioningRef = useRef(false);

  // Initialize sources on mount
  useEffect(() => {
    hevcRef.current = supportsHevc();
    const startIdx = getStartIndex();
    videoIndexRef.current = startIdx;
    setSrcA(getVideoSrc(startIdx, hevcRef.current));
    setSrcB(getVideoSrc(startIdx + 1, hevcRef.current));
  }, []);

  // Set up crossfade listeners ONCE (no deps that change)
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const CROSSFADE_TIME = 1.0;

    const handleNearEnd = (
      current: HTMLVideoElement,
      next: HTMLVideoElement,
      currentLabel: "A" | "B"
    ) => {
      // Only trigger if this is the active video and we're not already transitioning
      if (activeRef.current !== currentLabel) return;
      if (transitioningRef.current) return;
      if (!current.duration || current.duration - current.currentTime > CROSSFADE_TIME) return;

      transitioningRef.current = true;

      // Start next video
      next.currentTime = 0;
      next.play().catch(() => {});

      // Advance index and update active
      videoIndexRef.current += 1;
      const nextLabel = currentLabel === "A" ? "B" : "A";
      activeRef.current = nextLabel;
      setActiveVideo(nextLabel);

      // After transition completes, preload the next-next video into the now-hidden element
      setTimeout(() => {
        const preloadSrc = getVideoSrc(videoIndexRef.current + 1, hevcRef.current);
        if (currentLabel === "A") {
          // A just finished, B is playing. Preload into A.
          setSrcA(preloadSrc);
        } else {
          // B just finished, A is playing. Preload into B.
          setSrcB(preloadSrc);
        }
        transitioningRef.current = false;
      }, 2000);
    };

    const onA = () => handleNearEnd(videoA, videoB, "A");
    const onB = () => handleNearEnd(videoB, videoA, "B");

    videoA.addEventListener("timeupdate", onA);
    videoB.addEventListener("timeupdate", onB);

    return () => {
      videoA.removeEventListener("timeupdate", onA);
      videoB.removeEventListener("timeupdate", onB);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="video-container absolute inset-0 overflow-hidden">
      <video
        ref={videoARef}
        src={srcA || undefined}
        muted
        playsInline
        autoPlay
        className={`absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "A" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoBRef}
        src={srcB || undefined}
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
