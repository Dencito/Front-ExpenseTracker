import React from 'react'
import { Link } from 'react-router-dom'
import FormLoginRegister from '../components/FormLoginRegister'

const Login = () => {
    const data = {
        email: "data@gmail.com",
        password: "9823hinq7eqw0om123qmwdas123"
    }
    return (
        <div className="overflow-auto h-screen flex w-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src="https://cdn-icons-png.flaticon.com/512/5645/5645053.png" alt='nose'  />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Logeate pibe 😊</h2>
            </div>

            <div className="mt-10 mx-auto w-full sm:max-w-sm">
                <FormLoginRegister type="Login" url="/auth/login" data={data} />
                <p className="mt-10 text-center text-sm text-gray-500">
                    You don't have an account yet?
                    <Link to="/register" className="font-semibold leading-6 link-secondary"> Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login