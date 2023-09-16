import React, { useContext, useEffect, useState } from 'react'
import ChatBotComponent from '../components/ChatBot'
import { UserProvider } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { enviroments } from '../enviroments';
import GraphLine from '../components/Graph';
import PieChart from '../components/PieGraph';

const Resume = () => {
  const { setUser } = useContext(UserProvider);
  const [loading, setLoading] = useState(false)
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
            setLoading(true)
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
}, []);
  return (<>
  {loading ? <div className='content-general col-12 col-xl-10'>
    <ChatBotComponent/>
    <div style={{width: "800px", height: "600px"}}>
    <GraphLine filtro="month"/>
    </div>
    <div style={{width: "800px", height: "600px"}}>
    <PieChart/>
    </div>
  </div> : "cargandoo"}
  </>
  )
}

export default Resume

