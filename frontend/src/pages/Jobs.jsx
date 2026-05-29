import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    API.get("/jobs")
      .then((res) => setJobs(res.data))
      .catch(() => setError("Unable to load jobs."));
  }, []);

  const calculateMatch = (skillsRequired = "") => {
    const skills = skillsRequired.toLowerCase();
    let score = 55;

    if (skills.includes("java")) score += 10;
    if (skills.includes("spring")) score += 10;
    if (skills.includes("react")) score += 9;
    if (skills.includes("mysql")) score += 7;
    if (skills.includes("javascript")) score += 7;
    if (skills.includes("rest")) score += 6;
    if (skills.includes("docker")) score += 5;
    if (skills.includes("python")) score += 4;

    return Math.min(score, 98);
  };

  const filteredJobs = useMemo(() => {
    return jobs
      .map((job) => ({ ...job, match: calculateMatch(job.skillsRequired) }))
      .filter((job) => {
        const q = search.toLowerCase();

        const matchSearch =
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.skillsRequired?.toLowerCase().includes(q);

        if (filter === "HOT") return matchSearch && job.match >= 85;
        if (filter === "TRENDING") return matchSearch && job.match >= 70;

        return matchSearch;
      })
      .sort((a, b) => b.match - a.match);
  }, [jobs, search, filter]);

  const applyJob = async (jobId) => {
    setMsg("");
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "STUDENT") {
      setError("Only students can apply for jobs.");
      return;
    }

    try {
      await API.post("/applications", {
        studentId: user.id,
        jobId,
        resumePath: "resume.pdf",
      });

      setMsg("Application submitted successfully.");
    } catch {
      setError("You may already have applied.");
    }
  };

  const saveJob = async (jobId) => {
    setMsg("");
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "STUDENT") {
      setError("Only students can save jobs.");
      return;
    }

    try {
      await API.post("/saved-jobs", {
        studentId: user.id,
        jobId,
      });

      setMsg("Job saved successfully.");
    } catch {
      setError("Job already saved.");
    }
  };

  return (
    <div className="jobs-page">
      <section className="jobs-hero-fixed">
        <div>
          <p className="eyebrow">AI Powered Jobs</p>
          <h1>Find Your Best Matching Job</h1>
          <p>
            Smart job recommendations based on your skills, resume and career
            profile.
          </p>
        </div>

        <div className="jobs-hero-card">
          <h2>{filteredJobs.length}</h2>
          <p>Matching Jobs</p>
        </div>
      </section>

      <section className="jobs-filter-panel">
        <input
          type="text"
          placeholder="Search by job title, skills or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-group">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            All Jobs
          </button>

          <button
            className={filter === "HOT" ? "active" : ""}
            onClick={() => setFilter("HOT")}
          >
            Hot Jobs
          </button>

          <button
            className={filter === "TRENDING" ? "active" : ""}
            onClick={() => setFilter("TRENDING")}
          >
            Trending
          </button>
        </div>
      </section>

      {msg && <p className="success-msg">{msg}</p>}
      {error && <p className="error-msg">{error}</p>}

      <section className="jobs-helper-grid">
        <div className="card compact-card">
          <h2>AI Career Suggestions</h2>
          <div className="mini-list">
            <div className="mini-row">
              <div>
                <b>Learn Docker</b>
                <p>Improve deployment profile.</p>
              </div>
            </div>

            <div className="mini-row">
              <div>
                <b>Spring Security</b>
                <p>Best for Java backend jobs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card compact-card">
          <h2>Trending Skills</h2>
          <div className="trend-tags">
            <span>React</span>
            <span>Spring Boot</span>
            <span>MySQL</span>
            <span>Docker</span>
            <span>AWS</span>
          </div>
        </div>
      </section>

      <section className="jobs-list-fixed">
        {filteredJobs.map((job) => (
          <div className="card premium-job-card" key={job.id}>
            <div className="premium-top">
              <div>
                <h2>{job.title}</h2>
                <p>{job.location || "Remote / Hybrid"}</p>
              </div>

              <span className="premium-badge">
                {job.match >= 85 ? "HOT" : "TRENDING"}
              </span>
            </div>

            <div className="ai-match-strip">
              <div className="ai-progress" style={{ width: `${job.match}%` }} />
            </div>

            <div className="match-info">
              <b>{job.match}% Match</b>
              <span>Based on your skills & resume</span>
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
              <button className="btn" onClick={() => applyJob(job.id)}>
                Apply Now
              </button>

              <button className="btn secondary" onClick={() => saveJob(job.id)}>
                Save Job
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="card">
            <p>No jobs matched your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Jobs;