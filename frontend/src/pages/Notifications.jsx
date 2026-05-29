import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [msg, setMsg] = useState("");

  const loadNotifications = async () => {
    try {
      const res = await API.get(`/notifications/${user.id}`);
      setNotifications(res.data);
    } catch {
      setMsg("Unable to load notifications.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadNotifications();
    }
  }, [user?.id]);

  const markRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/read`);
      loadNotifications();
    } catch {
      setMsg("Unable to update notification.");
    }
  };

  return (
    <DashboardLayout
      title="Notification Center"
      subtitle="Track job applications, interview schedules, offers and platform updates."
    >
      {msg && <p className="message">{msg}</p>}

      <div className="stats">
        <div className="stat-card blue">
          <h2>{notifications.length}</h2>
          <p>Total Notifications</p>
        </div>

        <div className="stat-card green">
          <h2>{notifications.filter((n) => !n.readStatus).length}</h2>
          <p>Unread</p>
        </div>

        <div className="stat-card orange">
          <h2>{notifications.filter((n) => n.type === "OFFER").length}</h2>
          <p>Offers</p>
        </div>

        <div className="stat-card purple">
          <h2>{notifications.filter((n) => n.type === "STATUS_UPDATE").length}</h2>
          <p>Status Updates</p>
        </div>
      </div>

      <div className="card section-card">
        <h2>All Notifications</h2>

        <div className="notification-list-page">
          {notifications.map((n) => (
            <div
              className={`notification-row ${n.readStatus ? "read" : ""}`}
              key={n.id}
            >
              <div className="notification-icon">
                {n.type === "OFFER"
                  ? "🎁"
                  : n.type === "STATUS_UPDATE"
                  ? "📌"
                  : "🔔"}
              </div>

              <div className="notification-content">
                <div className="notification-head">
                  <h3>{n.title}</h3>
                  <span>{n.type}</span>
                </div>

                <p>{n.message}</p>

                <small>
                  {n.createdAt
                    ? new Date(n.createdAt).toLocaleString()
                    : "Just now"}
                </small>
              </div>

              {!n.readStatus && (
                <button className="btn small" onClick={() => markRead(n.id)}>
                  Mark Read
                </button>
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="empty-state">
              <h3>No notifications yet</h3>
              <p>You will see application and offer updates here.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Notifications;