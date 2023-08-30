import React from 'react'
import FormLoginRegister from '../components/FormLoginRegister'
import { Link } from 'react-router-dom'

const Register = () => {

    return (
        <div className="overflow-auto h-screen flex w-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src="https://cdn-icons-png.flaticon.com/512/5645/5645053.png" alt='nose' />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Registrate pibe 😊</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <FormLoginRegister type="Register" url="/auth/login"/>
                <p className="mt-10 text-center text-sm text-gray-500">
                I already have an account
                    <Link to="/login" className="font-semibold leading-6 link-secondary"> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register