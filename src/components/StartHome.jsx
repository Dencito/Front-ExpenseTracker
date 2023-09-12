const StartHome = () => {
  return (
    <div className='m-5'>
      <h1 className='h1 text-center my-10 mb-20 text-bold'>Bienvenidos a <span className='text-danger'>ExpenseTracker</span></h1>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-5 my-5">
        <img className='col-12 col-lg-6' src="https://www.colppy.com/wp-content/uploads/2022/12/img-registro.png" alt="" />
        <h2 className='h2'>Expense Tracking es una aplicación que simplifica la gestión financiera, permitiéndote hacer un seguimiento detallado de tus gastos diarios, mantener un registro completo de ingresos y gastos, y tomar el control total de tus finanzas personales o empresariales de manera eficiente.</h2>
      </div>
    </div>
  )
}

export default StartHome