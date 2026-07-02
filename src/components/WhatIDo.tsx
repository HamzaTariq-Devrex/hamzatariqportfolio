import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    containerRef.current.forEach((container) => {
      if (container) {
        if (isTouchDevice) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          container.addEventListener("click", handler);
          (container as any)._clickHandler = handler;
        }
      }
    });

    return () => {
      containerRef.current.forEach((container) => {
        if (container && (container as any)._clickHandler) {
          container.removeEventListener("click", (container as any)._clickHandler);
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {/* Card 1 — Frontend Developer */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>WEB DEVELOPER</h3>
              <h4>Modern Web Development</h4>
              <p>
                I craft fast, responsive, and visually stunning websites with
                smooth animations and pixel-perfect design. From custom eCommerce
                stores to travel, restaurant, and corporate websites — built from
                scratch, no generic templates.
              </p>
              <div className="what-hidden">
                <h5>Skillset & Tools</h5>
                <div className="what-content-flex">
                  <div className="what-tags">⚛️ React.js</div>
                  <div className="what-tags">🎨 Tailwind CSS</div>
                  <div className="what-tags">⚡ JavaScript</div>
                  <div className="what-tags">🔷 TypeScript</div>
                  <div className="what-tags">▲ Next.js</div>
                  <div className="what-tags">🌐 HTML5</div>
                  <div className="what-tags">💅 CSS3</div>
                  <div className="what-tags">🎬 GSAP</div>
                  <div className="what-tags">🌀 Framer Motion</div>
                  <div className="what-tags">🖌️ Custom Themes</div>
                  <div className="what-tags">📱 Responsive Design</div>
                  <div className="what-tags">🛒 eCommerce</div>
                </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Card 2 — Business & Growth */}
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>BUSINESS & GROWTH</h3>
              <h4>Beyond Just Development</h4>
              <p>
                I don't just build websites — I help businesses grow online.
                From acquiring new clients and managing projects to SEO, hosting
                setup, and complete web management — I handle the full cycle so
                you can focus on your business.
              </p>
              <div className="what-hidden">
                <h5>What I Handle</h5>
                <div className="what-content-flex">
                  <div className="what-tags">🔍 SEO</div>
                  <div className="what-tags">🌐 Web Management</div>
                  <div className="what-tags">🤝 Client Management</div>
                  <div className="what-tags">📈 Sales</div>
                  <div className="what-tags">🎯 Client Hunting</div>
                  <div className="what-tags">🖥️ Hosting</div>
                  <div className="what-tags">🔗 Domains</div>
                  <div className="what-tags">💡 Lead Generation</div>
                  <div className="what-tags">📊 Project Management</div>
                  <div className="what-tags">🚀 Brand Growth</div>
                </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}