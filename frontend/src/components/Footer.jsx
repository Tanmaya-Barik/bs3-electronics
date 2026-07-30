import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaTruck, FaUndo, FaRobot } from 'react-icons/fa';

const Footer = ({ onOpenKathaaAI }) => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        {/* TRUST BADGES ROW */}
        <div className="row text-center mb-5 border-bottom border-secondary pb-4">
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <FaTruck className="text-warning fs-3" />
              <div className="text-start">
                <h6 className="mb-0 fw-bold">Free Express Delivery</h6>
                <small className="text-muted">On orders above ₹1,000</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <FaUndo className="text-warning fs-3" />
              <div className="text-start">
                <h6 className="mb-0 fw-bold">7-Day Replacement</h6>
                <small className="text-muted">Hassle-free return policy</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <FaShieldAlt className="text-warning fs-3" />
              <div className="text-start">
                <h6 className="mb-0 fw-bold">1-Year Brand Warranty</h6>
                <small className="text-muted">On all electronics</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer" onClick={onOpenKathaaAI} style={{ cursor: 'pointer' }}>
              <FaRobot className="text-warning fs-3" />
              <div className="text-start">
                <h6 className="mb-0 fw-bold">KathaaAI Assistant</h6>
                <small className="text-warning">Ask AI anything 24/7</small>
              </div>
            </div>
          </div>
        </div>

        {/* LINKS ROW */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold text-warning mb-3">BS3 Electronics</h5>
            <p className="text-secondary small">
              India's Premier Online Electronics Store powered by Google Gemini AI. Discover next-generation Laptops, 5G Mobiles, Active Noise Cancelling Audio, and Smartwatches at unbeatable prices.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">ABOUT US</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">About BS3 Electronics</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">KathaaAI Shopping Assistant</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">Careers & Internships</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">Press & Media</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">HELP & SUPPORT</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">Contact Us</Link></li>
              <li className="mb-2"><Link to="/orders" className="text-secondary text-decoration-none">Track Order</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">Warranty Claim</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">7-Day Refund Policy</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">SHOP CATEGORIES</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/products?category=Laptops" className="text-secondary text-decoration-none">Laptops & Ultrabooks</Link></li>
              <li className="mb-2"><Link to="/products?category=Smartphones" className="text-secondary text-decoration-none">5G Smartphones</Link></li>
              <li className="mb-2"><Link to="/products?category=Audio" className="text-secondary text-decoration-none">Headphones & Earphones</Link></li>
              <li className="mb-2"><Link to="/products?category=Smartwatches" className="text-secondary text-decoration-none">Smartwatches</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">NEWSLETTER</h6>
            <p className="text-secondary small">Subscribe to get special discounts and early access to electronics drops.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to BS3 Electronics Newsletter!'); }}>
              <div className="input-group">
                <input type="email" className="form-control form-control-sm shadow-none" placeholder="Your email address" required />
                <button className="btn btn-warning btn-sm fw-bold text-dark" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        {/* COPYRIGHT ROW */}
        <div className="border-top border-secondary pt-3 text-center small text-secondary">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="mb-1 mb-md-0">
              © {new Date().getFullYear()} <strong>BS3 Electronics</strong>. Built for Final Year Submission. All Rights Reserved.
            </p>
            <p className="mb-0">
              AI Shopping Assistant powered by <span className="text-warning fw-semibold">Google Gemini API</span> (KathaaAI)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
