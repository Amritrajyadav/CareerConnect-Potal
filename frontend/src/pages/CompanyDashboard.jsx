import { useEffect, useState } from "react";
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

  return (
    <DashboardLayout
      title="Company Hiring Panel"
      subtitle="Post, edit, delete and manage active jobs from one place."
    >
      <div className="stats">
        <div className="stat-card blue">
          <h2>{jobs.length}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card green">
          <h2>{jobs.filter((j) => j.active).length}</h2>
          <p>Active Jobs</p>
        </div>

        <div className="stat-card orange">
          <h2>{jobs.filter((j) => !j.active).length}</h2>
          <p>Inactive Jobs</p>
        </div>

        <div className="stat-card purple">
          <h2>HR</h2>
          <p>Control Panel</p>
        </div>
      </div>

      {msg && <p className="message">{msg}</p>}

      <div className="dashboard-grid">
        <div className="card">
          <h2>{editingId ? "Edit Job" : "Post New Job"}</h2>

          <form className="pro-form" onSubmit={saveJob}>
            <input
              placeholder="Job Title"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              required
            />

            <textarea
              placeholder="Job Description"
              value={job.description}
              onChange={(e) =>
                setJob({ ...job, description: e.target.value })
              }
              required
            />

            <input
              placeholder="Location"
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
            />

            <input
              placeholder="Salary"
              value={job.salary}
              onChange={(e) => setJob({ ...job, salary: e.target.value })}
            />

            <input
              placeholder="Experience"
              value={job.experience}
              onChange={(e) => setJob({ ...job, experience: e.target.value })}
            />

            <input
              placeholder="Skills Required"
              value={job.skillsRequired}
              onChange={(e) =>
                setJob({ ...job, skillsRequired: e.target.value })
              }
            />

            <select
              value={job.jobType}
              onChange={(e) => setJob({ ...job, jobType: e.target.value })}
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="REMOTE">Remote</option>
            </select>

            <select
              value={job.active ? "true" : "false"}
              onChange={(e) =>
                setJob({ ...job, active: e.target.value === "true" })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

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

        <div className="card">
          <h2>My Posted Jobs</h2>

          <div className="mini-list">
            {jobs.map((j) => (
              <div className="mini-row job-manage-row" key={j.id}>
                <div>
                  <b>{j.title}</b>
                  <p>
                    {j.location || "No location"} • {j.salary || "No salary"}
                  </p>
                  <span className={`status-pill ${j.active ? "selected" : "rejected"}`}>
                    {j.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>

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
            ))}

            {jobs.length === 0 && <p>No jobs posted yet.</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CompanyDashboard;