import {
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    const icons = Array.from(social.querySelectorAll("span")).map((span) => ({
      elem: span as HTMLElement,
      link: (span as HTMLElement).querySelector("a") as HTMLElement,
      current: { x: 0, y: 0 },
    }));

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Original hit-test box for a 50x50 icon: x in (10,40), y in (5,40).
    // Expressed as margins (not hardcoded pixels) off a freshly-measured
    // rect each frame, so it still lines up if layout ever shifts.
    const marginLeft = 10;
    const marginRight = 10;
    const marginTop = 5;
    const marginBottom = 10;

    // Frame-rate-independent pull, tuned to match the original's ~60fps
    // feel (a noticeably softer, more "weighted" pull than the cursor
    // dot's own follow speed).
    const pullRate = 6.5;
    let lastTime = performance.now();
    let rafId = 0;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const t = 1 - Math.exp(-pullRate * dt);

      icons.forEach((icon) => {
        const rect = icon.elem.getBoundingClientRect();
        const x = mouse.x - rect.left;
        const y = mouse.y - rect.top;
        const within =
          x > marginLeft &&
          x < rect.width - marginRight &&
          y > marginTop &&
          y < rect.height - marginBottom;
        const targetX = within ? x : rect.width / 2;
        const targetY = within ? y : rect.height / 2;

        icon.current.x += (targetX - icon.current.x) * t;
        icon.current.y += (targetY - icon.current.y) * t;
        icon.link.style.setProperty("--siLeft", `${icon.current.x}px`);
        icon.link.style.setProperty("--siTop", `${icon.current.y}px`);
      });

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/HamzaTariq-Devrex" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>

        <span>
          <a href="https://wa.me/923054122637" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </span>

        <span>
          <a href="https://www.instagram.com/hamzatariq.dev/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
        </span>
      </div>

      {/* Resume Button */}
      <a
     className="resume-button"
  href="/Hamza Tariq Resume.pdf"
  download="Hamza Tariq Resume.pdf"
  target="_blank"
  rel="noreferrer"
>
    
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;