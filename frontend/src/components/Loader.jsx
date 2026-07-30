import React from 'react';

const Loader = ({ text = 'Loading BS3 Electronics...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
      <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-secondary fw-semibold">{text}</p>
    </div>
  );
};

export default Loader;
