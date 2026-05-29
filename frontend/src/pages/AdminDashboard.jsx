import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

function AdminDashboard() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [offers, setOffers] = useState([]);
  const [msg, setMsg] = useState("");

  const emptyOffer = {
    title: "",
    description: "",
    imageUrl: "",
    targetRole: "ALL",
    active: true,
  };

  const emptyJob = {
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    skillsRequired: "",
    jobType: "FULL_TIME",
    active: true,
  };

  const [offer, setOffer] = useState(emptyOffer);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);

  const loadAll = async () => {
    const dash = await API.get("/admin/dashboard");
    const usersRes = await API.get("/admin/users");
    const jobsRes = await API.get("/admin/jobs");
    const offersRes = await API.get("/offers/admin");

    setData(dash.data);
    setUsers(usersRes.data);
    setJobs(jobsRes.data);
    setOffers(offersRes.data);
  };

  useEffect(() => {
    loadAll().catch(() => {});
  }, []);

  const saveOffer = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      if (editingOfferId) {
        await API.put(`/offers/${editingOfferId}`, offer);
        setMsg("Offer updated successfully.");
      } else {
        await API.post("/offers", offer);
        setMsg("Offer created successfully.");
      }

      setOffer(emptyOffer);
      setEditingOfferId(null);
      loadAll();
    } catch {
      setMsg("Offer save failed.");
    }
  };

  const editOffer = (selectedOffer) => {
    setEditingOfferId(selectedOffer.id);
    setOffer({
      title: selectedOffer.title || "",
      description: selectedOffer.description || "",
      imageUrl: selectedOffer.imageUrl || "",
      targetRole: selectedOffer.targetRole || "ALL",
      active: selectedOffer.active ?? true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelOfferEdit = () => {
    setEditingOfferId(null);
    setOffer(emptyOffer);
  };

  const deleteOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;

    try {
      await API.delete(`/offers/${id}`);
      setMsg("Offer deleted successfully.");
      loadAll();
    } catch {
      setMsg("Offer delete failed.");
    }
  };

  const editJob = (selectedJob) => {
    setEditingJobId(selectedJob.id);
    setJobForm({
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

  const updateJob = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!editingJobId) {
      setMsg("Select a job to edit first.");
      return;
    }

    try {
      await API.put(`/admin/jobs/${editingJobId}`, jobForm);
      setMsg("Job updated successfully.");
      setEditingJobId(null);
      setJobForm(emptyJob);
      loadAll();
    } catch {
      setMsg("Job update failed.");
    }
  };

  const cancelJobEdit = () => {
    setEditingJobId(null);
    setJobForm(emptyJob);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await API.delete(`/admin/users/${id}`);
    loadAll();
  };

  const blockUser = async (id) => {
    await API.patch(`/admin/users/${id}/block`);
    loadAll();
  };

  const unblockUser = async (id) => {
    await API.patch(`/admin/users/${id}/unblock`);
    loadAll();
  };

  const approveCompany = async (id) => {
    await API.patch(`/admin/companies/${id}/approve`);
    loadAll();
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete job?")) return;
    await API.delete(`/admin/jobs/${id}`);
    loadAll();
  };

  const studentPercent = data.totalUsers
    ? Math.round(((data.students || 0) / data.totalUsers) * 100)
    : 0;

  return (
    <DashboardLayout
      title="Admin Analytics Center"
      subtitle="Monitor users, jobs, offers, interviews and placement analytics."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="stats">
        <div className="stat-card blue">
          <h2>{data.totalUsers || 0}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card green">
          <h2>{data.students || 0}</h2>
          <p>Students</p>
        </div>

        <div className="stat-card orange">
          <h2>{data.companies || 0}</h2>
          <p>Companies</p>
        </div>

        <div className="stat-card purple">
          <h2>{data.jobs || 0}</h2>
          <p>Jobs</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card blue">
          <h2>{data.interviews || 0}</h2>
          <p>Total Interviews</p>
        </div>

        <div className="stat-card green">
          <h2>{data.placementOffers || 0}</h2>
          <p>Placement Offers</p>
        </div>

        <div className="stat-card orange">
          <h2>{data.acceptedOffers || 0}</h2>
          <p>Accepted Offers</p>
        </div>

        <div className="stat-card purple">
          <h2>{data.placementRatio || 0}%</h2>
          <p>Placement Ratio</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="card analytics-card">
          <h2>User Distribution</h2>

          <div className="donut-wrap">
            <div className="donut-chart" style={{ "--value": studentPercent }}>
              <span>{studentPercent}%</span>
            </div>

            <div className="chart-legend">
              <p>
                <b className="dot blue-dot"></b> Students: {data.students || 0}
              </p>

              <p>
                <b className="dot green-dot"></b> Companies:{" "}
                {data.companies || 0}
              </p>

              <p>
                <b className="dot orange-dot"></b> Other/Admin:{" "}
                {(data.totalUsers || 0) -
                  (data.students || 0) -
                  (data.companies || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card analytics-card">
          <h2>Placement Funnel</h2>

          <div className="bar-list">
            <div>
              <span>Applications</span>
              <b
                style={{
                  width: `${Math.min((data.applications || 1) * 20, 100)}%`,
                }}
              ></b>
            </div>

            <div>
              <span>Interviews</span>
              <b
                style={{
                  width: `${Math.min((data.interviews || 1) * 22, 100)}%`,
                }}
              ></b>
            </div>

            <div>
              <span>Offers</span>
              <b
                style={{
                  width: `${Math.min((data.placementOffers || 1) * 25, 100)}%`,
                }}
              ></b>
            </div>

            <div>
              <span>Accepted</span>
              <b
                style={{
                  width: `${Math.min((data.acceptedOffers || 1) * 30, 100)}%`,
                }}
              ></b>
            </div>
          </div>
        </div>

        <div className="card analytics-card">
          <h2>Growth Summary</h2>

          <div className="growth-line">
            <span style={{ height: "40%" }}></span>
            <span style={{ height: "52%" }}></span>
            <span style={{ height: "48%" }}></span>
            <span style={{ height: "70%" }}></span>
            <span style={{ height: "76%" }}></span>
            <span style={{ height: "88%" }}></span>
          </div>

          <p className="muted">
            Placement analytics connected with interviews and accepted offers.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>
            {editingOfferId ? "Edit Offer / Slider" : "Create Offer / Slider"}
          </h2>

          <form onSubmit={saveOffer} className="pro-form">
            <input
              placeholder="Offer title"
              value={offer.title}
              onChange={(e) => setOffer({ ...offer, title: e.target.value })}
              required
            />

            <textarea
              placeholder="Offer description"
              value={offer.description}
              onChange={(e) =>
                setOffer({ ...offer, description: e.target.value })
              }
              required
            />

            <input
              placeholder="Image URL optional"
              value={offer.imageUrl}
              onChange={(e) =>
                setOffer({ ...offer, imageUrl: e.target.value })
              }
            />

            <select
              value={offer.targetRole}
              onChange={(e) =>
                setOffer({ ...offer, targetRole: e.target.value })
              }
            >
              <option value="ALL">All Users</option>
              <option value="STUDENT">Students</option>
              <option value="COMPANY">Companies</option>
            </select>

            <select
              value={offer.active ? "true" : "false"}
              onChange={(e) =>
                setOffer({ ...offer, active: e.target.value === "true" })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="form-actions">
              <button className="btn" type="submit">
                {editingOfferId ? "Update Offer" : "Add Offer"}
              </button>

              {editingOfferId && (
                <button
                  className="btn secondary"
                  type="button"
                  onClick={cancelOfferEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h2>Admin Job Editor</h2>

          <form onSubmit={updateJob} className="pro-form">
            <input
              placeholder="Job title"
              value={jobForm.title}
              onChange={(e) =>
                setJobForm({ ...jobForm, title: e.target.value })
              }
            />

            <textarea
              placeholder="Job description"
              value={jobForm.description}
              onChange={(e) =>
                setJobForm({ ...jobForm, description: e.target.value })
              }
            />

            <input
              placeholder="Location"
              value={jobForm.location}
              onChange={(e) =>
                setJobForm({ ...jobForm, location: e.target.value })
              }
            />

            <input
              placeholder="Salary"
              value={jobForm.salary}
              onChange={(e) =>
                setJobForm({ ...jobForm, salary: e.target.value })
              }
            />

            <input
              placeholder="Experience"
              value={jobForm.experience}
              onChange={(e) =>
                setJobForm({ ...jobForm, experience: e.target.value })
              }
            />

            <input
              placeholder="Skills Required"
              value={jobForm.skillsRequired}
              onChange={(e) =>
                setJobForm({ ...jobForm, skillsRequired: e.target.value })
              }
            />

            <select
              value={jobForm.jobType}
              onChange={(e) =>
                setJobForm({ ...jobForm, jobType: e.target.value })
              }
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="REMOTE">Remote</option>
            </select>

            <select
              value={jobForm.active ? "true" : "false"}
              onChange={(e) =>
                setJobForm({ ...jobForm, active: e.target.value === "true" })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="form-actions">
              <button className="btn" type="submit">
                {editingJobId ? "Update Job" : "Select Job From Table"}
              </button>

              {editingJobId && (
                <button
                  className="btn secondary"
                  type="button"
                  onClick={cancelJobEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card section-card">
        <h2>Active Offers</h2>

        <div className="mini-list">
          {offers.map((o) => (
            <div className="mini-row job-manage-row" key={o.id}>
              <div>
                <b>{o.title}</b>
                <p>{o.targetRole}</p>

                <span
                  className={`status-pill ${
                    o.active ? "selected" : "rejected"
                  }`}
                >
                  {o.active ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              <div className="table-actions">
                <button className="btn small" onClick={() => editOffer(o)}>
                  Edit
                </button>

                <button
                  className="btn danger small"
                  onClick={() => deleteOffer(o.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {offers.length === 0 && <p>No offers created yet.</p>}
        </div>
      </div>

      <div className="card section-card">
        <h2>Users Management</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="status-pill">{u.role}</span>
                  </td>
                  <td>{u.active ? "Yes" : "No"}</td>
                  <td>{u.approved ? "Yes" : "No"}</td>

                  <td className="table-actions">
                    {!u.approved && u.role === "COMPANY" && (
                      <button
                        className="btn small"
                        onClick={() => approveCompany(u.id)}
                      >
                        Approve
                      </button>
                    )}

                    {u.active ? (
                      <button
                        className="btn secondary small"
                        onClick={() => blockUser(u.id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="btn small"
                        onClick={() => unblockUser(u.id)}
                      >
                        Unblock
                      </button>
                    )}

                    <button
                      className="btn danger small"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="7">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card section-card">
        <h2>Jobs Management</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td>{j.id}</td>
                  <td>{j.title}</td>
                  <td>{j.location}</td>
                  <td>{j.salary}</td>
                  <td>{j.jobType}</td>

                  <td>
                    <span
                      className={`status-pill ${
                        j.active ? "selected" : "rejected"
                      }`}
                    >
                      {j.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td className="table-actions">
                    <button className="btn small" onClick={() => editJob(j)}>
                      Edit
                    </button>

                    <button
                      className="btn danger small"
                      onClick={() => deleteJob(j.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td colSpan="7">No jobs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;