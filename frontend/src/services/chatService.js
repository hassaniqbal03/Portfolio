import api from './api';
import { chatbotKnowledge } from '../data/mockData';

export const sendChatMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message }, { timeout: 15000 });
    return response.data;
  } catch (error) {
    console.info('Express backend /api/chat not responding, using local fallback assistant engine');
    
    // Simulate thinking delay for realism
    await new Promise((resolve) => setTimeout(resolve, 600));

    const lower = message.toLowerCase().trim();
    let reply = "Thanks for reaching out! Muhammad Hassan Iqbal specializes in Full Stack Development with React, Next.js, Node.js, Express, and MySQL. Feel free to ask about his skills, projects, work experience, or use the Contact form to send a direct message.";

    for (const item of chatbotKnowledge) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        reply = item.answer;
        break;
      }
    }

    return {
      reply,
      isMock: true,
      timestamp: new Date().toISOString(),
    };
  }
};
