import React from 'react'

const MidHome = () => {
    return (
        <div className="flex p-5 items-center">
            <div className="w-full p-5">
                <h2 className='text-4xl font-bold text-secondary mb-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit?</h2>
                <p className='mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus suscipit odit quibusdam sapiente laudantium repellat blanditiis excepturi exercitationem sit ullam.</p>
                <button className='btn btn-secondary btn-outline'>Click</button>
            </div>
            <div className="w-full flex flex-wrap">
                <div className="columns-2 mb-5">
                    <Card color="text-primary"/>
                    <Card up color="text-secondary"/>
                </div>
                <div className="columns-2">
                    <Card color="text-success"/>
                    <Card up color="text-orange-100"/>
                </div>
            </div>
        </div>
    )
}

const Card = ({up, color}) => {
    return (
        <div className={`card bg-base-100 p-5 ${up && 'translate-y-10'}`}>
            <i className={`fa-regular fa-circle-check text-3xl ${color}`}></i>
            <h3 className='text-xl font-bold'>Lorem ipsum dolor sit amet.</h3>
            <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, iure!</p>
        </div>
    )
}


export default MidHome