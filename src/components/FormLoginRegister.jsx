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
        <form className="space-y-6 mx-auto" onSubmit={handleSubmit}>
            {type === "Register" && <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-secondary">username</label>
                <div className="mt-2">
                    <input id="username" name="username" onChange={(e) => setUserName(e.target.value)} type="username" className="block w-full rounded-md border-0 py-1.5 ps-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:text-secondary sm:text-sm sm:leading-6" />
                </div>
            </div>}

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-secondary">Email address</label>
                <div className="mt-2">
                    <input id="email" name="email" onChange={(e) => setEmail(e.target.value)} type="email" className="block w-full rounded-md border-0 py-1.5 ps-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:text-secondary sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-secondary">Password</label>
                    {type === "Login" && <div className="text-sm">
                        <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                    </div>}
                </div>
                <div className="mt-2">
                    <input id="password" onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="block w-full rounded-md border-0 py-1.5 ps-3 pe-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:text-secondary sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                {error && <span>Error al logearte pibe</span>}
                {success && <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Successes 😊</span>
                </div>}
                {!success && <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{type === "Login" ? "Sign in" : "Sign up"}</button>}
            </div>
        </form>
    )
}

export default FormLoginRegister