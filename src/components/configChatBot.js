import React, { useEffect, useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const user = "Denar"

const config = {
  initialMessages: [createChatBotMessage(`Hola! Soy Expensi tu asistente virtual mucho gusto.`)],
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
      widgetName: 'resumenGraph',
      widgetFunc: (props) => <ResumenGraph {...props} />,
    },
  ],
};
const ResumenGraph = () => {
  return (
    <img src="https://www.tibco.com/sites/tibco/files/media_entity/2022-01/PieChart-01.svg" width="100%" alt='a dog' />
  );
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage(`Hola! ${user}, En que puedo ayudarte?`);
    const botMessage2 = createChatBotMessage(`1-Gastos Semanales`);
    const botMessage3 = createChatBotMessage(`2-Gastos mensuales`);
    const botMessage4 = createChatBotMessage(`3-Gastos anuales`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage3],
        }));
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage4],
          }));
        }, 1000)
      }, 1000)

    }, 1000)
  };

  const gastoSemanal = () => {
    const botMessage = createChatBotMessage(`${user}, Su gasto total semanal es de: ${5000}`);
    const botMessage2 = createChatBotMessage(`4-Para volver al menu`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
    }, 1000)
  }

  const gastoMensual = () => {
    const botMessage = createChatBotMessage(`${user}, Su gasto total mensual es de: ${500000}`);
    const botMessage2 = createChatBotMessage(`4-Para volver al menu`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
    }, 1000)
  }

  const gastoAnual = () => {
    const botMessage = createChatBotMessage(`${user}, Su gasto total anual es de: ${50000000}`);
    const botMessage2 = createChatBotMessage(`4-Para volver al menu`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
    }, 1000)
  }

  const menu = () => {
    const botMessage = createChatBotMessage(`1-Gastos Semanales`);
    const botMessage2 = createChatBotMessage(`2-Gastos mensuales`);
    const botMessage3 = createChatBotMessage(`3-Gastos anuales`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage3],
        }));
      }, 1000)

    }, 1000)

  }

  const resumenGraph = () => {
    const botMessage = createChatBotMessage(
      "Tu resumen en forma de grafico",
      {
        widget: 'resumenGraph',
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
            resumenGraph,
            gastoSemanal,
            gastoMensual,
            gastoAnual,
            menu
          },
        });
      })}
    </div>
  );
};

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase();

    if (message.includes('hola') || message.includes('hi') || !message) {
        actions.handleHello();
    }

    if (message.includes('menu') || message.includes('4')) {
      actions.menu()
    }

    if (message.includes("1") || message.includes("semanal") || message.includes("gasto semanal")) {
      actions.gastoSemanal()
    }
    if (message.includes("2") || message.includes("mensual") || message.includes("gasto mensual")) {
      actions.gastoMensual()
    }
    if (message.includes("3") || message.includes("anual") || message.includes("gasto anual")) {
      actions.gastoAnual()
    }
    if (message.includes('graph')) {
      actions.resumenGraph();
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