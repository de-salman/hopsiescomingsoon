"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
        // You might want to show a play button here s
      });
    }
  }, []);

  return (
    <div>
      <img
        className="desktop"
        src="https://res.cloudinary.com/dfznv3tjy/image/upload/f_auto,q_auto/v1728042380/Hopsies/dfevkwqy9tqziixu2ytv.png"
        width="100%"
        alt="Hopsies desktop"
      />
      <video
        ref={videoRef}
        className="mobile"
        autoPlay
        playsInline
        muted
        loop
        src="./Hopsies.mp4"
        width="100%"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
