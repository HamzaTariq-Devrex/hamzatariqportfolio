import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Job 1 */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior Frontend Web Developer</h4>
                <h5>Ruya Solutions</h5>
              </div>
              <h3>2023 - 2024</h3>
            </div>
            <p>
              Began my professional journey building real-world client websites
              as a Junior Frontend Developer. Worked on multiple projects using
              React.js, crafting responsive and visually clean interfaces.
              Collaborated closely with design teams to turn concepts into
              pixel-perfect, fully functional web experiences.
            </p>
          </div>

          {/* Job 2 */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & Frontend Developer</h4>
                <h5>Devrex Digital</h5>
              </div>
              <h3>2024 - Present</h3>
            </div>
            <p>
              Founded Devrex Digital, a creative web development agency built
              around delivering premium, fully custom websites. Successfully
              partnered with 30+ brands, startups, and businesses across diverse
              industries. Every project was crafted around the client's unique
              brand identity — from custom theme design and UI/UX to SEO
              optimization, lead generation, sales strategy, and complete web
              management. Helping businesses not just launch online, but grow.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;