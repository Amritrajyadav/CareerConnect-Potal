import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <span>C</span>
          </div>

          <h2>CareerConnect Pro</h2>

          <p>
            recruitment and placement platform connecting
            students, recruiters and administrators through a modern
            hiring ecosystem.
          </p>

          <div className="footer-socials">
            <a href="#">🌐</a>
            <a href="#">💼</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Platform</h3>

          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-links">
          <h3>Resources</h3>

          <a href="#">Resume Builder</a>
          <a href="#">Interview Tips</a>
          <a href="#">Career Guidance</a>
          <a href="#">Placement Support</a>
        </div>

        <div className="footer-links">
          <h3>Company</h3>

          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 CareerConnect Pro. All Rights Reserved.
        </p>

        <span>
          Built with   using React + Spring Boot + MySQL
        </span>
      </div>
    </footer>
  );
}

export default Footer;