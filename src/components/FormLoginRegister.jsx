import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FormLoginRegister = ({ type, url, data }) => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(url, email, password)
        const success = async (data) => {
            setSuccess(true)
            setTimeout(async () => {
                setSuccess(false)
                await window.localStorage.setItem("token", data.data);
                await window.location.replace("/");
            }, 1500);

        }
        if (type === "Register") {
            const response = await fetch('https://54.172.163.47:5118/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json()
            data.errors !== null ? setError(data) : success(data)
        } else {
            const response = await fetch('https://54.172.163.47:5118/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json()
            data.errors !== null ? setError(data) : success(data)
        }



    }
    return (
        <form className="d-flex flex-column gap-2 my-4 mx-auto" onSubmit={handleSubmit}>
            {/* {type === "Register" &&
                <TextField color='secondary' label="Username" variant="standard" onChange={(e) => setUserName(e.target.value)} />
                } */}
                <TextField label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)}  />
                <TextField type='password' label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
                <Button color="primary" variant="outlined" className='mt-3' type='submit'>{type}</Button>
        </form>
    )
}

export default FormLoginRegister