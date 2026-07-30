import React from 'react';
import { FaRobot, FaDatabase, FaReact, FaServer, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-4">
      {/* HEADER BANNER */}
      <div className="bg-white p-5 rounded-3 shadow-sm border mb-4 text-center" style={{ background: 'linear-gradient(135deg, #2874f0, #1b5ccf)', color: '#fff' }}>
        <h1 className="fw-bold mb-2">About BS3 Electronics</h1>
        <p className="lead mb-0">
          India's Premier AI-Powered Online Electronics Shopping Platform
        </p>
        <small className="text-warning fw-semibold mt-2 d-block">
          College Final-Year Submission Project ⭐
        </small>
      </div>

      {/* ARCHITECTURE CARDS */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="bg-white p-4 rounded-3 shadow-sm border h-100 text-center">
            <FaDatabase className="text-success fs-1 mb-3" />
            <h5 className="fw-bold">MongoDB Atlas</h5>
            <p className="small text-muted mb-0">
              Cloud NoSQL database cluster storing user profiles, hashed passwords, product catalogs, and order history.
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="bg-white p-4 rounded-3 shadow-sm border h-100 text-center">
            <FaServer className="text-primary fs-1 mb-3" />
            <h5 className="fw-bold">Node.js & Express</h5>
            <p className="small text-muted mb-0">
              RESTful backend APIs with JWT authentication, Bcrypt security, and secure Google Gemini API communication.
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="bg-white p-4 rounded-3 shadow-sm border h-100 text-center">
            <FaReact className="text-info fs-1 mb-3" />
            <h5 className="fw-bold">React & Vite</h5>
            <p className="small text-muted mb-0">
              Flipkart-themed responsive frontend with Context state management (Auth/Cart) and modern UI micro-interactions.
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="bg-white p-4 rounded-3 shadow-sm border h-100 text-center">
            <FaRobot className="text-warning fs-1 mb-3" />
            <h5 className="fw-bold">KathaaAI (Gemini)</h5>
            <p className="small text-muted mb-0">
              Integrated AI Shopping Assistant widget providing 24/7 product recommendations, warranty and policy support.
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED PROJECT INFO */}
      <div className="bg-white p-5 rounded-3 shadow-sm border mb-4">
        <h4 className="fw-bold mb-3">Project Overview & Objectives</h4>
        <p className="text-secondary mb-4">
          <strong>BS3 Electronics</strong> was designed and developed as a complete, self-contained MERN Stack application. Unlike standard e-commerce websites that use external third-party widgets, BS3 Electronics embeds its custom AI shopping assistant, <strong>KathaaAI</strong>, directly within the React codebase.
        </p>

        <h5 className="fw-bold mb-3">Key Engineering Features</h5>
        <ul className="list-unstyled d-flex flex-column gap-3 text-secondary">
          <li className="d-flex align-items-start gap-2">
            <FaCheckCircle className="text-success mt-1" />
            <div>
              <strong>Secure Backend AI Proxy:</strong> The Google Gemini API Key is never exposed in frontend bundles. All chatbot queries pass through a secure Express endpoint (<code>/api/chat</code>) with intelligent fallback capabilities.
            </div>
          </li>
          <li className="d-flex align-items-start gap-2">
            <FaCheckCircle className="text-success mt-1" />
            <div>
              <strong>Interactive AI Product Cards:</strong> When KathaaAI recommends electronics, it renders interactive product cards with instant "Add to Cart" buttons directly inside the chat window.
            </div>
          </li>
          <li className="d-flex align-items-start gap-2">
            <FaCheckCircle className="text-success mt-1" />
            <div>
              <strong>Flipkart-Inspired Design System:</strong> Clean blue/yellow visual hierarchy, responsive sticky navigation, search filters, and smooth card animations.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
