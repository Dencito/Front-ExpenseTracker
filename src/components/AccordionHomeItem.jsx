import React from 'react'

const AccordionHomeItem = ({ title, description }) => {
    return (
        <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">
                {title}
            </div>
            <div className="collapse-content">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default AccordionHomeItem