import React, { useState, useContext, useEffect } from 'react';
import { FaRobot, FaUser, FaCopy, FaCheck, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import api from '../services/api';

const ChatMessage = ({ message, onOptionClick }) => {
  const [copied, setCopied] = useState(false);
  const [referencedProducts, setReferencedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const isAi = message.sender === 'ai';

  // Extract [ID] tags from message text
  useEffect(() => {
    if (isAi && message.text) {
      const matches = [...message.text.matchAll(/\[(bs3-[a-zA-Z0-9-]+)\]/g)];
      if (matches.length > 0) {
        const ids = [...new Set(matches.map(m => m[1]))];
        // Fetch product info
        Promise.all(
          ids.map(id => api.get(`/products/${id}`).then(res => res.data).catch(() => null))
        ).then(products => {
          setReferencedProducts(products.filter(Boolean));
        });
      }
    }
  }, [isAi, message.text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text.replace(/\[bs3-[a-zA-Z0-9-]+\]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format basic markdown (bold, bullet points)
  const formatText = (text) => {
    let clean = text.replace(/\[(bs3-[a-zA-Z0-9-]+)\]/g, '');
    const lines = clean.split('\n');
    return lines.map((line, idx) => {
      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={idx} className="d-flex align-items-start gap-2 mb-1">
            <span className="text-primary fw-bold">•</span>
            <span>{renderBold(line.replace(/^[•*\-]\s*/, ''))}</span>
          </div>
        );
      }
      return <p key={idx} className="mb-2">{renderBold(line)}</p>;
    });
  };

  const renderBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`d-flex flex-column ${isAi ? 'align-items-start' : 'align-items-end'} mb-3 w-100`}>
      <div className="d-flex align-items-center gap-1 mb-1 px-1">
        {isAi ? (
          <>
            <FaRobot className="text-primary small" />
            <span className="small fw-bold text-primary" style={{ fontSize: '0.75rem' }}>KathaaAI • AI Assistant</span>
          </>
        ) : (
          <>
            <span className="small fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>You</span>
            <FaUser className="text-secondary small" />
          </>
        )}
      </div>

      <div className={isAi ? 'kathaa-bubble-ai position-relative' : 'kathaa-bubble-user'}>
        <div className="message-content">
          {formatText(message.text)}
        </div>

        {/* COPY RESPONSE BUTTON */}
        {isAi && (
          <div className="d-flex justify-content-end mt-1 border-top pt-1">
            <button
              onClick={handleCopy}
              className="btn btn-link btn-sm p-0 text-secondary text-decoration-none d-flex align-items-center gap-1"
              style={{ fontSize: '0.75rem' }}
              title="Copy response"
            >
              {copied ? <FaCheck className="text-success" /> : <FaCopy />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

        {/* INTERACTIVE REFERENCED PRODUCT CARDS */}
        {isAi && referencedProducts.length > 0 && (
          <div className="mt-3 pt-2 border-top d-flex flex-column gap-2">
            <span className="small fw-bold text-primary" style={{ fontSize: '0.75rem' }}>
              RECOMMENDED FOR YOU:
            </span>
            {referencedProducts.map(prod => (
              <div
                key={prod.id}
                className="d-flex align-items-center justify-content-between p-2 rounded-2 bg-light border"
              >
                <div className="d-flex align-items-center gap-2 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                  <div className="text-truncate">
                    <div className="fw-bold small text-truncate" style={{ maxWidth: '160px' }}>
                      {prod.name}
                    </div>
                    <div className="text-success fw-bold" style={{ fontSize: '0.8rem' }}>
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(prod, 1)}
                  className="btn btn-sm btn-bs3-yellow d-flex align-items-center gap-1 py-1 px-2"
                  style={{ fontSize: '0.75rem' }}
                >
                  <FaShoppingCart />
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INTERACTIVE QUICK REPLY PILL OPTIONS (EXACTLY LIKE MODERN AI CHATBOT UI) */}
      {isAi && message.options && message.options.length > 0 && (
        <div className="kathaa-options-container">
          {message.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onOptionClick && onOptionClick(opt)}
              className="kathaa-option-chip"
              title={opt}
            >
              <span>{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
