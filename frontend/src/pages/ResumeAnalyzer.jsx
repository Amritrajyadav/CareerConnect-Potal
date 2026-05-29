import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

function ResumeAnalyzer() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [analysis, setAnalysis] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const loadAnalysis = async () => {
    try {
      const res = await API.get(`/resume-analysis/${user?.id}`);
      setAnalysis(res.data);
    } catch {
      setAnalysis([]);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  const analyzeResume = async () => {
    if (!resumeFile) {
      setMsg("Please upload PDF resume first.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      await API.post(
        `/resume-analysis/analyze-pdf/${user?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMsg("AI resume analysis completed successfully.");
      loadAnalysis();
    } catch {
      setMsg("Resume analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const latest = analysis[0];

  return (
    <DashboardLayout
      title="AI Resume Analyzer"
      subtitle="Upload PDF resume and get ATS score, missing skills and AI suggestions."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="dashboard-grid">
        <div className="card ai-upload-card">
          <div className="ai-badge">AI POWERED</div>

          <h2>Upload Resume PDF</h2>

          <p>
            Upload your latest resume PDF and our AI engine will analyze:
          </p>

          <ul className="feature-list">
            <li>ATS Score</li>
            <li>Missing Skills</li>
            <li>Keyword Optimization</li>
            <li>Role Recommendation</li>
            <li>Industry Suggestions</li>
          </ul>

          <div className="upload-box">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </div>

          {resumeFile && (
            <div className="file-preview">
              <span>📄</span>
              <p>{resumeFile.name}</p>
            </div>
          )}

          <button
            className="btn analyze-btn"
            onClick={analyzeResume}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        <div className="card ats-card">
          <h2>ATS Score</h2>

          {latest ? (
            <>
              <div className="ats-circle">
                <div className="ats-inner">
                  <h1>{latest.atsScore}%</h1>
                  <p>ATS</p>
                </div>
              </div>

              <div className="score-status">
                {latest.atsScore >= 85
                  ? "Excellent Resume"
                  : latest.atsScore >= 70
                  ? "Good Resume"
                  : "Needs Improvement"}
              </div>

              <div className="role-tag">
                Recommended Role: {latest.recommendedRole}
              </div>
            </>
          ) : (
            <div className="empty-analysis">
              <h3>No Analysis Yet</h3>
              <p>Upload your resume PDF to generate AI analysis.</p>
            </div>
          )}
        </div>
      </div>

      {latest && (
        <div className="dashboard-grid section-card">
          <div className="card">
            <h2>Missing Skills</h2>

            <div className="skill-tags">
              {latest.missingSkills
                ?.split(",")
                .map((skill, index) => (
                  <span key={index}>{skill.trim()}</span>
                ))}
            </div>
          </div>

          <div className="card">
            <h2>AI Suggestions</h2>

            <div className="suggestion-box">
              <p>{latest.suggestions}</p>
            </div>
          </div>
        </div>
      )}

      <div className="card section-card">
        <h2>Resume Analysis History</h2>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ATS Score</th>
                <th>Recommended Role</th>
                <th>Missing Skills</th>
              </tr>
            </thead>

            <tbody>
              {analysis.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>
                    <span className="score-pill">
                      {item.atsScore}%
                    </span>
                  </td>
                  <td>{item.recommendedRole}</td>
                  <td>{item.missingSkills}</td>
                </tr>
              ))}

              {analysis.length === 0 && (
                <tr>
                  <td colSpan="4">No analysis history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResumeAnalyzer;