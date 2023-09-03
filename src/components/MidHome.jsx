import { Button } from '@mui/material'
import React from 'react'

const MidHome = () => {
    return (
        <div className="d-flex flex-column flex-lg-row align-items-center">
            <div className="p-5 col-12 col-sm-12 col-lg-6">
                <h2 className='mb-2 h1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit?</h2>
                <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus suscipit odit quibusdam sapiente laudantium repellat blanditiis excepturi exercitationem sit ullam.</p>
                <Button color="primary" variant="outlined">More...</Button>
            </div>
            <div className="d-flex p-3 flex-column flex-lg-row col-12 col-sm-10 col-lg-6">
                <div className="col-12 col-lg-6">
                    <Card color="text-primary"/>
                    <Card color="text-secondary"/>
                </div>
                <div className="col-12 col-lg-6">
                    <Card color="text-success"/>
                    <Card color="text-danger"/>
                </div>
            </div>
        </div>
    )
}

const Card = ({color}) => {
    return (
        <div className="card p-3 m-2">
            <i className={`fa-regular fa-circle-check h4 ${color}`}></i>
            <h3 className='h5 font-bold'>Lorem ipsum dolor sit amet.</h3>
            <p className='h6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, iure!</p>
        </div>
    )
}


export default MidHome