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

function getNextVideoSrc(): string {
  const useHevc = supportsHevc();
  const lastIndex = parseInt(
    sessionStorage.getItem("heroVideoIndex") ?? "-1",
    10
  );
  const nextIndex = (lastIndex + 1) % VIDEOS.length;
  sessionStorage.setItem("heroVideoIndex", String(nextIndex));
  const entry = VIDEOS[nextIndex];
  return useHevc ? entry.hevc : entry.h264;
}

export default function HeroVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
  const [src, setSrc] = useState<string | null>(null);

  // Pick video on mount (client only)
  useEffect(() => {
    setSrc(getNextVideoSrc());
  }, []);

  // Set up crossfade loop once src and refs are ready
  useEffect(() => {
    if (!src) return;
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const CROSSFADE_TIME = 1.0;

    const handleTimeUpdate = (
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
        setActiveVideo(currentLabel === "A" ? "B" : "A");
      }
    };

    const onA = () => handleTimeUpdate(videoA, videoB, "A");
    const onB = () => handleTimeUpdate(videoB, videoA, "B");

    videoA.addEventListener("timeupdate", onA);
    videoB.addEventListener("timeupdate", onB);

    // Ensure video A starts playing
    videoA.play().catch(() => {});

    return () => {
      videoA.removeEventListener("timeupdate", onA);
      videoB.removeEventListener("timeupdate", onB);
    };
  }, [src]);

  return (
    <div className="video-container absolute inset-0 overflow-hidden">
      <video
        ref={videoARef}
        src={src ?? undefined}
        muted
        playsInline
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "A" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoBRef}
        src={src ?? undefined}
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "B" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
    </div>
  );
}
