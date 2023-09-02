import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const error = (title) => toast.error(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const errorCatch = (title) => toast.error(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const success = (title) => toast.success(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const handleSubmit = async (e) => {
        e.preventDefault()

        const Successfull = async (data) => {
            setTimeout(async () => {
                success("Registrado")
                await window.localStorage.setItem("token", data.data);
                await window.location.replace("/");
            }, 1500);
        }
        if (!username) {
            return error("Campo username vacio");
        }
        if (!email) {
            return error("Campo email vacio");
        } else if (!email.includes("@")) {
            return error('Campo email debe de tener "@"');
        } else if (!email.includes(".")) {
            return error('Campo email debe de tener punto " . "');
        }
        if (!password) {
            return error("Campo password vacio");
        } else if (password.length < 6) {
            return error("Campo password debe tener mas de 6 caracteres.");
        }
        try {
            const response = await fetch('https://54.172.163.47:5118/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json()
            data.errors !== null ? error(data?.errors[0]) : Successfull(data)
        } catch (error) {
            errorCatch("Fallo el servidor")
            console.log(error)
        }
    }
    return (
        <div className="content-general col-10 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <PersonPinIcon sx={{ fontSize: "100px" }} />
                <h2 className="h1 text-bold">Registrate pibe 😊</h2>
            </div>

            <div className='col-4 mx-auto'>
                <form className="d-flex flex-column gap-2 my-4 mx-auto" onSubmit={handleSubmit}>
                    <div>
                        <ToastContainer />
                    </div>
                    <TextField label="username" variant="standard" onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)} />
                    <TextField type='password' autoSave='false' label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
                    <Button color="primary" variant="outlined" className='mt-3' type='submit'>Register</Button>
                </form>
                <p className="text-center">
                    I already have an account
                    <Link to="/login" className='ms-1' style={{ color: "#d926a9" }}>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register