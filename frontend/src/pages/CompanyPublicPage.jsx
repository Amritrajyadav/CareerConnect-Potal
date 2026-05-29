import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function CompanyPublicPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    API.get(`/profiles/company/public/${id}`)
      .then((res) => setCompany(res.data))
      .catch(() => setCompany(null));
  }, [id]);

  if (!company) {
    return (
      <div className="dashboard">
        <div className="card">
          <h2>Company not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="company-public-page">
      <section
        className="company-cover"
        style={{
          backgroundImage: company.bannerImage
            ? `linear-gradient(rgba(15,23,42,.72), rgba(15,23,42,.82)), url(${company.bannerImage})`
            : "linear-gradient(135deg, #0f172a, #1d4ed8)",
        }}
      >
        <div className="company-cover-content">
          <div className="company-logo-public">
            {company.logo ? (
              <img src={company.logo} alt={company.companyName} />
            ) : (
              <span>{company.companyName?.charAt(0) || "C"}</span>
            )}
          </div>

          <div>
            <p className="eyebrow">Public Company Profile</p>
            <h1>{company.companyName || "Company"}</h1>
            <p>{company.description || "Company hiring page"}</p>

            <div className="company-public-meta">
              <span>📍 {company.location || "Location not added"}</span>
              <span>🏢 {company.industry || "Industry not added"}</span>
              {company.website && (
                <a href={company.website} target="_blank" rel="noreferrer">
                  🌐 Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="company-public-stats">
        <div className="stat-card blue">
          <h2>{company.jobs?.length || 0}</h2>
          <p>Open Jobs</p>
        </div>

        <div className="stat-card green">
          <h2>Verified</h2>
          <p>Company Status</p>
        </div>

        <div className="stat-card orange">
          <h2>Hiring</h2>
          <p>Current Mode</p>
        </div>

        <div className="stat-card purple">
          <h2>Pro</h2>
          <p>Profile Level</p>
        </div>
      </section>

      <section className="dashboard">
        <div className="page-header">
          <div>
            <p className="eyebrow">Open Roles</p>
            <h1>Jobs at {company.companyName}</h1>
          </div>
        </div>

        <div className="jobs-list-fixed">
          {company.jobs?.map((job) => (
            <div className="card premium-job-card" key={job.id}>
              <div className="premium-top">
                <div>
                  <h2>{job.title}</h2>
                  <p>{job.location || "Remote / Hybrid"}</p>
                </div>

                <span className="premium-badge">{job.jobType || "JOB"}</span>
              </div>

              <p className="job-desc">{job.description}</p>

              <div className="premium-meta">
                <span>💰 {job.salary || "Competitive"}</span>
                <span>🎯 {job.experience || "Fresher"}</span>
                <span>📌 {job.jobType || "Full Time"}</span>
              </div>

              <div className="skill-tags">
                {(job.skillsRequired || "")
                  .split(",")
                  .filter(Boolean)
                  .slice(0, 6)
                  .map((skill, idx) => (
                    <span key={idx}>{skill.trim()}</span>
                  ))}
              </div>

              <div className="job-actions">
                <Link to="/jobs" className="btn">
                  Apply From Jobs Page
                </Link>
              </div>
            </div>
          ))}

          {company.jobs?.length === 0 && (
            <div className="card">
              <p>No open jobs right now.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CompanyPublicPage;