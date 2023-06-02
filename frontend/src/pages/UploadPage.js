import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Container, Typography, Button, Card,CardMedia,IconButton, Paper} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import imgDef from './../assets/upload_image_default.png'

const AddPage = () => {

    let imgRef = useRef()
    let history = useNavigate()
    let photoId = useParams().id
    let [photos, setPhotos] = useState({})
    let [data, setData] = useState({})
    let [photoData, setPhotoData] = useState('')

    //determine whether photo id is null. if null return and cancel get request
    //if not null. allow get request to retrieve the intended photo
    useEffect(() => {
        if(photoId == null) return
        axios.get(`/api/photos/${photoId}`,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then((response) => {
            setPhotos(response.data)
        })
    },[])


    //appends form data with photo, title and caption 
    //post the form data using axios to the api end point
    let handleSubmit = () => {
        axios.post("/api/photos/create/", data, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then((response) => {
                console.log(response.data)
                Swal.fire({
                title:'Success!',
                text:'Photo have been uploaded',
                icon:'success',
                confirmButtonText:'Cool'
            }).then((result) => {
                if(result.isConfirmed)
                    history('/')
            })
            
        })
    }

    //fix the update function aint working like shit
    let handleUpdate = () => {
        console.log('UPDATING', data)
        axios.put(`/api/photos/${photoId}/update/`, data , {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then((response) => {
                console.log(response.data)
                Swal.fire({
                title:'Success!',
                text:'Photo have been updated',
                icon:'success',
                confirmButtonText:'Cool'
            }).then((result) => {
                if(result.isConfirmed)
                    history('/')
            })
            
        })
    }

    //set the current file input value to null
    //sets photo data and photo to null
    let handleDelete = () => {
        imgRef.current.value = null
        setPhotoData('')
        setPhotos({...photos, photo_src:''})
    }

    //on change function that stores photo
    //initialize the file reader for image preview
    let handlePhoto = (e) => {
        if(e){
            setData({...data, photo_src : e.target.files[0]})
            let reader = new FileReader()
            reader.addEventListener("load", () => {
                setPhotoData(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    let handleCancel = () => {
        history('/')
    }

    //references the file input in the form for a click event
    let openFileUpload = (e) => {
        imgRef.current.click()
    }

    return (
        <>
        <Container>
            {photoId ? 
            <Typography variant="h3" className="mb-3">Update Post</Typography>:
            <Typography variant="h3" className="mb-3">Add Post</Typography>
            }
            <Row>
                {photos.photo_src || photoData ?
                <Col lg={5} md={5} sm={12}>
                <Card>
                    <CardMedia
                        component="img"
                        src={photos.photo_src || photoData}
                        height="300"
                    />
                    <IconButton sx={{float:'right',}} onClick={handleDelete}>
                        <DeleteIcon sx={{color:'red'}}/>
                    </IconButton>
                </Card> 
                </Col>
                    :
                <Col lg={5} md={5} sm={12}>
                <div>
                    <Paper>
                        <img src={imgDef} onClick={openFileUpload} 
                            style={{
                                objectFit:'contain',
                                width:'60%',
                                margin:'auto',
                                display:'block',
                                cursor:'pointer'
                        }}/>
                        <Typography textAlign={'center'}>No File Chosen</Typography>
                    </Paper>
                </div>
                </Col>
                }
            </Row>
                
            <Form className="mb-3">
                <Form.Group className="mb-3 mt-3" style={{display:'none'}} controlId="photo_src">
                    <Form.Label>Photo Src</Form.Label>
                    <Form.Control type="file" ref={imgRef} onChange={(e) => {handlePhoto(e)}}/>
                </Form.Group>
                <Button onClick={openFileUpload} variant="contained" className="mt-3 mb-3">Upload Image</Button>
                <Form.Group className="mb-3" controlId="photo_title">
                    <Form.Label>Photo Title</Form.Label>
                    <Form.Control type="text"  onChange={(e) => {setData({...data, photo_title : e.target.value})}} defaultValue={photos?.photo_title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="photo_caption">
                    <Form.Label>Photo Caption</Form.Label>
                    <Form.Control as="textarea"  onChange={(e) => {setData({...data, photo_caption : e.target.value})}} defaultValue={photos?.photo_caption}/>
                </Form.Group>
                {photoId ? 
                    <>
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                    <Button onClick={handleCancel} variant="outlined" sx={{ml:3}}>Cancel</Button>
                    </> :
                    <Button onClick={handleSubmit} variant="contained">Submit</Button>
                }
                
            </Form>
                        
   

        </Container>
        </>
    )
}

export default AddPage
