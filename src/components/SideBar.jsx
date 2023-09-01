/* import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserProvider } from '../context/UserContext'
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import PaidIcon from '@mui/icons-material/Paid';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

const SideBar = () => {
   const [active, setActive] = useState(window.location.pathname)
   const { user, setUser } = useContext(UserProvider)
   console.log(user)
   return (
         <div className="aside col-2 d-flex align-items-center">
            <nav className='sideBar'>
               <ul className='list d-flex justify-content-center flex-column gap-2'>
                  <li>
                     <Link to="/" className="link d-flex gap-2 btn" onClick={()=> setActive("home")}>
                        <CottageTwoToneIcon/>
                        <span>Home</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/inversiones" className="link d-flex gap-2 btn">
                        <PaidIcon/>
                        <span>Inversiones</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/resumen" className="link d-flex gap-2 btn">
                        📒
                        <span>Resumen</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/noticias" className="link d-flex gap-2 btn">
                        <NewspaperIcon/>
                        <span>Noticias</span>
                     </Link>
                  </li>
                  <li>
                     <Link to="/settings" className="link d-flex gap-2 btn">
                        <SettingsIcon/>
                        <span className="flex-1 ml-3 whitespace-nowrap">Configuración</span>
                     </Link>
                  </li>
                  {!user && <>
                     <li>
                        <Link to="/login" className="link d-flex gap-2 btn">
                           <LoginIcon/>
                           <span className="flex-1 ml-3 whitespace-nowrap">Iniciar sesión</span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/register" className="link d-flex gap-2 btn">
                           📝
                           <span className="flex-1 ml-3 whitespace-nowrap">Registrarse</span>
                        </Link>
                     </li>
                  </>}
                  {user && <li>
                     <button onClick={()=> setUser(false)} className="link d-flex gap-2 btn">
                        📥
                        <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                     </button>
                  </li>}
               </ul>
            </nav>
         </div>
   )
}

export default SideBar */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import PaidIcon from '@mui/icons-material/Paid';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

const SideBar = () => {
   const { user, setUser } = useContext(UserProvider);
   console.log(user);

   return (
     <div className="aside col-2 d-flex align-items-center">
       <nav className='sideBar'>
         <ul className='list d-flex justify-content-center flex-column gap-2'>
           <li>
             <NavLink to="/" className="link d-flex gap-2 btn" activeClassName="active">
               <CottageTwoToneIcon/>
               <span>Home</span>
             </NavLink>
           </li>
           <li>
             <NavLink to="/inversiones" className="link d-flex gap-2 btn" activeClassName="active">
               <PaidIcon/>
               <span>Inversiones</span>
             </NavLink>
           </li>
           <li>
             <NavLink to="/resumen" className="link d-flex gap-2 btn" activeClassName="active">
               📒
               <span>Resumen</span>
             </NavLink>
           </li>
           <li>
             <NavLink to="/noticias" className="link d-flex gap-2 btn" activeClassName="active">
               <NewspaperIcon/>
               <span>Noticias</span>
             </NavLink>
           </li>
           <li>
             <NavLink to="/settings" className="link d-flex gap-2 btn" activeClassName="active">
               <SettingsIcon/>
               <span className="flex-1 ml-3 whitespace-nowrap">Configuración</span>
             </NavLink>
           </li>
           {!user && (
             <>
               <li>
                 <NavLink to="/login" className="link d-flex gap-2 btn" activeClassName="active">
                   <LoginIcon/>
                   <span className="flex-1 ml-3 whitespace-nowrap">Iniciar sesión</span>
                 </NavLink>
               </li>
               <li>
                 <NavLink to="/register" className="link d-flex gap-2 btn" activeClassName="active">
                   📝
                   <span className="flex-1 ml-3 whitespace-nowrap">Registrarse</span>
                 </NavLink>
               </li>
             </>
           )}
           {user && (
             <li>
               <button onClick={() => setUser(false)} className="link d-flex gap-2 btn">
                 📥
                 <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
               </button>
             </li>
           )}
         </ul>
       </nav>
     </div>
   );
}

export default SideBar;
