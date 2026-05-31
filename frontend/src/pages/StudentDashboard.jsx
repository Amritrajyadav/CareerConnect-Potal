import { useEffect, useMemo, useState } from "react";
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
        prev.map((offer) => (offer.id === id ? { ...offer, status } : offer))
      );

      setMsg(`Offer ${status.toLowerCase()} successfully.`);
    } catch {
      setMsg("Offer update failed.");
    }
  };

  const applicationInterviews = applications.filter((a) => a.interviewDate);
  const upcomingInterview = interviews[0] || null;
  const latestOffer = placementOffers[0] || null;

  const acceptedOffers = placementOffers.filter(
    (offer) => offer.status === "ACCEPTED"
  ).length;

  const pendingOffers = placementOffers.filter(
    (offer) => offer.status === "PENDING"
  ).length;

  const profileCompletion = useMemo(() => {
    let score = 40;

    if (applications.length > 0) score += 15;
    if (savedJobs.length > 0) score += 10;
    if (interviews.length > 0 || applicationInterviews.length > 0) score += 15;
    if (placementOffers.length > 0) score += 10;

    return Math.min(score, 95);
  }, [applications.length, savedJobs.length, interviews.length, placementOffers.length]);

  const resumeScore = Math.min(72 + applications.length * 3 + savedJobs.length * 2, 94);
  const jobMatchScore = Math.min(78 + savedJobs.length * 3 + applications.length * 2, 96);

  const timeline = [
    {
      title: "Profile Created",
      text: "Student workspace activated",
      done: true,
      icon: "👤",
    },
    {
      title: "Jobs Explored",
      text: `${savedJobs.length} saved jobs found`,
      done: savedJobs.length > 0,
      icon: "💼",
    },
    {
      title: "Applications Sent",
      text: `${applications.length} total applications`,
      done: applications.length > 0,
      icon: "📨",
    },
    {
      title: "Interview Stage",
      text: `${interviews.length || applicationInterviews.length} interviews tracked`,
      done: interviews.length > 0 || applicationInterviews.length > 0,
      icon: "🎯",
    },
    {
      title: "Offer Stage",
      text: `${placementOffers.length} offers received`,
      done: placementOffers.length > 0,
      icon: "🏆",
    },
  ];

  return (
    <DashboardLayout
      title={`Welcome, ${user?.fullName || "Student"}`}
      subtitle="Track your applications, interviews, offers, resume strength and career progress."
    >
      {msg && <p className="message">{msg}</p>}

      <section className="student-premium-hero">
        <div>
          <span className="student-hero-badge">🎓 Student Career Command Center</span>
          <h1>Build, apply, interview and get placed faster.</h1>
          <p>
            Your complete placement journey in one dashboard — powered by smart
            recommendations, ATS score, job tracking and interview updates.
          </p>

          <div className="student-hero-actions">
            <Link to="/jobs" className="btn">
              Explore Jobs
            </Link>
            <Link to="/resume-analyzer" className="btn secondary">
              Analyze Resume
            </Link>
          </div>
        </div>

        <div className="student-score-card">
          <div className="student-score-ring" style={{ "--score": resumeScore }}>
            <span>{resumeScore}%</span>
          </div>
          <h3>Resume Score</h3>
          <p>ATS-ready career profile</p>
        </div>
      </section>

      <section className="student-metric-grid">
        <div className="student-metric-card blue">
          <span>📄</span>
          <h2>{applications.length}</h2>
          <p>Total Applications</p>
        </div>

        <div className="student-metric-card green">
          <span>💾</span>
          <h2>{savedJobs.length}</h2>
          <p>Saved Jobs</p>
        </div>

        <div className="student-metric-card orange">
          <span>🎤</span>
          <h2>{interviews.length || applicationInterviews.length}</h2>
          <p>Interviews</p>
        </div>

        <div className="student-metric-card purple">
          <span>🏆</span>
          <h2>{placementOffers.length}</h2>
          <p>Placement Offers</p>
        </div>
      </section>

      <section className="student-insight-grid">
        <div className="card student-insight-card">
          <div className="student-card-head">
            <div>
              <p className="eyebrow">Career Readiness</p>
              <h2>Profile Completion</h2>
            </div>
            <strong>{profileCompletion}%</strong>
          </div>

          <div className="student-progress-track">
            <span style={{ width: `${profileCompletion}%` }}></span>
          </div>

          <p>
            Keep applying, saving jobs and updating your profile to improve your
            placement readiness score.
          </p>
        </div>

        <div className="card student-insight-card">
          <div className="student-card-head">
            <div>
              <p className="eyebrow">AI Match</p>
              <h2>Job Match Score</h2>
            </div>
            <strong>{jobMatchScore}%</strong>
          </div>

          <div className="student-progress-track green">
            <span style={{ width: `${jobMatchScore}%` }}></span>
          </div>

          <p>
            Based on your activity, saved jobs and applications across the
            platform.
          </p>
        </div>
      </section>

      {latestOffer && (
        <div className="card student-offer-banner">
          <div>
            <p className="eyebrow">Latest Placement Offer</p>
            <h2>{latestOffer.offerTitle}</h2>
            <p>{latestOffer.offerMessage}</p>

            <div className="offer-alert-meta">
              <span>💰 {latestOffer.packageAmount}</span>
              <span>📅 Joining: {latestOffer.joiningDate}</span>
              <span>📌 {latestOffer.status}</span>
            </div>

            {latestOffer.status === "PENDING" && (
              <div className="student-hero-actions">
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
        <div className="card student-interview-banner">
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
        <div className="card student-interview-banner">
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

      <section className="student-main-grid">
        <div className="card student-ai-card">
          <span className="student-hero-badge">🤖 AI Career Boost</span>
          <h2>Improve resume score and get stronger job matches.</h2>
          <p>
            Upload your resume, analyze ATS score, identify missing skills and
            prepare better for interviews.
          </p>

          <div className="student-hero-actions">
            <Link to="/student-profile" className="btn">
              Upload Resume
            </Link>

            <Link to="/resume-analyzer" className="btn secondary">
              AI Resume Analyzer
            </Link>
          </div>
        </div>

        <div className="card student-recommend-card">
          <p className="eyebrow">Smart Recommendations</p>
          <h2>Best Career Matches</h2>

          <div className="student-match-list">
            <div>
              <b>Java Full Stack Developer</b>
              <span>92%</span>
              <div><i style={{ width: "92%" }}></i></div>
            </div>

            <div>
              <b>React Frontend Developer</b>
              <span>84%</span>
              <div><i style={{ width: "84%" }}></i></div>
            </div>

            <div>
              <b>Spring Boot Intern</b>
              <span>79%</span>
              <div><i style={{ width: "79%" }}></i></div>
            </div>
          </div>
        </div>
      </section>

      <section className="student-main-grid">
        <div className="card">
          <p className="eyebrow">Career Journey</p>
          <h2>Placement Progress</h2>

          <div className="student-timeline">
            {timeline.map((item) => (
              <div className={item.done ? "done" : ""} key={item.title}>
                <span>{item.icon}</span>
                <div>
                  <b>{item.title}</b>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="eyebrow">Offers & Updates</p>
          <h2>Latest Announcements</h2>

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
      </section>

      <section className="student-main-grid">
        <div className="card">
          <p className="eyebrow">Saved Jobs</p>
          <h2>Your Job Watchlist</h2>

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

        <div className="card">
          <p className="eyebrow">Placement Summary</p>
          <h2>Offer Insights</h2>

          <div className="student-summary-list">
            <div>
              <span>🏆</span>
              <b>{placementOffers.length}</b>
              <p>Total Offers</p>
            </div>

            <div>
              <span>✅</span>
              <b>{acceptedOffers}</b>
              <p>Accepted Offers</p>
            </div>

            <div>
              <span>⏳</span>
              <b>{pendingOffers}</b>
              <p>Pending Offers</p>
            </div>
          </div>
        </div>
      </section>

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