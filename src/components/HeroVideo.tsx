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

/** Sample the average color from a strip of pixels in a video frame */
function sampleVideoColor(
  video: HTMLVideoElement,
  position: "top" | "bottom"
): string | null {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx || video.videoWidth === 0) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Sample a horizontal strip (10px tall) at top or bottom
    const y = position === "top" ? 0 : video.videoHeight - 10;
    const imageData = ctx.getImageData(0, y, video.videoWidth, 10);
    const data = imageData.data;

    let r = 0, g = 0, b = 0, count = 0;
    // Sample every 40th pixel for speed
    for (let i = 0; i < data.length; i += 4 * 40) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    if (count === 0) return null;

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    return `rgb(${r},${g},${b})`;
  } catch {
    return null;
  }
}

function setThemeColor(color: string) {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", color);
}

export default function HeroVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
  const [src, setSrc] = useState<string | null>(null);
  const colorSampled = useRef(false);

  // Pick video on mount (client only)
  useEffect(() => {
    setSrc(getNextVideoSrc());
  }, []);

  // Sample video edge colors once it starts playing
  const sampleColors = useCallback((video: HTMLVideoElement) => {
    if (colorSampled.current) return;
    colorSampled.current = true;

    const topColor = sampleVideoColor(video, "top");
    if (topColor) {
      setThemeColor(topColor);
    }

    const bottomColor = sampleVideoColor(video, "bottom");
    if (bottomColor) {
      const ribbon = document.getElementById("hero-ribbon");
      if (ribbon) {
        ribbon.style.setProperty("--ribbon-color", bottomColor);
      }
    }
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

    // Sample colors once video has a frame
    const onPlaying = () => sampleColors(videoA);
    videoA.addEventListener("playing", onPlaying, { once: true });

    const onA = () => handleTimeUpdate(videoA, videoB, "A");
    const onB = () => handleTimeUpdate(videoB, videoA, "B");

    videoA.addEventListener("timeupdate", onA);
    videoB.addEventListener("timeupdate", onB);

    // Ensure video A starts playing
    videoA.play().catch(() => {});

    return () => {
      videoA.removeEventListener("playing", onPlaying);
      videoA.removeEventListener("timeupdate", onA);
      videoB.removeEventListener("timeupdate", onB);
    };
  }, [src, sampleColors]);

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
