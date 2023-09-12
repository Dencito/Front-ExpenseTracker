import React, { useEffect, useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hola! \n Soy Expensi tu asistente virtual mucho gusto.
  <button>`)],
  botName: "Expensi 🤖",
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};
const DogPicture = () => {
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.message);
        });
    }, []);
  
    return (
      <div>
        <img src={imageUrl} alt='a dog' />
      </div>
    );
  };

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
      const botMessage = createChatBotMessage('Hola Isabella, como estas todo bien? 😍');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    const handleDog = () => {
        const botMessage = createChatBotMessage(
          "Here's a nice dog picture for you!",
          {
            widget: 'dogPicture',
          }
        );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };
  
    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            actions: {
              handleHello,
              handleDog,
            },
          });
        })}
      </div>
    );
  };

  const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        message = message.toLowerCase();
      if (message.includes('hola') ||  message.includes('hi')) {
        actions.handleHello();
      }
      if (message.includes('dog')) {
        actions.handleDog();
      }
    };
  
    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            parse: parse,
            actions,
          });
        })}
      </div>
    );
  };
  

export default { config, MessageParser, ActionProvider };