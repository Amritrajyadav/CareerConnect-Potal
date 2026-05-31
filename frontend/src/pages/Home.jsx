import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    API.get("/offers")
      .then((res) => setOffers(res.data))
      .catch(() => setOffers([]));
  }, []);

  const platformFeatures = [
    {
      icon: "🎓",
      title: "Student Career Hub",
      desc: "Build your profile, upload resume, track applications, save jobs and manage placement offers.",
    },
    {
      icon: "🏢",
      title: "Smart HR Workspace",
      desc: "Post jobs, manage applicants, schedule interviews and control hiring workflow from one panel.",
    },
    {
      icon: "🛡️",
      title: "Admin Control Center",
      desc: "Approve companies, manage users, jobs, offers, analytics and platform activities securely.",
    },
    {
      icon: "🤖",
      title: "AI Resume Intelligence",
      desc: "ATS score, job match percentage, missing skills and resume suggestions for better hiring outcomes.",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Create Profile",
      desc: "Students and companies register with role-based secure authentication.",
    },
    {
      step: "02",
      title: "Build Career Identity",
      desc: "Upload resume, company branding, profile details and public portfolio links.",
    },
    {
      step: "03",
      title: "Apply & Hire",
      desc: "Students apply for jobs while recruiters manage applicants and interviews.",
    },
    {
      step: "04",
      title: "Track Placement",
      desc: "Offers, interviews, notifications and analytics stay connected in one platform.",
    },
  ];

  const successStories = [
    {
      name: "Rahul Verma",
      role: "Java Full Stack Developer",
      company: "TCS",
      package: "6.5 LPA",
    },
    {
      name: "Anjali Sharma",
      role: "React Developer",
      company: "Infosys",
      package: "5.8 LPA",
    },
    {
      name: "Aman Gupta",
      role: "Backend Developer",
      company: "Accenture",
      package: "7.2 LPA",
    },
  ];

  return (
    <div className="home-premium">
      <section className="home-hero-premium">
        <div className="home-hero-left">
          <span className="home-badge">🚀 AI-Powered Career & Hiring SaaS</span>

          <h1>
            Launch Your Dream Career With Smart Hiring, AI Resume Analysis &
            Real-Time Placement Tracking.
          </h1>

          <p>
            CareerConnect Pro connects students, recruiters and administrators
            through a modern job portal with secure dashboards, resume upload,
            AI-powered job matching, company approval, interview scheduling and
            placement offer management.
          </p>

          <div className="home-hero-actions">
            <Link to="/register" className="btn home-primary-btn">
              Start Free Today
            </Link>

            <Link to="/jobs" className="btn home-secondary-btn">
              Explore Jobs
            </Link>
          </div>

          <div className="home-trust-row">
            <span>Trusted workflow for</span>
            <b>Students</b>
            <b>Companies</b>
            <b>Admins</b>
            <b>Placement Teams</b>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="hero-glass-card main-preview-card">
            <div className="preview-card-top">
              <div>
                <span className="live-dot"></span>
                Live Hiring Dashboard
              </div>
              <b>CareerConnect Pro</b>
            </div>

            <div className="preview-score-grid">
              <div>
                <span>Applications</span>
                <h3>248</h3>
              </div>

              <div>
                <span>Interviews</span>
                <h3>38</h3>
              </div>

              <div>
                <span>Offers</span>
                <h3>12</h3>
              </div>

              <div>
                <span>Job Match</span>
                <h3>92%</h3>
              </div>
            </div>

            <div className="preview-progress">
              <div>
                <span>Resume Strength</span>
                <b>86%</b>
              </div>
              <div className="progress-track">
                <span style={{ width: "86%" }}></span>
              </div>
            </div>

            <div className="preview-mini-list">
              <div>
                <span>🎯</span>
                <p>
                  <b>Java Full Stack</b>
                  <small>92% Match</small>
                </p>
              </div>

              <div>
                <span>📅</span>
                <p>
                  <b>Interview Scheduled</b>
                  <small>Today 4:30 PM</small>
                </p>
              </div>
            </div>
          </div>

          <div className="hero-float-card float-one">
            <b>ATS Score</b>
            <h3>86%</h3>
            <p>Resume optimized</p>
          </div>

          <div className="hero-float-card float-two">
            <b>Hiring Status</b>
            <h3>Active</h3>
            <p>12 companies online</p>
          </div>
        </div>
      </section>

      <section className="home-stats-premium">
        <div>
          <h2>25K+</h2>
          <p>Students Managed</p>
        </div>

        <div>
          <h2>1.2K+</h2>
          <p>Companies Connected</p>
        </div>

        <div>
          <h2>8.5K+</h2>
          <p>Jobs & Internships</p>
        </div>

        <div>
          <h2>95%</h2>
          <p>Smart Match Score</p>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-title">
          <span className="eyebrow">Platform Modules</span>
          <h2>Everything needed for a modern placement and hiring ecosystem.</h2>
          <p>
            Built like a real SaaS product with dashboards, authentication,
            analytics, smart workflows and public profile pages.
          </p>
        </div>

        <div className="home-feature-grid">
          {platformFeatures.map((item) => (
            <div className="home-feature-card" key={item.title}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-workflow-section">
        <div className="home-section-title light">
          <span className="eyebrow">How It Works</span>
          <h2>From profile creation to final placement offer.</h2>
          <p>
            CareerConnect Pro keeps the entire hiring journey clean, trackable
            and professional.
          </p>
        </div>

        <div className="workflow-grid">
          {workflow.map((item) => (
            <div className="workflow-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-title">
          <span className="eyebrow">Smart Career Tools</span>
          <h2>Designed to make students job-ready and recruiters faster.</h2>
        </div>

        <div className="home-split">
          <div className="home-ai-card">
            <span className="home-badge">AI Resume Analyzer</span>
            <h2>Detect missing skills, improve ATS score and match better jobs.</h2>
            <p>
              Upload resume, analyze profile strength and generate suggestions
              for career improvement. Built for real placement workflows.
            </p>

            <Link to="/resume-analyzer" className="btn home-primary-btn">
              Try Resume Analyzer
            </Link>
          </div>

          <div className="home-mini-dashboard">
            <div className="mini-dash-row">
              <span>Resume Score</span>
              <b>84%</b>
            </div>

            <div className="mini-dash-row">
              <span>Profile Completion</span>
              <b>91%</b>
            </div>

            <div className="mini-dash-row">
              <span>Interview Readiness</span>
              <b>78%</b>
            </div>

            <div className="mini-dash-row">
              <span>Java Full Stack Match</span>
              <b>92%</b>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section story-section">
        <div className="home-section-title">
          <span className="eyebrow">Placement Stories</span>
          <h2>Career journeys that look professional and trackable.</h2>
        </div>

        <div className="story-grid">
          {successStories.map((story) => (
            <div className="story-card" key={story.name}>
              <div className="story-avatar">{story.name.charAt(0)}</div>
              <h3>{story.name}</h3>
              <p>{story.role}</p>
              <div>
                <b>{story.company}</b>
                <span>{story.package}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-workflow-section">
        <div className="home-section-title light">
          <span className="eyebrow">Admin CMS</span>
          <h2>Latest offers, announcements and placement updates.</h2>
          <p>
            Admin can publish offers and updates directly from the dashboard.
          </p>
        </div>

        <div className="offer-slider">
          {offers.length === 0 && (
            <>
              <div className="offer-slide">
                <h3>Resume Booster Week</h3>
                <p>Upload your resume and improve your profile strength.</p>
                <span>STUDENT</span>
              </div>

              <div className="offer-slide">
                <h3>Hiring Drive</h3>
                <p>Companies can post internship and job openings.</p>
                <span>COMPANY</span>
              </div>

              <div className="offer-slide">
                <h3>Smart Matching</h3>
                <p>Get matched with jobs based on your skills and profile.</p>
                <span>ALL</span>
              </div>
            </>
          )}

          {offers.map((offer) => (
            <div className="offer-slide" key={offer.id}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <span>{offer.targetRole || "ALL"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-final-cta">
        <div>
          <span className="home-badge">Ready To Get Started?</span>
          <h2>Build your career profile or start hiring smarter today.</h2>
          <p>
            Create your account and experience a complete full-stack placement
            and recruitment platform.
          </p>
        </div>

        <div className="home-hero-actions">
          <Link to="/register" className="btn home-primary-btn">
            Create Account
          </Link>

          <Link to="/jobs" className="btn home-secondary-btn">
            View Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;