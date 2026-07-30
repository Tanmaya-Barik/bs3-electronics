import api from './api';

const sendChatMessage = async (message, chatHistory = [], userName = 'Customer', userEmail = 'Anonymous Visitor') => {
  try {
    const response = await api.post('/chat', {
      message,
      chatHistory,
      userName,
      userEmail
    });
    return response.data;
  } catch (error) {
    console.error('KathaaAI Chat Service Error:', error);
    throw error;
  }
};

export default {
  sendChatMessage
};
