import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current!;
    let hover = false;
    let rafId = 0;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Exponential smoothing corrected for real frame time, so the trail
    // stays consistent instead of speeding up/stuttering when the frame
    // rate varies or frames get dropped (a plain "divide by N every
    // frame" lerp implicitly assumes a fixed ~60fps tick).
    const followRate = 8; // higher = snappier catch-up, lower = more trailing lag
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      if (!hover) {
        const t = 1 - Math.exp(-followRate * dt);
        cursorPos.x += (mousePos.x - cursorPos.x) * t;
        cursorPos.y += (mousePos.y - cursorPos.y) * t;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const cleanupFns: Array<() => void> = [];
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      const onOver = () => {
        if (element.dataset.cursor === "icons") {
          const rect = element.getBoundingClientRect();
          // Keep the lerp's running position in sync so, once the hover
          // ends, it resumes chasing the mouse from here instead of
          // sweeping back from wherever it was before the hover started.
          cursorPos.x = rect.left;
          cursorPos.y = rect.top;
          cursor.classList.add("cursor-icons");
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
      cleanupFns.push(() => {
        element.removeEventListener("mouseover", onOver);
        element.removeEventListener("mouseout", onOut);
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
