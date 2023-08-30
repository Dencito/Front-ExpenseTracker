import React, { createContext, useState } from 'react'

export const UserProvider = createContext(null)

const UserContext = ({children}) => {
    const [user, setUser] = useState(false)
  return (
   <UserProvider.Provider value={{user, setUser}}>
    {children}
   </UserProvider.Provider>
  )
}

export default UserContext