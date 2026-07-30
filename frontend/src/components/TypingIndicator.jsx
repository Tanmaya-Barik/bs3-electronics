import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="kathaa-bubble-ai d-flex align-items-center gap-1 py-2 px-3">
      <span className="spinner-grow spinner-grow-sm text-primary" role="status" style={{ width: '8px', height: '8px' }}></span>
      <span className="spinner-grow spinner-grow-sm text-primary" role="status" style={{ width: '8px', height: '8px', animationDelay: '0.2s' }}></span>
      <span className="spinner-grow spinner-grow-sm text-primary" role="status" style={{ width: '8px', height: '8px', animationDelay: '0.4s' }}></span>
      <span className="small text-muted ms-2">KathaaAI is thinking...</span>
    </div>
  );
};

export default TypingIndicator;
