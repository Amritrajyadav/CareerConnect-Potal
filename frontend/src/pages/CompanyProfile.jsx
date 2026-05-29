import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function CompanyProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    userId: "",
    companyName: "",
    website: "",
    industry: "",
    description: "",
    location: "",
    logo: "",
    bannerImage: "",
    tagline: "",
    companySize: "",
    foundedYear: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);

  const companyId = profile?.id || user?.id || 1;
  const publicCompanyUrl = `${window.location.origin}/company-public/${companyId}`;

  const loadProfile = async () => {
    try {
      const res = await API.get(`/profiles/company/${user.id}`);
      setProfile(res.data);
    } catch {
      setProfile((old) => ({
        ...old,
        userId: user?.id || 1,
      }));
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
        userId: user?.id || profile.userId || 1,
      };

      const res = await API.post("/profiles/company", payload);
      setProfile(res.data);
      setMsg("Company profile saved successfully.");
    } catch {
      setMsg("Save failed.");
    }
  };

  const uploadLogo = async () => {
    if (!logoFile) {
      setMsg("Please select logo image.");
      return;
    }

    try {
      setLoadingLogo(true);
      setMsg("");

      const formData = new FormData();
      formData.append("file", logoFile);

      const res = await API.post(`/profiles/company/${companyId}/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data);
      setMsg("Logo uploaded successfully.");
    } catch {
      setMsg("Logo upload failed.");
    } finally {
      setLoadingLogo(false);
    }
  };

  const uploadBanner = async () => {
    if (!bannerFile) {
      setMsg("Please select banner image.");
      return;
    }

    try {
      setLoadingBanner(true);
      setMsg("");

      const formData = new FormData();
      formData.append("file", bannerFile);

      const res = await API.post(
        `/profiles/company/${companyId}/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(res.data);
      setMsg("Banner uploaded successfully.");
    } catch {
      setMsg("Banner upload failed.");
    } finally {
      setLoadingBanner(false);
    }
  };

  const copyPublicLink = () => {
    navigator.clipboard.writeText(publicCompanyUrl);
    setMsg("Public company page link copied.");
  };

  return (
    <DashboardLayout
      title="Company Branding"
      subtitle="Manage company profile, logo, banner and public hiring page."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="company-brand-preview">
        <div
          className="company-brand-banner"
          style={{
            backgroundImage: profile.bannerImage
              ? `linear-gradient(rgba(15,23,42,.55), rgba(15,23,42,.7)), url(${profile.bannerImage})`
              : "linear-gradient(135deg, #0f172a, #1d4ed8)",
          }}
        >
          <div className="company-brand-logo">
            {profile.logo ? (
              <img src={profile.logo} alt={profile.companyName || "Company"} />
            ) : (
              <span>{profile.companyName?.charAt(0) || "C"}</span>
            )}
          </div>

          <div>
            <p className="eyebrow">Company Public Branding</p>
            <h1>{profile.companyName || "Your Company Name"}</h1>
            <p>{profile.tagline || "Add a powerful company tagline here."}</p>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card section-card">
          <h2>Company Information</h2>

          <form className="profile-form" onSubmit={saveProfile}>
            <div className="form-grid">
              <div>
                <label>Company Name</label>
                <input
                  value={profile.companyName || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, companyName: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Website</label>
                <input
                  value={profile.website || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Industry</label>
                <input
                  value={profile.industry || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, industry: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Location</label>
                <input
                  value={profile.location || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Company Size</label>
                <input
                  placeholder="1-10, 50-100, 500+"
                  value={profile.companySize || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, companySize: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Founded Year</label>
                <input
                  placeholder="2024"
                  value={profile.foundedYear || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, foundedYear: e.target.value })
                  }
                />
              </div>
            </div>

            <label>Tagline</label>
            <input
              placeholder="Building the future of hiring..."
              value={profile.tagline || ""}
              onChange={(e) =>
                setProfile({ ...profile, tagline: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              rows="5"
              value={profile.description || ""}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
            />

            <button className="btn" type="submit">
              Save Company Profile
            </button>

            <div className="public-profile-box">
              <h4>Public Company Page</h4>

              <input type="text" readOnly value={publicCompanyUrl} />

              <div className="public-actions">
                <button type="button" onClick={copyPublicLink}>
                  Copy Link
                </button>

                <a href={publicCompanyUrl} target="_blank" rel="noreferrer">
                  View Public Page
                </a>
              </div>
            </div>
          </form>
        </div>

        <div className="card section-card">
          <h2>Brand Assets</h2>

          <div className="resume-upload-box">
            <div className="resume-icon">🏢</div>

            <h3>Upload Company Logo</h3>
            <p>Recommended: square image, PNG/JPG.</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
            />

            <button className="btn" onClick={uploadLogo} disabled={loadingLogo}>
              {loadingLogo ? "Uploading..." : "Upload Logo"}
            </button>

            {profile.logo && (
              <a
                href={profile.logo}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                View Logo
              </a>
            )}
          </div>

          <hr className="soft-divider" />

          <div className="resume-upload-box">
            <div className="resume-icon">🖼️</div>

            <h3>Upload Company Banner</h3>
            <p>Recommended: wide image for public company page cover.</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerFile(e.target.files[0])}
            />

            <button
              className="btn"
              onClick={uploadBanner}
              disabled={loadingBanner}
            >
              {loadingBanner ? "Uploading..." : "Upload Banner"}
            </button>

            {profile.bannerImage && (
              <a
                href={profile.bannerImage}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                View Banner
              </a>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CompanyProfile;