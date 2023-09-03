import React from 'react'
import AccordionHomeList from './AccordionHomeList'
import { Button } from '@mui/material'

const EndHome = () => {
    return (
        <>
            <div className="d-flex flex-column flex-lg-row my-5 align-items-center">
                <div className="p-5 pt-5 col-12 col-lg-6">
                    <img width="100%" src="https://www.webwork-tracker.com/images/time-tracker-software/web_tracker/benefits-web-tracker.webp" alt="" />
                </div>
                <AccordionHomeList />
            </div>
            <div className='d-flex justify-content-center mt-5'>
            <Button color="primary" variant="outlined">lorem</Button>
            </div>
        </>
    )
}

export default EndHome