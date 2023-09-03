import React from 'react'

const StartHome = () => {
  return (
    <div className='m-5'>
      <h1 className='h1 text-center my-10 mb-20 text-bold'>Bienvenidos a <span className='text-danger'>FINANZAP</span></h1>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-5 my-5">
        <img className='w-50' src="https://www.colppy.com/wp-content/uploads/2022/12/img-registro.png" alt="" />
        <h2 className='h2'>Tu socio financiero personal. Controla tus gastos, planifica tus inversiones y alcanza la libertad financiera en un solo lugar. ¡Haz que tu dinero trabaje para ti!</h2>
      </div>
    </div>
  )
}

export default StartHome