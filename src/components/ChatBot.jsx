import React from 'react';
import Chatbot from 'react-chatbot-kit';
import configChatBot from './configChatBot';
import "./chatBot.css"
import 'react-chatbot-kit/build/main.css'

const ChatBotComponent = () => {


  return (
    <div className="chatbot-container">
      <Chatbot
        config={configChatBot.config}
        messageParser={configChatBot.MessageParser}
        actionProvider={configChatBot.ActionProvider}
      />
    </div>
  );
};

export default ChatBotComponent;