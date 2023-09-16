import React, { useContext, useEffect, useState } from 'react'
import { UserProvider } from '../context/UserContext';
import { enviroments } from '../enviroments';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Fade, InputLabel, MenuItem, Select, TextField, Modal, Box } from '@mui/material';
import moment from "moment"
import { useNavigate } from 'react-router-dom';

const Expenses = () => {
  const { setUser } = useContext(UserProvider);
  const [title, setTitle] = useState("")
  const [categoryID, setCategoryID] = useState(0)
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [expenses, setExpenses] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const success = (title) => toast.success(title, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const errorToast = (title) => toast.error(title, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = window.localStorage.getItem("token");
      const response = await fetch(`${enviroments.backend.urlLocal}/user/validatetoken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const {data} = await response.json()
      setUser(true)
        setLoading(true)
      
    } catch (error) {
        errorToast("error del servidor")
        console.log(error)
        setTimeout(() => { 
          window.localStorage.removeItem("token")
          setUser(false)
          errorToast("Token invalido, volve a iniciar sesion")
          navigate("/login")
         }, 2000)
      }
    }
    const getExpenses = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`${enviroments.backend.urlLocal}/expense/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const dataExpenses = await response.json()
        setExpenses(dataExpenses?.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getCategories = async () => {
      const token = window.localStorage.getItem("token");
      try {
        const responseCategories = await fetch(`${enviroments.backend.urlLocal}/expenseCategory`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const dataCategories = await responseCategories.json()
        setCategories(dataCategories?.data)
      } catch (error) {
        console.log(error)
      }
    }
    validateUser()
    getCategories()
    getExpenses()
  }, [])

  const createExpense = async () => {
    const token = window.localStorage.getItem("token");
    const bodyOptions = {
      categoryID,
      amount,
      date,
      description: title
    }
    const response = await fetch(`${enviroments.backend.urlLocal}/expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyOptions),
    });
    const data = await response.json()
    if (data.ok) {
      success("Gasto creado")
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  if(!loading){
    return (
     <>
    <h1>Holaaaaaaaaaaaaaaaaaa</h1>
     </>
    )
  }
  return (
    <div className='content-general col-12 col-lg-10 mx-auto d-flex flex-column align-items-center justify-content-center py-5'>
      <div className="d-flex flex-column">
      <ToastContainer />
        <div className='d-flex gap-5'>
          {expenses?.map((expense) => (
            <div className='d-flex flex-column'>
              <p>{expense.description}</p>
              <p>{expense.amount}</p>
              <p>{moment(expense.date).format("DD-MM-YY")}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setModalOpen(true)}>Crear</Button>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={style}>
              <div className="d-flex flex-column gap-3">

                <TextField label="Titulo:" variant="standard" onChange={(e) => setTitle(e.target.value)} defaultValue={title} />
                <TextField type='date' variant="standard" onChange={(e) => setDate(e.target.value)} defaultValue={date} />
                <TextField label="Gasto total:" type='number' variant="standard" onChange={(e) => setAmount(e.target.value)} defaultValue={amount} />
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryID}
                  label="Age"
                  onChange={(e) => setCategoryID(e.target.value)}
                >
                  {categories?.map(category => (
                    <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                  ))}
                </Select>
                <Button color="primary" variant="outlined" onClick={() => createExpense()}>Crear</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}
export default Expenses