import { useEffect, useMemo, useState } from "react";
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
    setMsg("Company approved successfully.");
    loadAll();
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete job?")) return;
    await API.delete(`/admin/jobs/${id}`);
    loadAll();
  };

  const pendingCompanies = users.filter(
    (u) => u.role === "COMPANY" && !u.approved
  );

  const activeUsers = users.filter((u) => u.active).length;
  const blockedUsers = users.filter((u) => !u.active).length;

  const studentPercent = data.totalUsers
    ? Math.round(((data.students || 0) / data.totalUsers) * 100)
    : 0;

  const platformHealth = useMemo(() => {
    let score = 70;

    if ((data.totalUsers || 0) > 0) score += 6;
    if ((data.jobs || 0) > 0) score += 7;
    if ((data.interviews || 0) > 0) score += 6;
    if ((data.placementOffers || 0) > 0) score += 6;
    if (pendingCompanies.length === 0) score += 5;

    return Math.min(score, 98);
  }, [data, pendingCompanies.length]);

  return (
    <DashboardLayout
      title="Admin Analytics Center"
      subtitle="Control users, companies, jobs, offers, approvals and placement analytics from one premium admin workspace."
    >
      {msg && <p className="message">{msg}</p>}

      <section className="admin-premium-hero">
        <div>
          <span className="admin-hero-badge">🛡️ Platform Control Center</span>
          <h1>Manage the complete CareerConnect ecosystem.</h1>
          <p>
            Monitor users, approve companies, manage jobs, publish offers,
            analyze placement performance and keep the platform healthy.
          </p>
        </div>

        <div className="admin-score-card">
          <div className="admin-score-ring" style={{ "--score": platformHealth }}>
            <span>{platformHealth}%</span>
          </div>

          <h3>Platform Health</h3>
          <p>System activity and approval status</p>
        </div>
      </section>

      <section className="admin-metric-grid">
        <div className="admin-metric-card blue">
          <span>👥</span>
          <h2>{data.totalUsers || 0}</h2>
          <p>Total Users</p>
        </div>

        <div className="admin-metric-card green">
          <span>🎓</span>
          <h2>{data.students || 0}</h2>
          <p>Students</p>
        </div>

        <div className="admin-metric-card orange">
          <span>🏢</span>
          <h2>{data.companies || 0}</h2>
          <p>Companies</p>
        </div>

        <div className="admin-metric-card purple">
          <span>💼</span>
          <h2>{data.jobs || 0}</h2>
          <p>Total Jobs</p>
        </div>
      </section>

      <section className="admin-metric-grid">
        <div className="admin-metric-card blue">
          <span>🎤</span>
          <h2>{data.interviews || 0}</h2>
          <p>Interviews</p>
        </div>

        <div className="admin-metric-card green">
          <span>🏆</span>
          <h2>{data.placementOffers || 0}</h2>
          <p>Placement Offers</p>
        </div>

        <div className="admin-metric-card orange">
          <span>✅</span>
          <h2>{data.acceptedOffers || 0}</h2>
          <p>Accepted Offers</p>
        </div>

        <div className="admin-metric-card purple">
          <span>📈</span>
          <h2>{data.placementRatio || 0}%</h2>
          <p>Placement Ratio</p>
        </div>
      </section>

      <section className="admin-insight-grid">
        <div className="card admin-insight-card">
          <div className="admin-card-head">
            <div>
              <p className="eyebrow">User Distribution</p>
              <h2>Student Ratio</h2>
            </div>
            <strong>{studentPercent}%</strong>
          </div>

          <div className="admin-donut-wrap">
            <div className="admin-donut" style={{ "--value": studentPercent }}>
              <span>{studentPercent}%</span>
            </div>

            <div className="admin-legend">
              <p>🎓 Students: {data.students || 0}</p>
              <p>🏢 Companies: {data.companies || 0}</p>
              <p>🛡️ Admin/Other: {(data.totalUsers || 0) - (data.students || 0) - (data.companies || 0)}</p>
            </div>
          </div>
        </div>

        <div className="card admin-insight-card">
          <div className="admin-card-head">
            <div>
              <p className="eyebrow">Placement Funnel</p>
              <h2>Recruitment Flow</h2>
            </div>
          </div>

          <div className="admin-funnel">
            <div>
              <span>Applications</span>
              <b>{data.applications || 0}</b>
              <i style={{ width: `${Math.min((data.applications || 1) * 18, 100)}%` }}></i>
            </div>

            <div>
              <span>Interviews</span>
              <b>{data.interviews || 0}</b>
              <i style={{ width: `${Math.min((data.interviews || 1) * 22, 100)}%` }}></i>
            </div>

            <div>
              <span>Offers</span>
              <b>{data.placementOffers || 0}</b>
              <i style={{ width: `${Math.min((data.placementOffers || 1) * 25, 100)}%` }}></i>
            </div>

            <div>
              <span>Accepted</span>
              <b>{data.acceptedOffers || 0}</b>
              <i style={{ width: `${Math.min((data.acceptedOffers || 1) * 30, 100)}%` }}></i>
            </div>
          </div>
        </div>

        <div className="card admin-insight-card">
          <div className="admin-card-head">
            <div>
              <p className="eyebrow">System Status</p>
              <h2>Platform Activity</h2>
            </div>
          </div>

          <div className="admin-health-list">
            <div>
              <span>🟢</span>
              <b>{activeUsers}</b>
              <p>Active Users</p>
            </div>

            <div>
              <span>🔴</span>
              <b>{blockedUsers}</b>
              <p>Blocked Users</p>
            </div>

            <div>
              <span>⏳</span>
              <b>{pendingCompanies.length}</b>
              <p>Pending Approvals</p>
            </div>
          </div>
        </div>
      </section>

      {pendingCompanies.length > 0 && (
        <section className="card admin-approval-section">
          <div className="admin-section-head">
            <div>
              <p className="eyebrow">Company Approval Center</p>
              <h2>Pending Company Requests</h2>
            </div>

            <span>{pendingCompanies.length} Pending</span>
          </div>

          <div className="admin-approval-grid">
            {pendingCompanies.map((company) => (
              <div className="admin-approval-card" key={company.id}>
                <div>
                  <span className="admin-company-avatar">
                    {company.fullName?.charAt(0) || "C"}
                  </span>

                  <h3>{company.fullName}</h3>
                  <p>{company.email}</p>
                </div>

                <button
                  className="btn"
                  onClick={() => approveCompany(company.id)}
                >
                  Approve Company
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="admin-main-grid">
        <div className="card admin-form-card">
          <div className="admin-form-head">
            <div>
              <p className="eyebrow">Offer CMS</p>
              <h2>{editingOfferId ? "Edit Offer / Slider" : "Create Offer / Slider"}</h2>
              <p>Publish offers, announcements and placement updates on the landing page.</p>
            </div>
            <span>🎁</span>
          </div>

          <form onSubmit={saveOffer} className="admin-premium-form">
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
                <button className="btn secondary" type="button" onClick={cancelOfferEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card admin-form-card">
          <div className="admin-form-head">
            <div>
              <p className="eyebrow">Job Control</p>
              <h2>Admin Job Editor</h2>
              <p>Select a job from the management table and update details from here.</p>
            </div>
            <span>💼</span>
          </div>

          <form onSubmit={updateJob} className="admin-premium-form">
            <input
              placeholder="Job title"
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
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
              onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
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
                <button className="btn secondary" type="button" onClick={cancelJobEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="card admin-list-section">
        <div className="admin-section-head">
          <div>
            <p className="eyebrow">Active Offers</p>
            <h2>Offer & Slider Management</h2>
          </div>
          <span>{offers.length} Offers</span>
        </div>

        <div className="admin-offer-grid">
          {offers.map((o) => (
            <div className="admin-offer-card" key={o.id}>
              <div>
                <span className={`status-pill ${o.active ? "selected" : "rejected"}`}>
                  {o.active ? "ACTIVE" : "INACTIVE"}
                </span>

                <h3>{o.title}</h3>
                <p>{o.description}</p>
                <b>{o.targetRole}</b>
              </div>

              <div className="table-actions">
                <button className="btn small" onClick={() => editOffer(o)}>
                  Edit
                </button>

                <button className="btn danger small" onClick={() => deleteOffer(o.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {offers.length === 0 && <p>No offers created yet.</p>}
        </div>
      </section>

      <section className="card section-card">
        <div className="admin-section-head">
          <div>
            <p className="eyebrow">Users</p>
            <h2>Users Management</h2>
          </div>
          <span>{users.length} Users</span>
        </div>

        <div className="table-wrap">
          <table className="table premium-admin-table">
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
                  <td>#{u.id}</td>
                  <td>
                    <b>{u.fullName}</b>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="status-pill">{u.role}</span>
                  </td>
                  <td>{u.active ? "Yes" : "No"}</td>
                  <td>{u.approved ? "Yes" : "No"}</td>

                  <td className="table-actions">
                    {!u.approved && u.role === "COMPANY" && (
                      <button className="btn small" onClick={() => approveCompany(u.id)}>
                        Approve
                      </button>
                    )}

                    {u.active ? (
                      <button className="btn secondary small" onClick={() => blockUser(u.id)}>
                        Block
                      </button>
                    ) : (
                      <button className="btn small" onClick={() => unblockUser(u.id)}>
                        Unblock
                      </button>
                    )}

                    <button className="btn danger small" onClick={() => deleteUser(u.id)}>
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
      </section>

      <section className="card section-card">
        <div className="admin-section-head">
          <div>
            <p className="eyebrow">Jobs</p>
            <h2>Jobs Management</h2>
          </div>
          <span>{jobs.length} Jobs</span>
        </div>

        <div className="table-wrap">
          <table className="table premium-admin-table">
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
                  <td>#{j.id}</td>
                  <td>
                    <b>{j.title}</b>
                  </td>
                  <td>{j.location || "Not added"}</td>
                  <td>{j.salary || "Not added"}</td>
                  <td>{j.jobType}</td>

                  <td>
                    <span className={`status-pill ${j.active ? "selected" : "rejected"}`}>
                      {j.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td className="table-actions">
                    <button className="btn small" onClick={() => editJob(j)}>
                      Edit
                    </button>

                    <button className="btn danger small" onClick={() => deleteJob(j.id)}>
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
      </section>
    </DashboardLayout>
  );
}

export default AdminDashboard;