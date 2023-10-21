import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Button, CircularProgress, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { enviroments } from '../enviroments';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

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

    const success = (title) => toast.success(title, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (!username) {
            setLoading(false)
            return errorToast("Campo username vacio");
        }
        if (!email) {
            setLoading(false)
            return errorToast("Campo email vacio");
        } else if (!email.includes("@")) {
            setLoading(false)
            return errorToast('Campo email debe de tener "@"');
        } else if (!email.includes(".")) {
            setLoading(false)
            return errorToast('Campo email debe de tener punto " . "');
        }
        if (!password) {
            setLoading(false)
            return errorToast("Campo password vacio");
        } else if (password.length < 6) {
            setLoading(false)
            return errorToast("Campo password debe tener mas de 6 caracteres.");
        }
        try {
            const response = await fetch(`${enviroments.backend.urlLocal}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });
            if (response.ok) {
                const data = await response.json();
                success("Registrado");
                await window.localStorage.setItem("token", data.data);
                window.location.replace("/");
            } else {
                const errorData = await response.json();
                setLoading(false)
                errorToast(errorData?.errors[0] || "Error desconocido");
            }
        } catch (error) {
            setLoading(false)
            errorToast("Fallo el servidor")
            console.log(error)
        }
    }
    
    return (
        <div className="content-general col-12 col-xl-10 d-flex mx-auto flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <PersonPinIcon sx={{ fontSize: "100px" }} />
                <h2 className="h1 text-bold">Registrate</h2>
            </div>

            <div className='col-11 col-md-8 col-lg-6 col-xl-4 col-xxl-3 mx-auto'>
                <form className="d-flex flex-column gap-2 my-4 mx-auto" onSubmit={handleSubmit}>
                    <div>
                        <ToastContainer />
                    </div>
                    <TextField label="username" variant="standard" onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} />
                    <TextField type='password' autoSave='false' label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
                    <Button color="primary" variant="outlined" className='mt-3' type='submit'>{loading ?<CircularProgress  size={20} color="secondary" />  : 'Register'}</Button>
                </form>
                <p className="text-center">
                    I already have an account?
                    <Link to="/login" className='ms-1' style={{ color: "#d926a9" }}>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register