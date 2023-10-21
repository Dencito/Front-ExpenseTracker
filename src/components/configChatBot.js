import React, { useContext, useEffect, useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { UserProvider } from '../context/UserContext';
import Bars from './BarsGraph';
import { enviroments } from '../enviroments';


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
    <div style={{ width: "100%", height: "300px", overflow: "auto" }}>
      <Bars />
    </div>
  );
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { user } = useContext(UserProvider);
  const [expenses, setExpenses] = useState([])
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`${enviroments.backend.urlLocal}/user/expense-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const dataExpenses = await response.json()
        setExpenses(dataExpenses?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getExpenses()
  }, [])
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentWeek = getWeekNumber(today);

  function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  const weeklyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();
    const expenseWeek = getWeekNumber(expenseDate);

    return (
      expenseYear === currentYear &&
      expenseMonth === currentMonth &&
      expenseWeek === currentWeek
    );
  });

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();

    return (
      expenseYear === currentYear &&
      expenseMonth === currentMonth
    );
  });

  const yearlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();

    return expenseYear === currentYear;
  });
  const handleHello = () => {
    const botMessage = createChatBotMessage(`Hola! ${user.username}, En que puedo ayudarte?`);
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
    const totalSemanal = weeklyExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const botMessage = createChatBotMessage(
      `${user?.username}, ${totalSemanal == 0 ? "Usted no tiene ningun gasto esta semana" : `Su gasto total semanal es de: ${totalSemanal.toLocaleString()} Pesos`}`
    );
    const botMessage2 = createChatBotMessage(`4-Para volver al menú`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
    }, 1000);
  };

  const gastoMensual = () => {
    const totalMensual = monthlyExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const botMessage = createChatBotMessage(
      `${user?.username}, ${totalMensual == 0 ? "Usted no tiene ningun gasto este mes" : `Su gasto total mensual es de: ${totalMensual.toLocaleString()}`}`
    );
    const botMessage2 = createChatBotMessage(`4-Para volver al menú`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
    }, 1000);
  };

  const gastoAnual = () => {
    const totalAnual = yearlyExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const botMessage = createChatBotMessage(
      `${user?.username}, ${totalAnual==0 ? "Usted no tiene ningun gasto este Año" : `Su gasto total anual es de: ${totalAnual.toLocaleString()}`}`
    );
    const botMessage2 = createChatBotMessage(`4-Para volver al menú`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage2],
      }));
    }, 1000);
  };

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