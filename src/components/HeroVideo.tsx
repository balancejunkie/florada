"use client";

import { useEffect, useRef, useState, useMemo } from "react";

const VIDEOS = ["/videos/hero-loop-web.mp4", "/videos/hero-loop-2.mp4"];

export default function HeroVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");

  // Pick a random video on each page load
  const videoSrc = useMemo(
    () => VIDEOS[Math.floor(Math.random() * VIDEOS.length)],
    []
  );

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const CROSSFADE_TIME = 1.0;

    const handleTimeUpdate = (
      current: HTMLVideoElement,
      next: HTMLVideoElement,
      label: "A" | "B"
    ) => {
      if (
        current.duration - current.currentTime <= CROSSFADE_TIME &&
        next.paused
      ) {
        next.currentTime = 0;
        next.play().catch(() => {});
        setActiveVideo(label === "A" ? "B" : "A");
      }
    };

    const onTimeUpdateA = () => handleTimeUpdate(videoA, videoB, "A");
    const onTimeUpdateB = () => handleTimeUpdate(videoB, videoA, "B");

    videoA.addEventListener("timeupdate", onTimeUpdateA);
    videoB.addEventListener("timeupdate", onTimeUpdateB);

    return () => {
      videoA.removeEventListener("timeupdate", onTimeUpdateA);
      videoB.removeEventListener("timeupdate", onTimeUpdateB);
    };
  }, []);

  return (
    <div className="video-container absolute inset-0 overflow-hidden">
      <video
        ref={videoARef}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "A" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoBRef}
        src={videoSrc}
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ${
          activeVideo === "B" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
    </div>
  );
}
