import { useRef, useState, useCallback, useEffect } from "react";
import "./styles/BrowserMockup.css";

interface Props {
  videoSrc: string;
  link?: string;
  isActive?: boolean; // Work.jsx se pass hoga — slide change par video pause
}

const BrowserMockup = ({ videoSrc, link, isActive = true }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const url = link
    ? link.replace("https://", "").replace("http://", "")
    : "www.website.com";

  // Jab slide change ho — video pause karo
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setShowOverlay(true);
    }
  }, [isActive]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // link trigger na ho
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowOverlay(false);
    } else {
      video.pause();
      setIsPlaying(false);
      setShowOverlay(true);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setShowOverlay(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowOverlay(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) setShowOverlay(false);
  }, [isPlaying]);

  return (
    <div className="bm-wrap">
      <div className="bm-screen bm-main">

        {/* ── Browser Top Bar ── */}
        <div className="bm-bar bm-bar-main">
          <div className="bm-dots">
            <span className="bm-dot bm-r" />
            <span className="bm-dot bm-y" />
            <span className="bm-dot bm-g" />
          </div>
          <div className="bm-url">{url}</div>
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="bm-ext">
              ↗
            </a>
          )}
        </div>

        {/* ── Video Area ── */}
        <div
          className="bm-img-main"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: "relative", cursor: "pointer" }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="bm-video"
            // autoPlay & loop hata diya — ab manually control hoga
          />

          {/* ── Play / Pause Overlay ── */}
          <div
            className="bm-play-overlay"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.32)",
              opacity: showOverlay ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "2px solid rgba(255,255,255,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                transition: "transform 0.2s ease",
              }}
            >
              {isPlaying ? (
                // Pause Icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <rect x="5" y="3" width="4" height="18" rx="1" />
                  <rect x="15" y="3" width="4" height="18" rx="1" />
                </svg>
              ) : (
                // Play Icon
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ marginLeft: "3px" }}
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </div>
          </div>

          {/* ── View Project Button (sirf pause par dikh-ta hai) ── */}
          <div
            className="bm-overlay"
            style={{
              opacity: showOverlay ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="bm-btn"
                onClick={(e) => e.stopPropagation()} // video toggle na ho
              >
                View Project ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrowserMockup;