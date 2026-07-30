import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput = ({ onSend, loading }) => {
  const [text, setText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() && !loading) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <form onSubmit={handleSend} className="kathaa-input-box">
      <input
        type="text"
        className="kathaa-input-field shadow-none"
        placeholder="Ask KathaaAI about Laptops, Warranty, Delivery..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        type="submit"
        className="btn btn-bs3-blue rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: '40px', height: '40px', padding: 0 }}
        disabled={!text.trim() || loading}
        title="Send to KathaaAI"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default ChatInput;
