import React from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const FloatingChatButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`kathaa-float-btn d-none d-lg-flex align-items-center justify-content-center ${isOpen ? '' : 'kathaa-pulse'}`}
      aria-label="Toggle KathaaAI Shopping Assistant"
      title="Ask KathaaAI (Powered by Google Gemini)"
    >
      {isOpen ? (
        <FaTimes style={{ fontSize: '1.6rem' }} />
      ) : (
        <FaRobot style={{ fontSize: '1.8rem' }} />
      )}
    </button>
  );
};

export default FloatingChatButton;
