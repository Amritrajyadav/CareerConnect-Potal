import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";

function Applicants() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [applications, setApplications] = useState([]);
  const [showInterviewBox, setShowInterviewBox] = useState(false);
  const [showOfferBox, setShowOfferBox] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [msg, setMsg] = useState("");

  const [interview, setInterview] = useState({
    interviewDateTime: "",
    meetingLink: "",
    hrNote: "",
  });

  const [placementOffer, setPlacementOffer] = useState({
    offerTitle: "",
    packageAmount: "",
    joiningDate: "",
    offerMessage: "",
  });

  const loadApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch {
      setMsg("Unable to load applications.");
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/applications/${id}/status?status=${status}`);
      setMsg("Application status updated.");
      loadApplications();
    } catch {
      setMsg("Status update failed.");
    }
  };

  const scheduleInterview = async () => {
    if (!selectedApplication) return;

    try {
      await API.post("/interviews/schedule", {
        applicationId: selectedApplication.id,
        companyId: selectedApplication.companyId || user?.id || 1,
        interviewDateTime: interview.interviewDateTime,
        meetingLink: interview.meetingLink,
        hrNote: interview.hrNote,
      });

      setMsg("Interview scheduled successfully.");
      setShowInterviewBox(false);
      setSelectedApplication(null);
      setInterview({
        interviewDateTime: "",
        meetingLink: "",
        hrNote: "",
      });

      loadApplications();
    } catch {
      setMsg("Interview scheduling failed.");
    }
  };

  const sendPlacementOffer = async () => {
    if (!selectedApplication) return;

    try {
      await API.post("/placement-offers/send", {
        applicationId: selectedApplication.id,
        companyId: selectedApplication.companyId || user?.id || 1,
        offerTitle: placementOffer.offerTitle,
        packageAmount: placementOffer.packageAmount,
        joiningDate: placementOffer.joiningDate,
        offerMessage: placementOffer.offerMessage,
      });

      setMsg("Offer letter sent successfully.");
      setShowOfferBox(false);
      setSelectedApplication(null);
      setPlacementOffer({
        offerTitle: "",
        packageAmount: "",
        joiningDate: "",
        offerMessage: "",
      });

      loadApplications();
    } catch {
      setMsg("Offer letter sending failed.");
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await API.delete(`/applications/${id}`);
      setMsg("Application deleted.");
      loadApplications();
    } catch {
      setMsg("Delete failed.");
    }
  };

  return (
    <DashboardLayout
      title="Applicants Management"
      subtitle="Review applications, schedule interviews and send offer letters."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="stats">
        <div className="stat-card blue">
          <h2>{applications.length}</h2>
          <p>Total Applicants</p>
        </div>

        <div className="stat-card green">
          <h2>{applications.filter((a) => a.status === "SHORTLISTED").length}</h2>
          <p>Shortlisted</p>
        </div>

        <div className="stat-card orange">
          <h2>{applications.filter((a) => a.interviewDate).length}</h2>
          <p>Interviews</p>
        </div>

        <div className="stat-card purple">
          <h2>{applications.filter((a) => a.status === "SELECTED").length}</h2>
          <p>Selected</p>
        </div>
      </div>

      <div className="card section-card">
        <h2>Applicant Pipeline</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Job</th>
                <th>Status</th>
                <th>Interview</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>#{app.id}</td>

                  <td>
                    {app.student?.fullName ||
                      app.student?.email ||
                      `Student #${app.studentId}`}
                  </td>

                  <td>{app.job?.title || `Job #${app.jobId}`}</td>

                  <td>
                    <span className={`status-pill ${app.status?.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>

                  <td>{app.interviewDate || "Not scheduled"}</td>

                  <td>
                    {app.resumePath ? (
                      <a
                        href={app.resumePath}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-link"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="btn small"
                        onClick={() => updateStatus(app.id, "SHORTLISTED")}
                      >
                        Shortlist
                      </button>

                      <button
                        className="btn secondary small"
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowInterviewBox(true);
                        }}
                      >
                        Schedule
                      </button>

                      <button
                        className="btn small"
                        onClick={() => updateStatus(app.id, "SELECTED")}
                      >
                        Select
                      </button>

                      <button
                        className="btn small"
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowOfferBox(true);
                        }}
                      >
                        Send Offer
                      </button>

                      <button
                        className="btn danger small"
                        onClick={() => deleteApplication(app.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td colSpan="7">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showInterviewBox && (
        <div className="interview-modal">
          <div className="interview-card">
            <h2>Schedule Interview</h2>

            <p>
              Application #{selectedApplication?.id} — Student #
              {selectedApplication?.studentId}
            </p>

            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={interview.interviewDateTime}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  interviewDateTime: e.target.value,
                })
              }
            />

            <label>Meeting Link</label>
            <input
              placeholder="Google Meet / Zoom Link"
              value={interview.meetingLink}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  meetingLink: e.target.value,
                })
              }
            />

            <label>HR Note</label>
            <textarea
              placeholder="Interview instructions..."
              value={interview.hrNote}
              onChange={(e) =>
                setInterview({
                  ...interview,
                  hrNote: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button className="btn" onClick={scheduleInterview}>
                Schedule Interview
              </button>

              <button
                className="btn secondary"
                onClick={() => setShowInterviewBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showOfferBox && (
        <div className="interview-modal">
          <div className="interview-card">
            <h2>Send Offer Letter</h2>

            <p>
              Application #{selectedApplication?.id} — Student #
              {selectedApplication?.studentId}
            </p>

            <label>Offer Title</label>
            <input
              placeholder="Java Full Stack Developer Offer"
              value={placementOffer.offerTitle}
              onChange={(e) =>
                setPlacementOffer({
                  ...placementOffer,
                  offerTitle: e.target.value,
                })
              }
            />

            <label>Package Amount</label>
            <input
              placeholder="4.5 LPA"
              value={placementOffer.packageAmount}
              onChange={(e) =>
                setPlacementOffer({
                  ...placementOffer,
                  packageAmount: e.target.value,
                })
              }
            />

            <label>Joining Date</label>
            <input
              type="date"
              value={placementOffer.joiningDate}
              onChange={(e) =>
                setPlacementOffer({
                  ...placementOffer,
                  joiningDate: e.target.value,
                })
              }
            />

            <label>Offer Message</label>
            <textarea
              placeholder="Congratulations! We are pleased to offer you..."
              value={placementOffer.offerMessage}
              onChange={(e) =>
                setPlacementOffer({
                  ...placementOffer,
                  offerMessage: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button className="btn" onClick={sendPlacementOffer}>
                Send Offer
              </button>

              <button
                className="btn secondary"
                onClick={() => setShowOfferBox(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Applicants;