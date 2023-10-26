import { Avatar, Button, Skeleton } from '@mui/material'
import React, { useState } from 'react'

const ImageChange = ({ loading, username, image }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [changeImage, setChangeImage] = useState(false)

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleImageUpload = async () => {
        if (!selectedFile) {
            alert('Selecciona una imagen antes de cargar.');
            return;
        }
        
const cloudName = 'dhtqkecgl';
const apiKey = 'A9UICs_vYl0D5-rLX1Pm9F-7eHU';
const timestamp = new Date()
const signature = new Date()

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        
        try {
            // Realiza la solicitud de carga a Cloudinary utilizando fetch
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log('Imagen cargada con éxito:', responseData);

                // Limpia el archivo seleccionado después de cargarlo
                setSelectedFile(null);
            } else {
                console.error('Error al cargar la imagen:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud de carga:', error);
        }
    };
    return (
        <div className='d-flex flex-column flex-lg-row align-items-center'>
            <div className="col-12 col-lg-5 d-flex justify-content-center">
                <input type="file" className='d-none' id='image' accept="image/*" onChange={handleFileSelect} />
                {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
                {loading ? (
                    <Skeleton animation="wave" variant="circular" width={100} height={100} />
                ) : (
                    <div className='d-flex flex-column align-items-center'>
                        <label htmlFor="image">
                        <Avatar
                            alt="Remy Sharp"
                            src={image}
                            sx={{ width: 100, height: 100 }}
                        />
                        </label>
                        {loading ? <Skeleton animation="wave" variant="rect" height={40} /> : <span className='text-center'>{username}</span>}

                    </div>
                )}
            </div>
            { loading ? <Skeleton animation="wave" variant="rect" height={40} /> : (<div className="ps-3 pt-4 col-12 col-lg-8 d-flex justify-content-center d-flex gap-2">
                {!changeImage ? <Button color="primary" variant="outlined" onClick={()=> setChangeImage(true)}>Upload New</Button>: <>
                <Button color="primary" variant="outlined" onClick={()=> handleImageUpload()}>Confirmar</Button>
                <Button color="primary" variant="outlined" onClick={()=> setChangeImage(false)}>Cancel</Button>
                </>}
            </div> )
            }
            
        </div>

    )
}

export default ImageChange;
