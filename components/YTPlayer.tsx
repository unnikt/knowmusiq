"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  videoId: string;
  autoplay?: boolean;
}

export default function YouTubePlayer({ videoId, autoplay = false }: Props) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const createPlayer = () => {
    if (!playerRef.current || !window.YT) return;

    new window.YT.Player(playerRef.current, {
      videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        mute: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 1,
        fs: 0,
        iv_load_policy: 3,
        disablekb: 1,
      },
      events: {
        onReady: (event: any) => {
          setLoading(false);
          if (autoplay && videoId) event.target.playVideo();
        },
        onStateChange: (event: any) => {
          if (event.data === 0) {
            event.target.seekTo(0);
            event.target.pauseVideo();
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!videoId) return;

    // If API already loaded, create player immediately
    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }

    // Otherwise, load script once
    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };


    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []); // <-- run only once

  return (
    <div className="relative w-full aspect-video rounded overflow-hidden bg-black">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-my-secondary rounded-full"></div>
        </div>
      )}
      <div ref={playerRef} className="w-full h-full" />
    </div>
  );
}
