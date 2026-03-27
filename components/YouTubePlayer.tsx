"use client";

import { title } from "node:process";
import { useEffect, useRef } from "react";

interface Props {
  videoId: string;
}

export default function YouTubePlayer({ videoId }: Props) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      new window.YT.Player(playerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,          // hide YouTube controls
          modestbranding: 1,
          rel: 0,               // no related videos
          showinfo: 0,
          fs: 0,                // disable fullscreen button
          iv_load_policy: 3,    // hide annotations
          disablekb: 1,         // disable keyboard controls
        },
        events: {
          onReady: (event: any) => {
            // Prevent end screen
            event.target.stopVideo();
          },
          onStateChange: (event: any) => {
            // Prevent "more videos" overlays
            if (event.data === 0) {
              event.target.seekTo(0);
              event.target.pauseVideo();
            }
          }
        }
      });
    };
  }, [videoId]);

  return (
    <div className="w-full aspect-video rounded overflow-hidden bg-black">
      <div ref={playerRef} className="w-full h-full" />
    </div>
  );
}