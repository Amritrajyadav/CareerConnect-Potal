import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

function CompanyDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const emptyJob = {
    companyId: user?.id || 1,
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    skillsRequired: "",
    jobType: "FULL_TIME",
    active: true,
  };

  const [job, setJob] = useState(emptyJob);
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadJobs = async () => {
    try {
      const res = await API.get(`/jobs/company/${user?.id}`);
      setJobs(res.data);
    } catch {
      setJobs([]);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const resetForm = () => {
    setJob(emptyJob);
    setEditingId(null);
  };

  const saveJob = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      if (editingId) {
        await API.put(`/jobs/${editingId}`, job);
        setMsg("Job updated successfully.");
      } else {
        await API.post("/jobs", job);
        setMsg("Job posted successfully.");
      }

      resetForm();
      loadJobs();
    } catch {
      setMsg(editingId ? "Job update failed." : "Job post failed.");
    }
  };

  const startEdit = (selectedJob) => {
    setEditingId(selectedJob.id);

    setJob({
      companyId: selectedJob.companyId || user?.id || 1,
      title: selectedJob.title || "",
      description: selectedJob.description || "",
      location: selectedJob.location || "",
      salary: selectedJob.salary || "",
      experience: selectedJob.experience || "",
      skillsRequired: selectedJob.skillsRequired || "",
      jobType: selectedJob.jobType || "FULL_TIME",
      active: selectedJob.active ?? true,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);
      setMsg("Job deleted successfully.");
      loadJobs();
    } catch {
      setMsg("Job delete failed.");
    }
  };

  const activeJobs = jobs.filter((j) => j.active).length;
  const inactiveJobs = jobs.filter((j) => !j.active).length;

  const hiringScore = useMemo(() => {
    if (jobs.length === 0) return 48;
    return Math.min(68 + activeJobs * 7 + jobs.length * 3, 96);
  }, [jobs.length, activeJobs]);

  const jobTypes = useMemo(() => {
    return {
      fullTime: jobs.filter((j) => j.jobType === "FULL_TIME").length,
      internship: jobs.filter((j) => j.jobType === "INTERNSHIP").length,
      remote: jobs.filter((j) => j.jobType === "REMOTE").length,
      partTime: jobs.filter((j) => j.jobType === "PART_TIME").length,
    };
  }, [jobs]);

  return (
    <DashboardLayout
      title="Company Hiring Panel"
      subtitle="Post jobs, manage active openings and track hiring performance from one SaaS workspace."
    >
      {msg && <p className="message">{msg}</p>}

      <section className="company-premium-hero">
        <div>
          <span className="company-hero-badge">🏢 Recruiter Command Center</span>

          <h1>Hire faster with a modern HR workspace.</h1>

          <p>
            Publish job openings, manage active roles, track hiring performance
            and keep your recruitment pipeline clean from one dashboard.
          </p>

          <div className="company-hero-actions">
            <a href="#post-job-form" className="btn">
              Post New Job
            </a>

            <a href="#posted-jobs" className="btn secondary">
              View Posted Jobs
            </a>
          </div>
        </div>

        <div className="company-score-card">
          <div className="company-score-ring" style={{ "--score": hiringScore }}>
            <span>{hiringScore}%</span>
          </div>

          <h3>Hiring Score</h3>
          <p>Based on active roles and recruitment activity</p>
        </div>
      </section>

      <section className="company-metric-grid">
        <div className="company-metric-card blue">
          <span>💼</span>
          <h2>{jobs.length}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="company-metric-card green">
          <span>✅</span>
          <h2>{activeJobs}</h2>
          <p>Active Jobs</p>
        </div>

        <div className="company-metric-card orange">
          <span>⏸️</span>
          <h2>{inactiveJobs}</h2>
          <p>Inactive Jobs</p>
        </div>

        <div className="company-metric-card purple">
          <span>🚀</span>
          <h2>{jobs.length > 0 ? "LIVE" : "NEW"}</h2>
          <p>Hiring Status</p>
        </div>
      </section>

      <section className="company-insight-grid">
        <div className="card company-insight-card">
          <div className="company-card-head">
            <div>
              <p className="eyebrow">Hiring Performance</p>
              <h2>Recruitment Health</h2>
            </div>

            <strong>{hiringScore}%</strong>
          </div>

          <div className="company-progress-track">
            <span style={{ width: `${hiringScore}%` }}></span>
          </div>

          <p>
            Keep jobs active and maintain clear job descriptions to attract
            better candidates.
          </p>
        </div>

        <div className="card company-insight-card">
          <div className="company-card-head">
            <div>
              <p className="eyebrow">Job Types</p>
              <h2>Opening Distribution</h2>
            </div>
          </div>

          <div className="company-type-grid">
            <div>
              <b>{jobTypes.fullTime}</b>
              <span>Full Time</span>
            </div>

            <div>
              <b>{jobTypes.internship}</b>
              <span>Internship</span>
            </div>

            <div>
              <b>{jobTypes.remote}</b>
              <span>Remote</span>
            </div>

            <div>
              <b>{jobTypes.partTime}</b>
              <span>Part Time</span>
            </div>
          </div>
        </div>
      </section>

      <section className="company-main-grid">
        <div className="card company-job-form-card" id="post-job-form">
          <div className="company-form-head">
            <div>
              <p className="eyebrow">
                {editingId ? "Update Opening" : "Create Opening"}
              </p>

              <h2>{editingId ? "Edit Job Details" : "Post New Job"}</h2>

              <p>
                Add clean job information so students can quickly understand
                role, skills, salary and work type.
              </p>
            </div>

            <span>{editingId ? "✏️" : "➕"}</span>
          </div>

          <form className="company-premium-form" onSubmit={saveJob}>
            <div className="company-form-grid">
              <div>
                <label>Job Title</label>
                <input
                  placeholder="Java Full Stack Developer"
                  value={job.title}
                  onChange={(e) => setJob({ ...job, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>Location</label>
                <input
                  placeholder="Lucknow / Remote / Bangalore"
                  value={job.location}
                  onChange={(e) => setJob({ ...job, location: e.target.value })}
                />
              </div>

              <div>
                <label>Salary</label>
                <input
                  placeholder="4 LPA - 8 LPA"
                  value={job.salary}
                  onChange={(e) => setJob({ ...job, salary: e.target.value })}
                />
              </div>

              <div>
                <label>Experience</label>
                <input
                  placeholder="0-2 Years"
                  value={job.experience}
                  onChange={(e) =>
                    setJob({ ...job, experience: e.target.value })
                  }
                />
              </div>
            </div>

            <label>Job Description</label>
            <textarea
              placeholder="Write responsibilities, requirements and role overview..."
              value={job.description}
              onChange={(e) =>
                setJob({ ...job, description: e.target.value })
              }
              required
            />

            <label>Skills Required</label>
            <input
              placeholder="Java, Spring Boot, React, MySQL"
              value={job.skillsRequired}
              onChange={(e) =>
                setJob({ ...job, skillsRequired: e.target.value })
              }
            />

            <div className="company-form-grid">
              <div>
                <label>Job Type</label>
                <select
                  value={job.jobType}
                  onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="REMOTE">Remote</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select
                  value={job.active ? "true" : "false"}
                  onChange={(e) =>
                    setJob({ ...job, active: e.target.value === "true" })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn" type="submit">
                {editingId ? "Update Job" : "Publish Job"}
              </button>

              {editingId && (
                <button
                  className="btn secondary"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card company-side-panel">
          <p className="eyebrow">Hiring Funnel</p>
          <h2>Pipeline Snapshot</h2>

          <div className="company-funnel">
            <div>
              <span>Published Jobs</span>
              <b>{jobs.length}</b>
              <i style={{ width: `${Math.min(jobs.length * 20, 100)}%` }}></i>
            </div>

            <div>
              <span>Active Roles</span>
              <b>{activeJobs}</b>
              <i style={{ width: `${Math.min(activeJobs * 25, 100)}%` }}></i>
            </div>

            <div>
              <span>Inactive Roles</span>
              <b>{inactiveJobs}</b>
              <i style={{ width: `${Math.min(inactiveJobs * 25, 100)}%` }}></i>
            </div>

            <div>
              <span>Profile Strength</span>
              <b>{hiringScore}%</b>
              <i style={{ width: `${hiringScore}%` }}></i>
            </div>
          </div>

          <div className="company-tip-card">
            <span>💡</span>
            <h3>Recruiter Tip</h3>
            <p>
              Jobs with clear skills, salary and experience details receive
              better student responses.
            </p>
          </div>
        </div>
      </section>

      <section className="card company-jobs-section" id="posted-jobs">
        <div className="company-section-head">
          <div>
            <p className="eyebrow">Posted Jobs</p>
            <h2>Manage Your Openings</h2>
          </div>

          <span>{jobs.length} Total Roles</span>
        </div>

        <div className="company-job-list">
          {jobs.map((j) => (
            <div className="company-job-card" key={j.id}>
              <div className="company-job-top">
                <div>
                  <span
                    className={`status-pill ${
                      j.active ? "selected" : "rejected"
                    }`}
                  >
                    {j.active ? "ACTIVE" : "INACTIVE"}
                  </span>

                  <h3>{j.title}</h3>

                  <p>
                    {j.location || "No location"} •{" "}
                    {j.salary || "No salary"} •{" "}
                    {j.experience || "Experience not added"}
                  </p>
                </div>

                <div className="company-job-icon">💼</div>
              </div>

              <p className="company-job-desc">
                {j.description || "No description added."}
              </p>

              <div className="company-skill-row">
                {(j.skillsRequired || "Skills not added")
                  .split(",")
                  .slice(0, 5)
                  .map((skill, index) => (
                    <span key={index}>{skill.trim()}</span>
                  ))}
              </div>

              <div className="company-job-footer">
                <span>{j.jobType || "FULL_TIME"}</span>

                <div className="table-actions">
                  <button className="btn small" onClick={() => startEdit(j)}>
                    Edit
                  </button>

                  <button
                    className="btn danger small"
                    onClick={() => deleteJob(j.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <div className="company-empty-state">
              <span>💼</span>
              <h3>No jobs posted yet</h3>
              <p>Create your first job opening and start receiving applicants.</p>
              <a href="#post-job-form" className="btn">
                Post First Job
              </a>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default CompanyDashboard;