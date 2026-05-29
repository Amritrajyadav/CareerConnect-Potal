import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [offers, setOffers] = useState([]);
  const [placementOffers, setPlacementOffers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [msg, setMsg] = useState("");

  const loadStudentData = () => {
    API.get("/offers")
      .then((res) => setOffers(res.data))
      .catch(() => {});

    API.get("/applications")
      .then((res) => {
        const mine = res.data.filter((a) => a.studentId === user?.id);
        setApplications(mine);
      })
      .catch(() => {});

    API.get(`/saved-jobs/${user?.id}`)
      .then((res) => setSavedJobs(res.data))
      .catch(() => {});

    API.get(`/interviews/student/${user?.id}`)
      .then((res) => setInterviews(res.data))
      .catch(() => setInterviews([]));

    API.get(`/placement-offers/student/${user?.id}`)
      .then((res) => setPlacementOffers(res.data))
      .catch(() => setPlacementOffers([]));
  };

  useEffect(() => {
    if (user?.id) {
      loadStudentData();
    }
  }, [user?.id]);

  const updateOfferStatus = async (id, status) => {
    try {
      await API.patch(`/placement-offers/${id}/status?status=${status}`);

      setPlacementOffers((prev) =>
        prev.map((offer) =>
          offer.id === id ? { ...offer, status } : offer
        )
      );

      setMsg(`Offer ${status.toLowerCase()} successfully.`);
    } catch {
      setMsg("Offer update failed.");
    }
  };

  const applicationInterviews = applications.filter((a) => a.interviewDate);
  const upcomingInterview = interviews[0] || null;
  const latestOffer = placementOffers[0] || null;

  return (
    <DashboardLayout
      title={`Welcome, ${user?.fullName || "Student"}`}
      subtitle="Track applications, interviews, offers, saved jobs and resume strength."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="stats">
        <div className="stat-card blue">
          <h2>{applications.length}</h2>
          <p>Total Applications</p>
        </div>

        <div className="stat-card green">
          <h2>{savedJobs.length}</h2>
          <p>Saved Jobs</p>
        </div>

        <div className="stat-card orange">
          <h2>{interviews.length || applicationInterviews.length}</h2>
          <p>Interviews</p>
        </div>

        <div className="stat-card purple">
          <h2>{placementOffers.length}</h2>
          <p>Offers</p>
        </div>
      </div>

      {latestOffer && (
        <div className="card offer-alert">
          <div>
            <p className="eyebrow">Placement Offer</p>
            <h2>{latestOffer.offerTitle}</h2>
            <p>{latestOffer.offerMessage}</p>

            <div className="offer-alert-meta">
              <span>💰 {latestOffer.packageAmount}</span>
              <span>📅 Joining: {latestOffer.joiningDate}</span>
              <span>📌 {latestOffer.status}</span>
            </div>

            {latestOffer.status === "PENDING" && (
              <div className="action-list">
                <button
                  className="btn"
                  onClick={() => updateOfferStatus(latestOffer.id, "ACCEPTED")}
                >
                  Accept Offer
                </button>

                <button
                  className="btn danger"
                  onClick={() => updateOfferStatus(latestOffer.id, "REJECTED")}
                >
                  Reject Offer
                </button>
              </div>
            )}
          </div>

          <span>🎉</span>
        </div>
      )}

      {upcomingInterview && (
        <div className="card interview-alert interview-pro-card">
          <div>
            <p className="eyebrow">Upcoming Interview</p>
            <h2>Your interview is scheduled</h2>

            <p>
              Application #{upcomingInterview.applicationId} for Job #
              {upcomingInterview.jobId}
            </p>

            <h3>{upcomingInterview.interviewDateTime}</h3>

            {upcomingInterview.hrNote && (
              <p>
                <b>HR Note:</b> {upcomingInterview.hrNote}
              </p>
            )}

            {upcomingInterview.meetingLink && (
              <a
                href={upcomingInterview.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                Join Meeting
              </a>
            )}

            <span className="status-pill selected">
              {upcomingInterview.status}
            </span>
          </div>

          <span>🎯</span>
        </div>
      )}

      {!upcomingInterview && applicationInterviews.length > 0 && (
        <div className="card interview-alert">
          <div>
            <p className="eyebrow">Upcoming Interview</p>
            <h2>Great! You have an interview scheduled</h2>
            <p>
              Application #{applicationInterviews[0].id} for Job #
              {applicationInterviews[0].jobId}
            </p>
            <h3>{applicationInterviews[0].interviewDate}</h3>
          </div>

          <span>🎯</span>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="card resume-upgrade-card">
          <h2>Resume & AI Career Boost</h2>
          <p>
            Upload your resume and analyze it with ATS scoring to improve job
            matching.
          </p>

          <div className="action-list">
            <Link to="/student-profile" className="btn">
              Upload Resume
            </Link>

            <Link to="/resume-analyzer" className="btn secondary">
              AI Resume Analyzer
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Smart Recommendations</h2>

          <div className="status-list">
            <span>🔥 Java Full Stack Developer — 92% Match</span>
            <span>🚀 React Developer — 84% Match</span>
            <span>📌 Spring Boot Intern — 79% Match</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Offers & Announcements</h2>

          <div className="offer-strip">
            {offers.length === 0 && <p>No offers available.</p>}

            {offers.slice(0, 3).map((offer) => (
              <div className="offer-mini" key={offer.id}>
                <b>{offer.title}</b>
                <p>{offer.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Saved Jobs</h2>

          <div className="mini-list">
            {savedJobs.length === 0 && <p>No saved jobs yet.</p>}

            {savedJobs.map((job) => (
              <div className="mini-row" key={job.id}>
                <div>
                  <b>Job ID #{job.jobId}</b>
                  <p>Saved for later application</p>
                </div>

                <span className="status-pill">SAVED</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card section-card">
        <h2>My Placement Offers</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Offer</th>
                <th>Application</th>
                <th>Package</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {placementOffers.map((offer) => (
                <tr key={offer.id}>
                  <td>
                    <b>{offer.offerTitle}</b>
                    <p>{offer.offerMessage}</p>
                  </td>

                  <td>#{offer.applicationId}</td>
                  <td>{offer.packageAmount}</td>
                  <td>{offer.joiningDate}</td>

                  <td>
                    <span
                      className={`status-pill ${
                        offer.status === "ACCEPTED"
                          ? "selected"
                          : offer.status === "REJECTED"
                          ? "rejected"
                          : ""
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>

                  <td>
                    {offer.status === "PENDING" ? (
                      <div className="table-actions">
                        <button
                          className="btn small"
                          onClick={() =>
                            updateOfferStatus(offer.id, "ACCEPTED")
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="btn danger small"
                          onClick={() =>
                            updateOfferStatus(offer.id, "REJECTED")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      "No action"
                    )}
                  </td>
                </tr>
              ))}

              {placementOffers.length === 0 && (
                <tr>
                  <td colSpan="6">No placement offers received yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card section-card">
        <h2>My Interviews</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Interview ID</th>
                <th>Application</th>
                <th>Job</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Meeting</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>#{item.applicationId}</td>
                  <td>#{item.jobId}</td>
                  <td>{item.interviewDateTime}</td>
                  <td>
                    <span className="status-pill selected">{item.status}</span>
                  </td>
                  <td>
                    {item.meetingLink ? (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-link"
                      >
                        Join
                      </a>
                    ) : (
                      "Not added"
                    )}
                  </td>
                </tr>
              ))}

              {interviews.length === 0 && (
                <tr>
                  <td colSpan="6">No interview records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card section-card">
        <h2>My Applications</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Job ID</th>
                <th>Status</th>
                <th>Interview</th>
                <th>Resume</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((a) => (
                <tr key={a.id}>
                  <td>#{a.id}</td>
                  <td>{a.jobId}</td>
                  <td>
                    <span className={`status-pill ${a.status?.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>{a.interviewDate || "Not scheduled"}</td>
                  <td>{a.resumePath || "Not uploaded"}</td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td colSpan="5">No applications yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;