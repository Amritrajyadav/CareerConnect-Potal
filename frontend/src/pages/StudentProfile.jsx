import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function StudentProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "",
    college: "",
    degree: "",
    skills: "",
    bio: "",
    resumePath: "",
    profilePhoto: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const publicProfileUrl = `${window.location.origin}/student-public/${
    user?.id || 1
  }`;

  const loadProfile = async () => {
    try {
      const res = await API.get(`/profiles/student/${user.id}`);
      setProfile(res.data);
    } catch {
      console.log("Profile not found");
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const payload = {
        ...profile,
        id: user.id,
        userId: user.id,
      };

      const res = await API.post("/profiles/student", payload);
      setProfile(res.data);
      setMsg("Profile saved successfully.");
    } catch {
      setMsg("Unable to save profile.");
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      setMsg("Please select resume.");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("file", resumeFile);

      const res = await API.post(
        `/profiles/student/${user.id}/resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(res.data);
      setMsg("Resume uploaded successfully.");
    } catch {
      setMsg("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) {
      setMsg("Please select profile photo.");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("file", photoFile);

      const res = await API.post(
        `/profiles/student/${user.id}/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(res.data);
      setMsg("Profile photo uploaded successfully.");
    } catch {
      setMsg("Photo upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyPublicLink = () => {
    navigator.clipboard.writeText(publicProfileUrl);
    setMsg("Public profile link copied.");
  };

  return (
    <DashboardLayout
      title="Student Profile"
      subtitle="Manage your profile, resume, social links and public portfolio."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="student-profile-preview card">
        <div className="profile-preview-left">
          <img
            src={
              profile.profilePhoto ||
              `https://ui-avatars.com/api/?name=${
                profile.fullName || "Student"
              }`
            }
            alt="profile"
            className="student-avatar"
          />

          <div>
            <h2>{profile.fullName || "Student Name"}</h2>
            <p>{profile.degree || "Degree"} • {profile.college || "College"}</p>
            <p>{profile.bio || "Add your professional bio."}</p>

            <div className="profile-socials">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}

              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}

              {profile.portfolioUrl && (
                <a href={profile.portfolioUrl} target="_blank" rel="noreferrer">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        <a href={publicProfileUrl} target="_blank" rel="noreferrer" className="btn">
          View Public Profile
        </a>
      </div>

      <div className="profile-grid">
        <div className="card section-card">
          <h2>Profile Information</h2>

          <form className="profile-form" onSubmit={saveProfile}>
            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input
                  value={profile.fullName || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label>College</label>
                <input
                  value={profile.college || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, college: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Degree</label>
                <input
                  value={profile.degree || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, degree: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Skills</label>
                <input
                  placeholder="Java, React, Spring Boot..."
                  value={profile.skills || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, skills: e.target.value })
                  }
                />
              </div>
            </div>

            <label>Bio</label>
            <textarea
              rows="5"
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
            />

            <div className="form-grid">
              <div>
                <label>GitHub URL</label>
                <input
                  placeholder="https://github.com/username"
                  value={profile.githubUrl || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, githubUrl: e.target.value })
                  }
                />
              </div>

              <div>
                <label>LinkedIn URL</label>
                <input
                  placeholder="https://linkedin.com/in/username"
                  value={profile.linkedinUrl || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, linkedinUrl: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Portfolio URL</label>
                <input
                  placeholder="https://yourportfolio.com"
                  value={profile.portfolioUrl || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, portfolioUrl: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="btn" type="submit">
              Save Profile
            </button>

            <div className="public-profile-box">
              <h4>Public Portfolio Link</h4>

              <input type="text" readOnly value={publicProfileUrl} />

              <div className="public-actions">
                <button type="button" onClick={copyPublicLink}>
                  Copy Link
                </button>

                <a href={publicProfileUrl} target="_blank" rel="noreferrer">
                  View Profile
                </a>
              </div>
            </div>
          </form>
        </div>

        <div className="card section-card">
          <h2>Profile Photo</h2>

          <div className="profile-photo-box">
            <img
              src={
                profile.profilePhoto ||
                `https://ui-avatars.com/api/?name=${
                  profile.fullName || "Student"
                }`
              }
              alt="profile"
              className="student-avatar"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />

            <button className="btn" onClick={uploadPhoto} disabled={loading}>
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>

          <hr className="soft-divider" />

          <h2>Resume Upload</h2>

          <div className="resume-upload-box">
            <div className="resume-icon">📄</div>

            <h3>Upload Resume PDF</h3>

            <p>
              Upload ATS-friendly resume for better job matching and AI analysis.
            </p>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />

            <button className="btn" onClick={uploadResume} disabled={loading}>
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

            {profile.resumePath && (
              <div className="resume-actions">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  View Resume
                </a>

                <a href={profile.resumePath} download className="btn-outline">
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentProfile;