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

  return (
    <div className="landing">
      <section className="hero-pro">
        <div className="hero-content">
          <span className="premium-badge">AI-ready hiring platform</span>

          <h1>
            Build your career with a smarter, faster and professional job portal.
          </h1>

          <p>
            CareerConnect Pro connects students, companies and admins through
            secure dashboards, job management, resume uploads, application
            tracking and smart hiring workflows.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn hero-btn">
              Start Free
            </Link>
            <Link to="/jobs" className="btn glass-btn">
              Explore Jobs
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>10K+</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>Companies</span>
            </div>
            <div>
              <strong>95%</strong>
              <span>Match Accuracy</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="floating-card top-card">
            <b>Resume Score</b>
            <h3>86%</h3>
            <p>ATS-ready profile</p>
          </div>

          <div className="dashboard-preview">
            <div className="preview-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <h3>Hiring Dashboard</h3>

            <div className="preview-bars">
              <div style={{ width: "90%" }}></div>
              <div style={{ width: "70%" }}></div>
              <div style={{ width: "55%" }}></div>
            </div>

            <div className="preview-grid">
              <div>Applications<br /><b>248</b></div>
              <div>Interviews<br /><b>38</b></div>
              <div>Selected<br /><b>12</b></div>
              <div>Jobs<br /><b>74</b></div>
            </div>
          </div>

          <div className="floating-card bottom-card">
            <b>Job Match</b>
            <h3>92%</h3>
            <p>Java Full Stack</p>
          </div>
        </div>
      </section>

      <section className="section-pro">
        <div className="section-title">
          <span className="eyebrow">Platform Modules</span>
          <h2>Everything needed for an industry-level job portal</h2>
        </div>

        <div className="feature-grid-pro">
          <div className="feature-box">
            <span>🎓</span>
            <h3>Student Workspace</h3>
            <p>Profile, resume upload, applications and interview tracking.</p>
          </div>

          <div className="feature-box">
            <span>🏢</span>
            <h3>HR Hiring Panel</h3>
            <p>Post jobs, manage applicants, delete jobs and track hiring.</p>
          </div>

          <div className="feature-box">
            <span>🛡️</span>
            <h3>Admin Control Center</h3>
            <p>Users, jobs, offers, approvals and analytics management.</p>
          </div>

          <div className="feature-box">
            <span>🤖</span>
            <h3>AI-ready System</h3>
            <p>Resume analyzer, job match score and applicant ranking ready.</p>
          </div>
        </div>
      </section>

      <section className="section-pro dark-section">
        <div className="section-title light">
          <span className="eyebrow">Admin CMS</span>
          <h2>Latest offers, deals and announcements</h2>
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
                <p>Companies can post unlimited internship openings.</p>
                <span>COMPANY</span>
              </div>

              <div className="offer-slide">
                <h3>Smart Matching</h3>
                <p>Get matched with jobs based on skills and profile.</p>
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

      <section className="section-pro">
        <div className="cta-pro">
          <h2>Ready to launch your professional career platform?</h2>
          <p>
            Register as a student or company and start using the complete
            hiring workflow.
          </p>
          <Link to="/register" className="btn hero-btn">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;