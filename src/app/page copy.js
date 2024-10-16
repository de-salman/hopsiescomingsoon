import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to play immediately
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started
            setShowPlayButton(false);
          })
          .catch((error) => {
            // Autoplay was prevented
            console.log("Autoplay was prevented:", error);
            setShowPlayButton(true);
          });
      }

      // Add event listener for iOS to attempt autoplay on first user interaction
      const attemptPlay = () => {
        video
          .play()
          .then(() => {
            setShowPlayButton(false);
          })
          .catch((error) => {
            console.log("Playback failed:", error);
          });
      };

      document.body.addEventListener("touchstart", attemptPlay);

      // Cleanup function
      return () => {
        document.body.removeEventListener("touchstart", attemptPlay);
      };
    }
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setShowPlayButton(false);
        })
        .catch((error) => {
          console.log("Playback failed:", error);
        });
    }
  };

  return (
    <div className="relative">
      <img
        className="hidden md:block w-full"
        src="https://res.cloudinary.com/dfznv3tjy/image/upload/f_auto,q_auto/v1728042380/Hopsies/dfevkwqy9tqziixu2ytv.png"
        alt="Hopsies desktop"
      />
      <div className="md:hidden relative">
        <video
          ref={videoRef}
          className="w-full"
          playsInline
          muted
          loop
          preload="auto"
          poster="path/to/poster-image.jpg"
          src="./Hopsies.mp4"
        >
          Your browser does not support the video tag.
        </video>
        {showPlayButton && (
          <button
            onClick={handlePlayClick}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-4"
          >
            Play Video
          </button>
        )}
      </div>
    </div>
  );
}
