import React from 'react'
import AccordionHomeItem from './AccordionHomeItem'

const AccordionHomeList = () => {
    const data = [
        {
            id: 1,
            title: "Nuestra historia",
            description: "Nuestra aplicación surgió cuando sus creadores se dieron cuenta de la necesidad de simplificar la gestión financiera en un mundo cada vez más complejo. Nacimos con la idea de hacer que las finanzas personales fueran accesibles para todos."
        },
        {
            id: 2,
            title: "Nuestra misión",
            description: "Nuestra misión es capacitar a las personas para tomar control de sus finanzas. Ofrecemos una herramienta eficiente y fácil de usar que les ayuda a tomar decisiones financieras informadas y trabajar hacia sus metas económicas."
        },
        {
            id: 3,
            title: "Nuestra visión y valores",
            description: "Nuestra visión es convertirnos en la aplicación líder a nivel global en gestión de gastos, reconocidos por nuestra simplicidad y la capacidad de transformar la relación de las personas con su dinero. Buscamos ser la opción preferida para aquellos que desean una gestión financiera efectiva."
        }
    ]
    return (
        <div className="w-full flex flex-col gap-3 p-5">
            <h2 className='text-3xl my-5 font-bold text-center'>¿Quienes somos?</h2>
            {
                data.map((item) => (
                    <AccordionHomeItem key={item.id} data={item} />
                ))
            }
        </div>
    )
}

export default AccordionHomeList