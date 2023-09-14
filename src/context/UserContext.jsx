import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';
import { enviroments } from '../enviroments';
export const UserProvider = createContext(null)

const UserContext = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const [user, setUser] = useState(token !== null);

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

    
  return (
    <UserProvider.Provider value={{ user, setUser }}>
      {children}
    </UserProvider.Provider>
  )
}

export default UserContext