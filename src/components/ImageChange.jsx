import { Avatar, Button, Skeleton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { enviroments } from '../enviroments'

const ImageChange = ({ loading, username, email }) => {
    const [changeImage, setChangeImage] = useState(false)

    

    return (
        <div className='d-flex flex-column flex-lg-row align-items-center'>
            <div className="col-12 col-lg-5 d-flex justify-content-center">
                {loading ? (
                    <Skeleton animation="wave" variant="circular" width={100} height={100} />
                ) : (
                    <div className='d-flex flex-column align-items-center'>
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <span className='text-center mb-3'>{username}</span>}
                        {!changeImage ? <Skeleton animation="wave" variant="rect" height={40} /> : <TextField disabled={!changeImage} label="Apellido:" sx={{ width: "100%" }} variant="standard" onChange={(e) => "asdasd"} defaultValue={"asdasd"} />}

                    </div>
                )}
            </div>
            {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : (<div className="ps-3 pt-4 col-12 col-lg-8 d-flex justify-content-center d-flex gap-2">
                {!changeImage ? <Button color="primary" variant="outlined" onClick={() => setChangeImage(true)}>Cambiar contraseña</Button> : <>
                    <Button color="primary" variant="outlined" onClick={() => ""}>Confirmar</Button>
                    <Button color="primary" variant="outlined" onClick={() => setChangeImage(false)}>Cancelar</Button>
                </>}
            </div>)
            }

        </div>

    )
}

export default ImageChange;
