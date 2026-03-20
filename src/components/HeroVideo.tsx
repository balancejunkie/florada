"use client";

import { useEffect, useRef, useState } from "react";

// First visit shows video 1 (new cooler one), subsequent reloads alternate
const VIDEOS = ["/videos/hero-loop-2.mp4", "/videos/hero-loop-web.mp4"];

function getNextVideo(): string {
  if (typeof window === "undefined") return VIDEOS[0];
  const lastIndex = parseInt(sessionStorage.getItem("heroVideoIndex") ?? "-1", 10);
  const nextIndex = (lastIndex + 1) % VIDEOS.length;
  sessionStorage.setItem("heroVideoIndex", String(nextIndex));
  return VIDEOS[nextIndex];
}

export default function HeroVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
  const [videoSrc, setVideoSrc] = useState(VIDEOS[0]);

  useEffect(() => {
    setVideoSrc(getNextVideo());
  }, []);

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
    </div>
  );
}
