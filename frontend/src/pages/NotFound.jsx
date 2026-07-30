import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="py-5 my-5 text-center max-w-lg mx-auto" style={{ maxWidth: '580px' }}>
      <FaExclamationTriangle className="text-warning display-1 mb-3" />
      <h1 className="fw-bold mb-2">404 — Page Not Found</h1>
      <p className="text-secondary small mb-4">
        Oops! The page you are looking for does not exist on BS3 Electronics. It might have been moved or deleted.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/" className="btn btn-bs3-blue px-4">
          Return to Store Home
        </Link>
        <Link to="/products" className="btn btn-outline-secondary px-4">
          Browse Electronics
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
