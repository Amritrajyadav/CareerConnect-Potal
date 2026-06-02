import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <span className="about-badge">🚀 About CareerConnect</span>

        <h1>
          Building The Future Of Smart Hiring &
          Student Placement Management
        </h1>

        <p>
          CareerConnect Pro is a modern recruitment and placement platform
          designed to connect students, companies, and administrators
          through a centralized hiring ecosystem.
        </p>
      </section>

      <section className="about-grid">

        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            To simplify recruitment and placement processes by providing
            students and recruiters with a powerful digital platform.
          </p>
        </div>

        <div className="about-card">
          <h2>🌎 Our Vision</h2>
          <p>
            To become a complete AI-powered career and hiring platform
            helping students find opportunities and companies discover talent.
          </p>
        </div>

        <div className="about-card">
          <h2>🏢 For Companies</h2>
          <p>
            Post jobs, manage applicants, review profiles and streamline
            hiring workflows from one dashboard.
          </p>
        </div>

        <div className="about-card">
          <h2>🎓 For Students</h2>
          <p>
            Build your profile, upload resumes, apply for jobs and track
            your placement journey in real time.
          </p>
        </div>

      </section>

      <section className="about-features">

        <h2>Why CareerConnect?</h2>

        <div className="about-feature-grid">

          <div>
            <span>🤖</span>
            <h3>AI Resume Analysis</h3>
          </div>

          <div>
            <span>🔐</span>
            <h3>JWT Security</h3>
          </div>

          <div>
            <span>📊</span>
            <h3>Placement Analytics</h3>
          </div>

          <div>
            <span>💼</span>
            <h3>Job Matching</h3>
          </div>

          <div>
            <span>🏢</span>
            <h3>Company Approval</h3>
          </div>

          <div>
            <span>🛡️</span>
            <h3>Admin Control Center</h3>
          </div>

        </div>

      </section>

      <section className="about-founder">

        <h2>Developer</h2>

        <div className="founder-card">
          <h3>Amrit Raj</h3>

          <p>
            Java Full Stack Developer passionate about building scalable
            web applications using Spring Boot, React.js, MySQL and modern
            SaaS architectures.
          </p>

          <div className="founder-links">
            <a
              href="https://github.com/Amritrajyadav"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/amritrajyadav01"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              href="https://amritraj1-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </div>
        </div>

      </section>

      <section className="about-cta">
        <h2>Ready To Start Your Career Journey?</h2>

        <Link to="/register" className="btn home-primary-btn">
          Create Account
        </Link>
      </section>

    </div>
  );
}

export default AboutUs;