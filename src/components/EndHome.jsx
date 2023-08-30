import React from 'react'
import AccordionHomeList from './AccordionHomeList'

const EndHome = () => {
    return (
        <>
            <div className="flex my-5 items-center">
                <div className="w-full p-5 pt-20">
                    <img src="https://www.webwork-tracker.com/images/time-tracker-software/web_tracker/benefits-web-tracker.webp" alt="" />
                </div>
                <AccordionHomeList />
            </div>
            <div className='flex justify-center mt-5'>
                <button className='btn btn-secondary btn-outline'>Comenzar hoy</button>
            </div>
        </>
    )
}

export default EndHome