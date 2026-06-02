import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="/favicon.png"
              alt="CareerConnect"
              className="footer-logo-img"
            />
          </div>

          <h2>CareerConnect Pro</h2>

          <p>
            recruitment and placement platform connecting
            students, recruiters and administrators through a modern
            hiring ecosystem.
          </p>

          <div className="footer-socials">
            <a
              href="https://linkedin.com/in/amritrajyadav01"
              target="_blank"
              rel="noreferrer"
            >
              💼
            </a>

            <a
              href="https://github.com/Amritrajyadav"
              target="_blank"
              rel="noreferrer"
            >
              🐙
            </a>

            <a
              href="https://amritraj1-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              🌐
            </a>
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

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 CareerConnect Pro. All Rights Reserved.
        </p>

        <span>
            Contact: SUPPORT@CAREERCONNECTPROTAL.COM
          Amritrajyadav7@gmail.com
        </span>
      </div>
    </footer>
  );
}

export default Footer;