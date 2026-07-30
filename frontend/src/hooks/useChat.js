import { useState } from 'react';
import chatService from '../services/chatService';

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `👋 Hi there! Welcome to **BS3 Electronics**. How can I help today?\nSelect an option below to begin:`,
      timestamp: new Date(),
      options: [
        "📦 Order status, shipping & delivery info",
        "🏷️ Top discounts, deals & today's offers",
        "🔄 7-Day return, replacement & refund policy",
        "💳 No-Cost EMI, COD & payment methods",
        "🛡️ How to claim 1-year product warranty",
        "💻 Compare best laptops & specifications"
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'ai',
        text: `👋 Hi there! Welcome to **BS3 Electronics**. How can I help today?\nSelect an option below to begin:`,
        timestamp: new Date(),
        options: [
          "📦 Order status, shipping & delivery info",
          "🏷️ Top discounts, deals & today's offers",
          "🔄 7-Day return, replacement & refund policy",
          "💳 No-Cost EMI, COD & payment methods",
          "🛡️ How to claim 1-year product warranty",
          "💻 Compare best laptops & specifications"
        ]
      }
    ]);
  };

  const sendMessage = async (text) => {
    if (!text || !text.trim()) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      let userName = 'Customer';
      let userEmail = 'Anonymous Visitor';
      try {
        const stored = localStorage.getItem('bs3_userInfo');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.name) userName = parsed.name;
          if (parsed.email) userEmail = parsed.email;
        }
      } catch (e) {}

      const res = await chatService.sendChatMessage(text, messages, userName, userEmail);

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: res.reply || 'Sorry, I could not process your request at the moment.',
        timestamp: new Date(),
        options: res.options || [
          "🏷️ Show top discounted deals today",
          "💻 Compare bestselling laptops",
          "📞 Contact customer support team",
          "🔄 Explain return & refund policy"
        ]
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: 'ai-err-' + Date.now(),
        sender: 'ai',
        text: '⚠️ Network connection issue. Please check your backend connection or ask again shortly!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return {
    isOpen,
    toggleChat,
    messages,
    loading,
    sendMessage,
    clearChat
  };
};

export default useChat;
