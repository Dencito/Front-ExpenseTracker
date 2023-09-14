import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Skeleton, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { UserProvider } from '../context/UserContext'
import { enviroments } from '../enviroments'
import ImageChange from '../components/ImageChange'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const { setUser } = useContext(UserProvider);
    const [updateState, setUpdateState] = useState(true)
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState("")
    const [dni, setDni] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const validateUser = async () => {
            try {
              const token = window.localStorage.getItem("token");
            const response = await fetch(`${enviroments.backend.urlLocal}/user/ValidateToken`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
            const {data: {user}} = await response.json()
            setUser(true)
            setUsername(user?.username)
            setName(user?.name)
            setLastName(user?.lastName)
            setDni(user?.dni)
            setGender(user?.gender)
            setImage(user?.image)
            setPhone(user?.phone)
            setEmail(user?.email)
            setLoading(false)
            
          } catch (error) {
              console.log(error)
              errorToast("Token invalido, volve a iniciar sesion, o hubo un error en el servidor")
              setTimeout(() => { 
                window.localStorage.removeItem("token")
                setUser(false)
                navigate("/login")
               }, 2000)
            }
          }
          validateUser()
    }, []);

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
    const changeValues = async () => {
        if (!email.includes("@") && !email.includes(".")) {
            return errorToast("Verificar los campos")
        }
        if (phone.length !== 10) {
            return errorToast("Verificar los campos")
        }
        try {
            const token = window.localStorage.getItem("token");
            const bodyOptions = {
                username,
                email,
                name,
                lastName,
                gender,
                phone,
                dni,
                image: "vacio"
            }
            const response = await fetch(`${enviroments.backend.urlLocal}/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyOptions),
            });
            const {data} = await response.json()
            if(data) {
                success("Cambios realizados")
                setUpdateState(true)
            }
            if(data.error) {
                errorToast("complete los campos")
            }

        } catch (error) {
            errorToast("complete los campos")
            console.log(error)
        }
    }

    return (
        <div className='content-general col-12 col-lg-10 mx-auto d-flex flex-column align-items-center justify-content-center py-5'>
            <div className="col-11 col-lg-6 mb-5 mx-auto d-flex flex-column gap-5 pt-5">
                    <ImageChange loading={loading} username={username} image={image} />
                <div className="col-12 d-flex justify-content-between">
                    <div className="col-5">
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <TextField disabled={updateState} label="Nombre:" sx={{ width: "100%" }} variant="standard" onChange={(e) => setName(e.target.value)} defaultValue={name} />}
                    </div>
                    <div className="col-5">
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <TextField disabled={updateState} label="Apellido:" sx={{ width: "100%" }} variant="standard" onChange={(e) => setLastName(e.target.value)} defaultValue={lastName} />}
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="col-6">
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <TextField disabled={updateState} label="Emaiil:" sx={{ width: "100%" }} variant="standard" onChange={(e) => setEmail(e.target.value)} defaultValue={email} error={(!email.includes("@") || !email.includes("."))} helperText={(!email.includes("@") || !email.includes(".")) && "El Email debe contener @ y ."} />}
                    </div>
                    <div className="col-5">
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <TextField type='number' disabled={updateState} label="Telefono:" sx={{ width: "100%" }} variant="standard" onChange={(e) => setPhone(e.target.value)} defaultValue={phone} error={phone?.length !== 10} helperText={phone?.length !== 10 && "El telefono debe de tener 10 digitos."} />}
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="col-5">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Genero:</FormLabel>
                            <RadioGroup
                                className={loading ? "gap-1" : ""}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group" onChange={(e) => setGender(e.target.value)} value={gender}
                            >
                                {loading ? <Skeleton animation="wave" variant="rect" height={40} >
                                    <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" disabled={updateState} />
                                </Skeleton>
                                    : <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" disabled={updateState} />}
                                {loading ? <Skeleton animation="wave" variant="rect" height={40} >
                                    <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" disabled={updateState} />
                                </Skeleton>
                                    : <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" disabled={updateState} />}
                                {loading ? <Skeleton animation="wave" variant="rect" height={40} >
                                    <FormControlLabel value="Otro" control={<Radio />} label="Otro" disabled={updateState} />
                                </Skeleton>
                                    : <FormControlLabel value="Otro" control={<Radio />} label="Otro" disabled={updateState} />}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="col-5">
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <TextField disabled={updateState} label="DNI:" sx={{ width: "100%" }} variant="standard" type='number' onChange={(e) => setDni(e.target.value)} defaultValue={dni} />}
                    </div>
                </div>

            </div>
            {updateState ? <Button color="primary" onClick={() => setUpdateState(false)} variant="outlined">Cambiar valores</Button> : <div className="d-flex gap-3">
                <Button color="primary" variant="outlined" onClick={() => changeValues()}>Confirmar</Button>
                <Button color="primary" variant="outlined" onClick={() => setUpdateState(true)}>Cancelar</Button>
            </div>
            }
            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Settings