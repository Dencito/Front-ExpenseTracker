import React from 'react'
import AccordionHomeItem from './AccordionHomeItem'

const AccordionHomeList = () => {
    const data = [
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet.",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore exercitationem eligendi nostrum minus quae, illum fugit. Pariatur animi perspiciatis laboriosam."
        },
        {
            id: 2,
            title: "Lorem ipsum dolor sit amet.",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore exercitationem eligendi nostrum minus quae, illum fugit. Pariatur animi perspiciatis laboriosam."
        },
        {
            id: 3,
            title: "Lorem ipsum dolor sit amet.",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore exercitationem eligendi nostrum minus quae, illum fugit. Pariatur animi perspiciatis laboriosam."
        }
    ]
    return (
        <div className="w-full flex flex-col gap-3 p-5">
            <h2 className='text-3xl my-5 font-bold'>Lorem ipsum dolor sit amet.</h2>
            {
                data.map((item) => (
                    <AccordionHomeItem key={item.id} title={item.title} description={item.description} />
                ))
            }
        </div>
    )
}

export default AccordionHomeList