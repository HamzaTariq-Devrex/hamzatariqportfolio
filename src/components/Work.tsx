import { useState, useCallback } from "react";
import "./styles/Work.css";
import BrowserMockup from "./BrowserMockup";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Dulha House",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc:
      "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Dulha%20House.mp4",
    link: "https://www.dulhahouse.net/",
  },
  {
    title: "Relantra",
    category: "Buisness Site",
    tools: "React.js · Tailwind CSS · Framer Motion",
    videoSrc:
      "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Relentra%20(2).mp4",
    link: "https://www.relentra.io/",
  },
  {
    title: "Zo & Ra",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Zo%20&%20Ra.mp4",
    link: "https://www.zoandra.com/",
  },
  {
    title: "The RagTAG",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/The%20Ragtag.mp4",
    link: "https://www.theragtagpk.com/",
  },
  {
    title: "Sway Store",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Sway%20Store.mp4",
    link: "https://www.swaystorepk.com/",
  },
    {
    title: "Chronovault Watches",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Chronovault%20-%20Watches%20_%20Wallets.mp4",
    link: "https://www.chronovaultwatches.com/",
  },
    {
    title: "Attire Clique",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Attire%20Clique.mp4",
    link: "https://attireclique.it.com/",
  },
    {
    title: "Exfolella",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Exfolella.mp4",
    link: "https://www.exfolella.com/",
  },
    {
    title: "Dua Art Studio",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Dua%20Art%20Studio.mp4",
    link: "https://www.duaartstudio.com/",
  },
     {
    title: "Enlightened Fashion Boutique",
    category: "eCommerce Website",
    tools: "React.js · Tailwind CSS · Custom Theme",
    videoSrc: "https://dataofclient.nyc3.cdn.digitaloceanspaces.com/Portfolio/Enlightened%20-%20A%20Fashion%20Botique.mp4",
    link: "https://www.enlightenedfsh.com/",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">

        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-arrows">
            <button
              className="carousel-arrow"
              onClick={goToPrev}
              aria-label="Previous"
              data-cursor="disable"
            >
              <MdArrowBack />
            </button>
            <button
              className="carousel-arrow"
              onClick={goToNext}
              aria-label="Next"
              data-cursor="disable"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">

                    <div className="carousel-info">
                      <span className="carousel-number">0{index + 1}</span>
                      <div className="carousel-details">
                        <p className="carousel-category">{project.category}</p>
                        <h4>{project.title}</h4>
                        <div className="carousel-tools">
                          <span className="tools-label">Stack</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-image-wrapper">
                      <BrowserMockup
                        videoSrc={project.videoSrc}
                        link={project.link}
                        isActive={index === currentIndex} // ← slide active hai ya nahi
                      />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-footer">
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>
            <span className="carousel-counter">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;