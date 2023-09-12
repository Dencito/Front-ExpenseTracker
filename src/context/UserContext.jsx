import React, { createContext, useEffect, useState } from 'react'
import { enviroments } from '../enviroments';
export const UserProvider = createContext(null)

const UserContext = ({ children }) => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = window.localStorage.getItem("token");
        console.log(token)
      const response = await fetch(`${enviroments.backend.urlLocal}/user/ValidateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const { data } = await response.json()
      if(response.ok) {
        setUser(data)
      } else {
        setUser(false)
      }
      
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  }, []);
  return (
    <UserProvider.Provider value={{ user, setUser }}>
      {children}
    </UserProvider.Provider>
  )
}

export default UserContext