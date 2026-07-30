import React, { useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaTrashAlt, FaDownload } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

const KathaaAIWidget = ({ isOpen, onClose, messages, loading, onSend, onClear }) => {
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom on message or loading update
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  const handleDownloadTranscript = () => {
    let userName = 'Customer';
    let userEmail = '';
    try {
      const stored = localStorage.getItem('bs3_userInfo');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) userName = parsed.name;
        if (parsed.email) userEmail = parsed.email;
      }
    } catch (e) {}

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    let transcript = `Conversation with KathaaAI Bot\nStarted on ${dateStr} at ${timeStr}\n\n---\n\n`;

    messages.forEach(msg => {
      const msgTime = new Date(msg.timestamp || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const senderName = msg.sender === 'user' ? `${userName}${userEmail ? ` (${userEmail})` : ''}` : 'KathaaAI';
      transcript += `${msgTime} | ${senderName}: ${msg.text}\n\n`;
    });

    transcript += `---\nExported from BS3 Electronics on ${dateStr} at ${timeStr}\n`;

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kathaaAI_chat_transcript_${now.toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="kathaa-modal-window">
      {/* HEADER */}
      <div className="kathaa-header">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
            <FaRobot className="text-primary" />
          </div>
          <div>
            <h6 className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>KathaaAI</h6>
            <small className="d-block text-warning" style={{ fontSize: '0.7rem' }}>AI Shopping Assistant ⭐</small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* DOWNLOAD TRANSCRIPT */}
          <button
            onClick={handleDownloadTranscript}
            className="btn btn-sm btn-outline-light border-0"
            title="Download Chat Transcript (.txt)"
          >
            <FaDownload />
          </button>
          {/* CLEAR CHAT */}
          <button
            onClick={onClear}
            className="btn btn-sm btn-outline-light border-0"
            title="Clear Chat History"
          >
            <FaTrashAlt />
          </button>
          {/* CLOSE BUTTON */}

          <button
            onClick={onClose}
            className="btn btn-sm btn-outline-light border-0"
            title="Close Assistant"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="kathaa-chat-body">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onOptionClick={onSend} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      {/* BOTTOM INPUT */}
      <ChatInput onSend={onSend} loading={loading} />
    </div>
  );
};

export default KathaaAIWidget;
