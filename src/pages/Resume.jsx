import React, { useContext, useEffect, useState } from 'react'
import ChatBotComponent from '../components/ChatBot'
import { UserProvider } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { enviroments } from '../enviroments';
import GraphLine from '../components/Graph';
import PieChart from '../components/PieGraph';
import { CircularProgress } from '@mui/material';

const Resume = () => {
  const { setUser } = useContext(UserProvider);
  const [loading, setLoading] = useState(false)
  const [expenses, setExpenses] = useState(null)
  const navigate = useNavigate()


  const success = (title) => toast.success(title, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const errorToast = (title) => toast.error(title, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`${enviroments.backend.urlLocal}/user/validatetoken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const { data: { user } } = await response.json()
        setUser(user)
      } catch (error) {
        console.log(error)

        setTimeout(() => {
          setUser(false)
          window.localStorage.removeItem("token")
          navigate("/login")
        }, 2000)
      }
    }
    validateUser()
    getExpenses()
  }, []);

  const getExpenses = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await fetch(`${enviroments.backend.urlLocal}/expense/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const dataExpenses = await response.json()
      setExpenses(dataExpenses?.data)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    {loading ? <div className='content-general col-12 col-xl-10 d-flex flex-column justify-content-center align-items-center'>
      {
        !expenses?.length ? <div className='d-flex flex-column justify-content-center align-items-center'>
          <h1>No tenes ningun gasto creado</h1>
          <Link className='link' to="/gastos" style={{ color: "#d926a9" }}>Crear Gasto</Link>
        </div> : <div>
          <ChatBotComponent />
          <div style={{ width: "800px", height: "600px" }}>
            <GraphLine filtro="month" />
          </div>
          <div style={{ width: "800px", height: "600px" }}>
            <PieChart />
          </div>
        </div>
      }

    </div> :
      <div className='d-flex justify-content-center align-items-center content-general col-12 col-xl-10'>
        <CircularProgress color="warning" />
      </div>}
  </>
  )
}

export default Resume

