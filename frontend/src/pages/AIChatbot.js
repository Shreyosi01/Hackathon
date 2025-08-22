import React from 'react';
import './AIChatbot.css';
import { FaRobot } from 'react-icons/fa';

export default function AIChatbot() {
  return (
    <div className="ai-chatbot-root">
      <div className="ai-chatbot-header">
        <FaRobot size={32} style={{marginRight: 8}} /> AI Chatbot
      </div>
      <div className="ai-chatbot-body">
        <p>Welcome! How can I help you today?</p>
        {/* Chat UI would go here */}
      </div>
    </div>
  );
}
