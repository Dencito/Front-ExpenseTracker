import React from 'react'
import { Link } from 'react-router-dom'
import FormLoginRegister from '../components/FormLoginRegister'
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Login = () => {
    const data = {
        email: "data@gmail.com",
        password: "9823hinq7eqw0om123qmwdas123"
    }
    return (
        <div className="content-general col-10 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <PersonPinIcon sx={{fontSize: "100px"}}/>
                <h2 className="h1 text-bold">Logeate pibe 😊</h2>
            </div>

            <div className='col-4 mx-auto'>
                <FormLoginRegister type="Login" url="/auth/login" data={data} />
                <p className="text-center">
                    You don't have an account yet?
                    <Link to="/register" className='ms-1' style={{color: "#d926a9"}}>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login