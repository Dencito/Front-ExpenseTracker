import React, { useContext, useEffect, useState } from 'react'
import { UserProvider } from '../context/UserContext';
import { enviroments } from '../enviroments';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Fade, InputLabel, MenuItem, Select, TextField, Modal, Box, CircularProgress, Menu } from '@mui/material';
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Dropdown, Pagination, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const { Meta } = Card;

const Expenses = () => {
  document.title = "Tus Gastos"
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
  const [filterLoading, setFilterLoading] = useState(0)
  const [filterQuery, setFilterQuery] = useState({
    page: 1,
  })
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [filterDate, setFilterDate] = useState({})
  const [selectId, setSelectId] = useState(null)
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
        const filterCategory = filterQuery?.categoryId ? `&Filter=CategoryID&FilterValue=${filterQuery?.categoryId}` : ''
        const filterDateQry = filterDate?.startDate && filterDate?.endDate ? `&RangeDates.StartDate=${filterDate?.startDate}&RangeDates.EndDate=${filterDate?.endDate}` : ''
        const filterOrder = "" //filterQuery?.order
        const response = await fetch(`${enviroments.backend.urlLocal}/expense/user/getallpaginated?PageSize=9&Page=${filterQuery?.page}${filterCategory}${filterDateQry}${filterOrder}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const dataExpenses = await response.json()
        console.log(dataExpenses)
        setExpenses(dataExpenses?.data)
        setLoadingFilter(true)
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
  }, [modalOpen, modalOpenEdit, filterQuery, filterLoading])

  const createExpense = async () => {
    //validar que los datos o esten vacio sino mandar mensaje
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
    if (data.data) {
      success("Gasto creado")
      setModalOpen(false)
      setTitle("")
      setAmount("")
      setDate("")
      setCategoryID("")
    }
    console.log(data)
    data.errors && errorToast("No se pudo crear el gasto")
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


  const categoriesMock = [
    {
      id: 1,
      createdAt: '2023-11-17T02:51:39.6996773',
      lastModified: '2023-11-17T02:51:39.6997707',
      isDeleted: false,
      categoryName: 'Seguros',
      color: 'blue',
      // Otros atributos del objeto...
    },
    {
      id: 2,
      createdAt: '2023-11-17T02:52:12.463491',
      lastModified: '2023-11-17T02:52:12.4634946',
      isDeleted: false,
      categoryName: 'Entretenimiento',
      color: 'green',
      // Otros atributos del objeto...
    },
    {
      id: 3,
      createdAt: '2023-11-17T02:52:31.6754549',
      lastModified: '2023-11-17T02:52:31.6754566',
      isDeleted: false,
      categoryName: 'Supermercados',
      color: 'red',
      // Otros atributos del objeto...
    },
    {
      id: 4,
      createdAt: '2023-11-17T02:52:43.019514',
      lastModified: '2023-11-17T02:52:43.0195157',
      isDeleted: false,
      categoryName: 'Ropa',
      color: 'purple',
      // Otros atributos del objeto...
    },
    {
      id: 5,
      createdAt: '2023-11-17T02:52:53.8762538',
      lastModified: '2023-11-17T02:52:53.8762555',
      isDeleted: false,
      categoryName: 'Electrodomesticos',
      color: 'orange',
      // Otros atributos del objeto...
    },
    {
      id: 6,
      createdAt: '2023-11-17T02:53:16.0723755',
      lastModified: '2023-11-17T02:53:16.0723777',
      isDeleted: false,
      categoryName: 'Bebes',
      color: 'pink',
      // Otros atributos del objeto...
    },
    {
      id: 7,
      createdAt: '2023-11-17T02:53:35.2292511',
      lastModified: '2023-11-17T02:53:35.2292528',
      isDeleted: false,
      categoryName: 'Servicios',
      color: 'brown',
      // Otros atributos del objeto...
    }
  ];


  const findCategory = (id) => {
    const findCategory = categoriesMock?.find(category => category?.id === id)
    return { ...findCategory}
  }

  const getCategoryNameAndExpenses = (id) => {
    const categoryName = findCategory(id);
    const categoryExpenses = expenses?.query?.filter((expense) => expense.categoryID === id)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      categoryName,
      categoryExpenses,
    };
  };

  const categoryData = expenses
    ? [...new Set(expenses?.query?.map((expense) => expense.categoryID))].map((categoryId) =>
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
      setExpenses({...expenses, query: expenses?.query?.filter((expense) => expense.id !== id)});
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

 
  const items = categoriesMock?.map(category => ({
    key: category?.id,
    label: (
      <button onClick={() => {
        setFilterQuery({ ...filterQuery, categoryId: category?.id })
        setFilterLoading(filterLoading + 1)
      }} style={{ backgroundColor: "#fff", border: 0, outline: 0, width: "100%" }}>{category?.categoryName}</button>
    ),
  }))

  const orderItems = {
    items: [
      {
        key: 1,
        label: (
          <button onClick={() => setFilterQuery({ ...filterQuery, orderId: 1 })} style={{ backgroundColor: "#fff", border: 0, outline: 0, width: "100%" }}>A-Z</button>
        ),
      },
      {
        key: 2,
        label: (
          <button onClick={() => setFilterQuery({ ...filterQuery, orderId: 2 })} style={{ backgroundColor: "#fff", border: 0, outline: 0, width: "100%" }}>Z-A</button>
        ),
      },
      {
        key: 3,
        label: (
          <button onClick={() => setFilterQuery({ ...filterQuery, orderId: 3 })} style={{ backgroundColor: "#fff", border: 0, outline: 0, width: "100%" }}>Fecha Asc</button>
        ),
      },
      {
        key: 4,
        label: (
          <button onClick={() => setFilterQuery({ ...filterQuery, orderId: 4 })} style={{ backgroundColor: "#fff", border: 0, outline: 0, width: "100%" }}>Fecha Desc</button>
        ),
      },]
  }

  return (
    <div className='content-general col-12 col-lg-10 mx-auto d-flex flex-column align-items-center'>
      <div className="d-flex flex-column pt-5 col-12 px-5">
        <ToastContainer />
        {
          (!expenses?.query?.length && (filterQuery?.page !== 1 || !filterQuery?.categoryId) && (!filterDate?.endDate && !filterDate?.startDate)) ? <div>
            <h1>No tenes ningun gasto creado</h1>
            <AddCircleIcon style={{ fontSize: "35px", color: "green" }} onClick={() => setModalOpen(true)} className='btn-add' />
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

                    <TextField label="Titulo:" required variant="standard" onChange={(e) => setTitle(e.target.value)} defaultValue={title} />
                    <TextField type='date' required variant="standard" onChange={(e) => setDate(e.target.value)} defaultValue={date} />
                    <TextField required label="Gasto total:" type='number' variant="standard" onChange={(e) => setAmount(e.target.value)} defaultValue={amount} />
                    <InputLabel required id="demo-simple-select-label">Categoria</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categoryID}
                      label="Age"
                      onChange={(e) => setCategoryID(e.target.value)}
                    >
                      {categories?.map(category => (
                        <MenuItem key={category?.id} value={category?.id}>{category?.categoryName}</MenuItem>
                      ))}
                    </Select>
                    <Button color="primary" variant="outlined" onClick={() => createExpense()}>Crear</Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div> : <div className='col-12'>
            <div className="d-flex justify-content-between col-12">
              <Dropdown menu={{ items }}>
                <p>
                  <Space>
                    Categories
                    <DownOutlined />
                  </Space>
                  {filterQuery?.categoryId && findCategory(filterQuery?.categoryId).categoryName}
                </p>
              </Dropdown>

              <div className='d-flex flex-column gap-1'>
              <Button color="primary" variant="outlined" onClick={() => {
                setFilterDate({})
                setFilterQuery({
                  page: 1,
                })
                setFilterLoading(filterLoading + 1)
                }}>Borrar todos los filtros</Button>
                <div className='d-flex gap-3'>
                  <TextField type='date' variant="standard" onChange={(e) => {
                    setFilterDate({ ...filterDate, startDate: e.target.value })
                  }} />
                  <TextField type='date' variant="standard" onChange={(e) => {
                    setFilterDate({ ...filterDate, endDate: e.target.value })
                  }} />
                </div>
                <Button color="primary" variant="outlined" onClick={() => setFilterLoading(filterLoading + 1)}>Buscar por fecha</Button>
              </div>

              <Dropdown menu={orderItems}>
                <p>
                  <Space>
                    Orden
                    <DownOutlined />
                  </Space>
                </p>
              </Dropdown>
            </div>
            <div className='d-flex justify-content-between align-items-center'><h1>Gastos</h1> <Pagination onChange={(page) => {
              setFilterQuery({ ...filterQuery, page })
              setLoadingFilter(false)
            }} defaultCurrent={filterQuery?.page} total={expenses?.totalCount} /> <AddCircleIcon style={{ fontSize: "35px", color: "green" }} onClick={() => setModalOpen(true)} className='btn-add' />
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

                      <TextField label="Titulo:" required variant="standard" onChange={(e) => setTitle(e.target.value)} defaultValue={title} />
                      <TextField type='date' required variant="standard" onChange={(e) => setDate(e.target.value)} defaultValue={date} />
                      <TextField required label="Gasto total:" type='number' variant="standard" onChange={(e) => setAmount(e.target.value)} defaultValue={amount} />
                      <InputLabel required id="demo-simple-select-label">Categoria</InputLabel>
                      <Select
                        required
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
              </Modal> </div>
            {!loadingFilter ? <div className='d-flex align-items-center justify-content-center py-5'>
              <CircularProgress color="warning" />
            </div>
              :
              <div className='d-flex gap-3 flex-wrap py-3'>
                {(!expenses?.query?.length) && (
                    <h1>
                      {filterQuery.categoryId ? "No tenes ningun gasto en esa categoria" : "No tenes ningun gasto en ese rango de fechas"}
                    </h1>
                )}
                {
                  expenses?.query?.map(expense => (
                    <div className='col-12 col-md-6 col-lg-3 mx-auto' key={expense.id}>
                      <Card
                        style={{ width: 300, boxShadow: "0 5px 15px #00000036" }}
                        actions={[
                          <EditOutlined className='btn-options' key="edit" style={{ color: "gray", fontSize: "20px" }} onClick={() => {
                            setSelectId(expense.id);
                            setTitle(expense.description)
                            setDate(moment(expense.date).format("YYYY-MM-DD"))
                            setAmount(expense.amount)
                            setCategoryID(expense.categoryID)
                            setModalOpenEdit(true)
                          }} />,
                          <span key="amount">${expense.amount}</span>,
                          <DeleteOutlined onClick={() => deleteExtense(expense?.id)} className='btn-options' key="delete" style={{ color: "red", fontSize: "20px" }} />
                        ]}
                      >
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
                                <Button color="primary" variant="outlined" onClick={() => editExpense(selectId)}>Editar</Button>
                              </div>
                            </Box>
                          </Fade>
                        </Modal>
                        <Meta
                          avatar={<div style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: findCategory(expense.categoryID).color }}></div>}
                          title={expense.description}
                          description={moment(expense.date).format("DD.MM.YYYY")}
                        />
                      </Card>
                    </div>
                  ))
                }
              </div>}
          </div>
        }
      </div>
    </div>
  )
}
export default Expenses