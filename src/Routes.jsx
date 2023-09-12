import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SideBar from './components/SideBar';
import News from './pages/News';
import Settings from './pages/Settings';
import { UserProvider } from './context/UserContext';
import Expenses from './pages/Expenses';
import Resume from './pages/Resume';

const RoutesApp = () => {
  const { user } = useContext(UserProvider);

  return (
    <div className="d-flex">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path='/noticias' element={<News />} />
          <Route path='/gastos' element={user ? <Expenses /> : <Login/>} />
          <Route path='/resumen' element={<Resume/>} />
          <Route path='/configuracion' element={user ? <Settings /> : <Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutesApp;