import React, { useContext, useEffect, useState } from 'react'
import { UserProvider } from '../context/UserContext';
import { enviroments } from '../enviroments';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Fade, InputLabel, MenuItem, Select, TextField, Modal, Box, CircularProgress, Card } from '@mui/material';
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

const Expenses = () => {
  const { setUser } = useContext(UserProvider);
  const [title, setTitle] = useState("")
  const [categoryID, setCategoryID] = useState(0)
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [expenses, setExpenses] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpenEdit, setModalOpenEdit] = useState(false)
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
        const { data } = await response.json()
        setUser(true)

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
        setLoading(true)
      } catch (error) {
        console.log(error)
      }
    }
    const getCategories = async () => {
      const token = window.localStorage.getItem("token");
      try {
        const responseCategories = await fetch(`${enviroments.backend.urlLocal}/expensecategory`, {
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
  }, [modalOpen, modalOpenEdit])

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
    setModalOpen(false)
    setTitle("")
    setAmount("")
    setDate("")
    setCategoryID("")
    success("Gasto creado")
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

  const findCategory = (id) => {
    const findCategory = categories?.find(category => category.id === id)
    return findCategory?.categoryName
  }

  const getCategoryNameAndExpenses = (id) => {
    const categoryName = findCategory(id);
    const categoryExpenses = expenses
      .filter((expense) => expense.categoryID === id)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      categoryName,
      categoryExpenses,
    };
  };

  const categoryData = expenses
    ? [...new Set(expenses.map((expense) => expense.categoryID))].map((categoryId) =>
      getCategoryNameAndExpenses(categoryId)
    )
    : [];

  const deleteExtense = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      const responseCategories = await fetch(`${enviroments.backend.urlLocal}/expense/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const dataCategories = await responseCategories.json();
      console.log(dataCategories)
      setExpenses(expenses.filter((expense) => expense.id !== id));
      setModalOpen(false)
      success("Gasto eliminado");
    } catch (error) {
      errorToast("No se pudo eliminar el gasto")
      console.log(error)
    }
  }

  const editExpense = async (id) => {
    const token = window.localStorage.getItem("token");
    const bodyOptions = {
      categoryID,
      amount,
      date,
      description: title
    }
    const response = await fetch(`${enviroments.backend.urlLocal}/expense/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bodyOptions),
    });
    const data = await response.json()
    setTitle("")
    setAmount("")
    setDate("")
    setCategoryID("")
    setModalOpenEdit(false)
    success("Gasto Editado")
  }

  if (!loading) {
    return (
      <div className='d-flex justify-content-center align-items-center content-general col-12 col-xl-10'>
        <CircularProgress color="warning" />
      </div>
    )
  }
  return (
    <div className='content-general col-12 col-lg-10 mx-auto d-flex flex-column align-items-center justify-content-center pt-5'>
      <div className="d-flex flex-column pt-5">
        <ToastContainer />
        {
          !categoryData?.length ? <div>
            <h1>No tenes ningun gasto creado</h1>
          </div> : <div className='d-flex gap-3 overflow-auto p-3'>
            {categoryData.map((category) => (
              <Card key={category.categoryName} className="pb-1">
                <h3 className='px-3'>{category?.categoryName}</h3>
                <div style={{ height: "500px", overflow: "auto", padding: "5px" }}>
                  {category?.categoryExpenses.map(expense => (
                    <Card key={expense.id} className='d-flex flex-column p-1 mb-1'>
                      <span>{expense.description}</span>
                      <span>{expense.amount.toLocaleString()}</span>
                      <span>{moment(expense.date).format("DD.MM.YY")}</span>
                      <DeleteIcon onClick={() => deleteExtense(expense.id)} />
                      <ModeIcon onClick={() => {
                        setTitle(expense.description)
                        setDate(moment(expense.date).format("YYYY-MM-DD"))
                        setAmount(expense.amount)
                        setCategoryID(expense.categoryID)
                        setModalOpenEdit(true)
                        }} />
                      <Modal
                        aria-labelledby="spring-modal-title"
                        aria-describedby="spring-modal-description"
                        open={modalOpenEdit}
                        onClose={() => setModalOpenEdit(false)}
                        closeAfterTransition
                        slotProps={{
                          backdrop: {
                            TransitionComponent: Fade,
                          },
                        }}
                      >
                        <Fade in={modalOpenEdit}>
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
                              <Button color="primary" variant="outlined" onClick={() => editExpense(expense.id)}>Editar</Button>
                            </div>
                          </Box>
                        </Fade>
                      </Modal>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}

          </div>
        }
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