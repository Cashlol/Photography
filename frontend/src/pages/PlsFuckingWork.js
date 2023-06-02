import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {useDropzone} from 'react-dropzone';
import { Container, Typography, Button, List, ListItem, Card,CardActions,CardContent,CardMedia,IconButton, Paper} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import imgDef from './../assets/upload_image_default.png'

const PlsFuckingWork = () => {

    let imgRef = useRef()
    let history = useNavigate()
    let formData = new FormData()
    let photoId = useParams().id
    let [photos, setPhotos] = useState({})
    let [data, setData] = useState({})

    //determine whether photo id is null. if null return and cancel get request
    //if not null. allow get request to retrieve the intended photo
    useEffect(() => {
        if(photoId == null) return
        axios.get(`/api/photos/${photoId}`).then((response) => {
            setPhotos(response.data)
        })
    },[])


    //appends form data with photo, title and caption 
    //post the form data using axios to the api end point
    let handleUpdate = () => {      
        axios.put(`/api/photos/${photoId}/update/`, data, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).
        then((response) => {
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

    //on change function that stores photo
    //initialize the file reader for image preview
    let handlePhoto = (e) => {
        // setPhotos({...photos, photo_src : e.target.files[0]})
        setData({...data, photo_src : e.target.files[0]})
        // formData.append('photo_src', e.target.files[0])
    }

    //references the file input in the form for a click event
    let openFileUpload = (e) => {
        imgRef.current.click()
    }


  return (
    <>
      <Container>
            <Typography variant="h3" className="mb-3">Update Post</Typography>
    
            <Form className="mb-3">
                <Form.Group className="mb-3 mt-3" style={{display:'none'}} controlId="photo_src">
                    <Form.Label>Photo Src</Form.Label>
                    <Form.Control type="file" ref={imgRef} onChange={(e) => {handlePhoto(e)}}/>
                </Form.Group>
                <Button onClick={openFileUpload} variant="contained" className="mt-3 mb-3">Upload Image</Button>
                <Form.Group className="mb-3" controlId="photo_title">
                    <Form.Label>Photo Title</Form.Label>
                    <Form.Control type="text"  onChange={(e) =>setData({...data, photo_title : e.target.value})} defaultValue={photos?.photo_title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="photo_caption">
                    <Form.Label>Photo Caption</Form.Label>
                    <Form.Control as="textarea"  onChange={(e) => setData({...data, photo_caption : e.target.value})} defaultValue={photos?.photo_caption}/>
                </Form.Group>
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                
            </Form>
                        
   

        </Container>
    </>
  )
}


export default PlsFuckingWork
