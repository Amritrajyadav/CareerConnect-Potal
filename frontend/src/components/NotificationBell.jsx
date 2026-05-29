import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function NotificationBell() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    if (!user?.id) return;

    try {
      const countRes = await API.get(`/notifications/${user.id}/unread-count`);
      const listRes = await API.get(`/notifications/${user.id}`);

      setCount(countRes.data.count || 0);
      setNotifications(listRes.data);
    } catch {
      setCount(0);
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 15000);

    return () => clearInterval(interval);
  }, [user?.id]);

  const markRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/read`);
      loadNotifications();
    } catch {
      console.log("Notification read failed");
    }
  };

  if (!user) return null;

  return (
    <div className="notify-wrap">
      <button className="notify-btn" onClick={() => setOpen(!open)}>
        🔔
        {count > 0 && <span>{count}</span>}
      </button>

      {open && (
        <div className="notify-panel">
          <div className="notify-panel-head">
            <h3>Notifications</h3>
            <Link to="/notifications" onClick={() => setOpen(false)}>
              View All
            </Link>
          </div>

          {notifications.length === 0 && <p>No notifications yet.</p>}

          {notifications.slice(0, 6).map((n) => (
            <div
              className={`notify-item ${n.readStatus ? "read" : ""}`}
              key={n.id}
              onClick={() => markRead(n.id)}
            >
              <b>{n.title}</b>
              <p>{n.message}</p>
              <small>{n.type}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;