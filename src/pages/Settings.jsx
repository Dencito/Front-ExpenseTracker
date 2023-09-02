import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Settings = () => {
    const [updateState, setUpdateState] = useState(true)
    const user = {
        name: "Denar",
        surname: "Santiago",
        email: "santiago.denar@gmail.com",
        numberTelephone: "1122334455",
        gender: "Masculino",
        DNI: "12345678",
    }
    const success = (title) => toast.success(title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const changeValues = ()=> {
success("Datos cambiados")
setUpdateState(true)
setTimeout(()=>{
window.location.replace("/configuracion")
},2000)
    }
    return (
        <div className='content-general col-10 d-flex flex-column align-items-center justify-content-center py-5'>
            <div className="col-5 mb-5 d-flex flex-column gap-5">
                <div className='d-flex align-items-center'>
                    <div className="col-5"><Avatar
                        alt="Remy Sharp"
                        src="https://media.licdn.com/dms/image/C4E03AQFZpj52hJqUKw/profile-displayphoto-shrink_400_400/0/1623787594887?e=1698883200&v=beta&t=5pqdURIDZ3ZYkms_zLCW2-QyCYDvnlFqlmrSQq4SxUk"
                        sx={{ width: 100, height: 100 }}
                    /></div>
                    <div className="col-8 d-flex gap-2">
                        <Button color="primary" variant="outlined">Upload New</Button>
                        <Button color="primary" variant="outlined">Delete avatar</Button>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="col-5">
                        <TextField disabled={updateState} label="Nombre:" sx={{ width: "100%" }} variant="standard" defaultValue={user.name} />
                    </div>
                    <div className="col-5">
                        <TextField disabled={updateState} label="Apellido:" sx={{ width: "100%" }} variant="standard" defaultValue={user.surname} />
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="col-6">
                        <TextField disabled={updateState} label="Emaiil:" sx={{ width: "100%" }} variant="standard" defaultValue={user.email} />
                    </div>
                    <div className="col-5">
                        <TextField type='number' disabled={updateState} label="Telefono:" sx={{ width: "100%" }} variant="standard" defaultValue={user.numberTelephone} />
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="col-5">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Genero:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group" defaultValue={user.gender}
                            >
                                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" disabled={updateState} />
                                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" disabled={updateState} />
                                <FormControlLabel value="Otro" control={<Radio />} label="Otro" disabled={updateState} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="col-5">
                        <TextField disabled={updateState} label="DNI:" sx={{ width: "100%" }} variant="standard" type='number' defaultValue={user.DNI} />
                    </div>
                </div>

            </div>
            {updateState ? <Button color="primary" onClick={() => setUpdateState(false)} variant="outlined">Cambiar valores</Button> : <div className="d-flex gap-3">
            <Button color="primary" variant="outlined" onClick={changeValues}>Confirmar</Button>
            <Button color="primary" variant="outlined" onClick={()=> setUpdateState(true)}>Cancelar</Button>
            </div>
            }
            <div>
                        <ToastContainer />
                    </div>
        </div>
    )
}

export default Settings