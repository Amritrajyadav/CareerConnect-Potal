import { useState } from "react";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Submitted Successfully!");
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <span>📞 Contact CareerConnect</span>
        <h1>Let's Connect</h1>
        <p>
          Have questions about jobs, hiring, placements or partnerships?
          We'd love to hear from you.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="contact-card">
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>amritrajyadav7@gmail.com</p>
            </div>
          </div>

          <div className="contact-card">
            <span>📱</span>
            <div>
              <h4>Phone</h4>
              <p>+91 6393079517</p>
            </div>
          </div>

          <div className="contact-card">
            <span>📍</span>
            <div>
              <h4>Location</h4>
              <p>New Delhi, India</p>
            </div>
          </div>

          <div className="contact-card">
            <span>🌐</span>
            <div>
              <h4>Portfolio</h4>
              <a
                href="https://amritraj1-portfolio.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visit Portfolio
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            required
          />

          <textarea
            rows="6"
            placeholder="Write your message..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;