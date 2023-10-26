import React, { useContext, useEffect } from 'react'
import AccordionHomeList from './AccordionHomeList'
import { Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import { UserProvider } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { enviroments } from '../enviroments';

const EndHome = () => {
    const { setUser, user } = useContext(UserProvider);
    const navigate = useNavigate()
    useEffect(() => {
        validateUser()
    },[])

    
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
          const { data } = await response.json()
          data.ok && setUser(true)
  
        } catch (error) {
          console.log(error)
          setTimeout(() => {
            window.localStorage.removeItem("token")
            setUser(false)
          }, 2000)
        }
      }
      console.log(user)
    return (
        <>
            <div className="d-flex flex-column flex-lg-row my-5 align-items-center">
                <div className="p-5 pt-5 col-12 col-lg-6">
                    <img width="100%" src="https://www.webwork-tracker.com/images/time-tracker-software/web_tracker/benefits-web-tracker.webp" alt="" />
                </div>
                <ToastContainer />
                <AccordionHomeList />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                {!user && <Button color="primary" variant="outlined" onClick={()=> navigate("/register")}>Crear cuenta</Button>}
            
            </div>
        </>
    )
}

export default EndHome