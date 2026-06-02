import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">
          Last Updated: June 2026
        </p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to CareerConnect. We respect your privacy and are
            committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and safeguard
            your data while using our recruitment and placement platform.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Student profile information</li>
            <li>Name, email address, and contact details</li>
            <li>Educational qualifications</li>
            <li>Resume and portfolio details</li>
            <li>Job applications and recruitment activities</li>
            <li>Company registration information</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use collected information to:
          </p>
          <ul>
            <li>Provide recruitment and placement services</li>
            <li>Match students with job opportunities</li>
            <li>Improve platform performance</li>
            <li>Communicate important updates</li>
            <li>Ensure platform security and compliance</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Protection</h2>
          <p>
            We implement appropriate security measures to protect user
            information from unauthorized access, disclosure, alteration,
            or destruction.
          </p>
        </section>

        <section>
          <h2>5. Sharing of Information</h2>
          <p>
            Student information may be shared with registered recruiters
            and companies solely for recruitment purposes. We do not sell
            personal information to third parties.
          </p>
        </section>

        <section>
          <h2>6. Cookies and Tracking</h2>
          <p>
            CareerConnect may use cookies and similar technologies to
            improve user experience and analyze platform usage.
          </p>
        </section>

        <section>
          <h2>7. User Rights</h2>
          <p>
            Users can update, modify, or request deletion of their
            account information subject to applicable regulations.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy,
            please contact the CareerConnect Administration Team.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;