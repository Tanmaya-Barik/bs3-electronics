import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaRobot, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-4">
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-4">
        <h3 className="fw-bold mb-1">Contact BS3 Electronics Support</h3>
        <p className="text-secondary small mb-0">
          We are here to help you with orders, warranty claims, and technical inquiries.
        </p>
      </div>

      <div className="row g-4">
        {/* LEFT SUPPORT INFO */}
        <div className="col-lg-5">
          <div className="bg-white p-4 rounded-3 shadow-sm border h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold mb-4">Customer Care Support</h5>

              <div className="d-flex align-items-start gap-3 mb-4">
                <FaPhone className="text-primary fs-4 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Helpline Phone</h6>
                  <p className="text-muted small mb-0">1800-202-9898 (Toll Free)</p>
                  <small className="text-secondary">Mon - Sat, 10:00 AM - 8:00 PM IST</small>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <FaEnvelope className="text-primary fs-4 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Support Email</h6>
                  <p className="text-muted small mb-0">support@bs3electronics.in</p>
                  <small className="text-secondary">Response within 24 hours</small>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <FaMapMarkerAlt className="text-primary fs-4 mt-1" />
                <div>
                  <h6 className="fw-bold mb-1">Corporate Office</h6>
                  <p className="text-muted small mb-0">BS3 Tech Towers, Cyber City, Bangalore - 560100</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-light rounded-3 border">
              <h6 className="fw-bold small mb-1 d-flex align-items-center gap-2">
                <FaRobot className="text-primary" /> Need Instant Help?
              </h6>
              <p className="text-secondary small mb-0">
                Ask <strong>KathaaAI</strong> in the bottom right corner for immediate answers to refund, delivery, and warranty questions!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTACT FORM */}
        <div className="col-lg-7">
          <div className="bg-white p-4 p-md-5 rounded-3 shadow-sm border">
            <h5 className="fw-bold mb-3">Send Us a Message</h5>

            {submitted && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2 small" role="alert">
                <FaCheckCircle />
                <span>Thank you! Your inquiry has been received by BS3 Electronics support.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Your Full Name</label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control shadow-none"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Subject</label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  required
                  placeholder="Order Inquiry / Warranty Claim / College Project"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Message Details</label>
                <textarea
                  className="form-control shadow-none"
                  rows="4"
                  required
                  placeholder="Describe your inquiry or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-bs3-blue w-100 py-2 fw-bold">
                Send Support Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
