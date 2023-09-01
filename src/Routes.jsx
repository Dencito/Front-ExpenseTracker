import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SideBar from './components/SideBar'
import News from './pages/News'

const RoutesApp = () => {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/noticias' element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesApp