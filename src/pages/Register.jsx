import React from 'react'
import FormLoginRegister from '../components/FormLoginRegister'
import { Link } from 'react-router-dom'
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Register = () => {
    return (
        <div className="content-general col-10 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <PersonPinIcon sx={{fontSize: "100px"}}/>
                <h2 className="h1 text-bold">Registrate pibe 😊</h2>
            </div>

            <div className='col-4 mx-auto'>
                <FormLoginRegister type="Register" url="/auth/register" />
                <p className="text-center">
                I already have an account
                    <Link to="/logn" className='ms-1' style={{color: "#d926a9"}}>Login</Link>
                </p>
            </div>
        </div>
    )
    
}

export default Register