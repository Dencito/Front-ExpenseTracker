import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import PaidIcon from '@mui/icons-material/Paid';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const SideBar = () => {
  const { user, setUser } = useContext(UserProvider);
const [drawerOpen, setDrawerOpen] = useState(false)
  const logout = async () => {
    setUser(false)
    await window.localStorage.removeItem("token")
  }

  return (
    <>
    <div className="aside col-2 d-none d-xl-flex align-items-center">
      <nav className='sideBar'>
        <ul className='list d-none d-xl-flex justify-content-center flex-column gap-2'>
          <li>
            <NavLink to="/" className="link d-flex gap-2 btn" activeClassName="active">
              <CottageTwoToneIcon />
              <span>Home</span>
            </NavLink>
          </li>
          {user && <>
            <li>
            <NavLink to="/gastos" className="link d-flex gap-2 btn" activeClassName="active">
              <PaidIcon />
              <span>Gastos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resumen" className="link d-flex gap-2 btn" activeClassName="active">
              📒
              <span>Resumen</span>
            </NavLink>
          </li>
          </>
          }
          <li>
            <NavLink to="/noticias" className="link d-flex gap-2 btn" activeClassName="active">
              <NewspaperIcon />
              <span>Noticias</span>
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/configuracion" className="link d-flex gap-2 btn" activeClassName="active">
                  <SettingsIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Configuración</span>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => logout()} to="/register" className="link d-flex gap-2 btn" activeClassName="active">
                  <LogoutIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </NavLink>
              </li>
            </>

          )}
          {!user && (
            <>
              <li>
                <NavLink to="/login" className="link d-flex gap-2 btn" activeClassName="active">
                  <LoginIcon />
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
        </ul>
      </nav>
    </div>
      <button className='position-fixed top-0 left-0 btn flex-block d-xl-none' onClick={()=> setDrawerOpen(true)}><MenuIcon/></button>
     <Drawer anchor="left" open={drawerOpen} onClose={()=> setDrawerOpen(false)}>
      <nav className='d-xl-none d-flex aside flex-column gap-2 px-4 align-items-center justify-content-center text-white'>
            <NavLink to="/" className=" link d-flex gap-2 btn" activeClassName="active">
              <CottageTwoToneIcon />
              <span>Home</span>
            </NavLink>
          {user &&
            <>
            <NavLink to="/gastos" className="link d-flex gap-2 btn" activeClassName="active">
              <PaidIcon />
              <span>Gastos</span>
            </NavLink>
            <NavLink to="/resumen" className="link d-flex gap-2 btn" activeClassName="active">
              📒
              <span>Resumen</span>
            </NavLink>
            </>}
            <NavLink to="/noticias" className="link d-flex gap-2 btn" activeClassName="active">
              <NewspaperIcon />
              <span>Noticias</span>
            </NavLink>
          {user && (
            <>
                <NavLink to="/configuracion" className="link d-flex gap-2 btn" activeClassName="active">
                  <SettingsIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Configuración</span>
                </NavLink>
                <NavLink onClick={() => logout()} to="/register" className="link d-flex gap-2 btn" activeClassName="active">
                  <LogoutIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </NavLink>
            </>

          )}
          {!user && (
            <>
                <NavLink to="/login" className="link d-flex gap-2 btn" activeClassName="active">
                  <LoginIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Iniciar sesión</span>
                </NavLink>
                <NavLink to="/register" className="link d-flex gap-2 btn" activeClassName="active">
                  📝
                  <span className="flex-1 ml-3 whitespace-nowrap">Registrarse</span>
                </NavLink>
            </>
          )}
      </nav>
     </Drawer>
    </>
    
  );
}

export default SideBar;
