import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function StudentPublicPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/profiles/student/public/${id}`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setStudent(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="card">
          <h2>Loading student profile...</h2>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="dashboard">
        <div className="card">
          <h2>Student profile not found</h2>
          <p>Check student user_id in database.</p>
        </div>
      </div>
    );
  }

  const skills = student.skills
    ? student.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="student-public-page">
      <section className="student-hero-public upgraded-student-hero">
        <div className="student-public-photo-wrap">
          {student.profilePhoto ? (
            <img
              src={student.profilePhoto}
              alt={student.fullName || "Student"}
              className="student-public-photo"
            />
          ) : (
            <div className="student-avatar-public">
              {student.fullName?.charAt(0) || "S"}
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow">Public Student Portfolio</p>

          <h1>{student.fullName || "Student"}</h1>

          <p>{student.bio || "Aspiring software developer."}</p>

          <div className="student-public-meta">
            <span>🎓 {student.college || "College not added"}</span>
            <span>📘 {student.degree || "Degree not added"}</span>
            <span>💼 {student.recommendedRole || "Software Developer"}</span>
          </div>

          <div className="public-profile-actions">
            {student.resumePath && (
              <a
                href={student.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                View Resume
              </a>
            )}

            {student.githubUrl && (
              <a
                href={student.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn secondary"
              >
                GitHub
              </a>
            )}

            {student.linkedinUrl && (
              <a
                href={student.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="btn secondary"
              >
                LinkedIn
              </a>
            )}

            {student.portfolioUrl && (
              <a
                href={student.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="btn secondary"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="company-public-stats">
        <div className="stat-card blue">
          <h2>{student.atsScore || 0}%</h2>
          <p>ATS Score</p>
        </div>

        <div className="stat-card green">
          <h2>{skills.length}</h2>
          <p>Skills</p>
        </div>

        <div className="stat-card orange">
          <h2>Open</h2>
          <p>Career Status</p>
        </div>

        <div className="stat-card purple">
          <h2>AI</h2>
          <p>Profile Level</p>
        </div>
      </section>

      <section className="dashboard">
        <div className="dashboard-grid">
          <div className="card">
            <h2>Skills</h2>

            <div className="skill-tags">
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}

              {skills.length === 0 && <p>No skills added yet.</p>}
            </div>
          </div>

          <div className="card">
            <h2>AI Career Summary</h2>

            <p>
              <b>Recommended Role:</b>{" "}
              {student.recommendedRole || "Software Developer"}
            </p>

            <p>
              <b>Missing Skills:</b>{" "}
              {student.missingSkills || "Run resume analyzer to detect skills."}
            </p>
          </div>
        </div>

        <div className="card section-card">
          <h2>AI Suggestions</h2>

          <p>
            {student.suggestions ||
              "Upload and analyze your resume to generate AI suggestions."}
          </p>
        </div>

        <div className="card section-card">
          <h2>Professional Links</h2>

          <div className="public-link-grid">
            {student.githubUrl && (
              <a href={student.githubUrl} target="_blank" rel="noreferrer">
                🚀 GitHub Profile
              </a>
            )}

            {student.linkedinUrl && (
              <a href={student.linkedinUrl} target="_blank" rel="noreferrer">
                💼 LinkedIn Profile
              </a>
            )}

            {student.portfolioUrl && (
              <a href={student.portfolioUrl} target="_blank" rel="noreferrer">
                🌐 Personal Portfolio
              </a>
            )}

            {student.resumePath && (
              <a href={student.resumePath} target="_blank" rel="noreferrer">
                📄 Download Resume
              </a>
            )}

            {!student.githubUrl &&
              !student.linkedinUrl &&
              !student.portfolioUrl &&
              !student.resumePath && <p>No professional links added yet.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentPublicPage;