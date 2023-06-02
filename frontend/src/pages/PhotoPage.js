import React, { useEffect, useState} from 'react'
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Typography, Grid, Card, CardContent, CardActions, Container} from '@mui/material'

const PhotoPage = () => {

let navigate = useNavigate()

let photoId = useParams().id

let [photo, setPhoto] = useState(null)

//gets a response from api endpoint 
//sets the response into a state to be rendered

useEffect(() => {

    axios.get(`/api/photos/${photoId}/`).then((response) => {
        setPhoto(response.data)
    })

}, [photoId])


  return (
    <>
    <Container>
      <Typography variant="h2" textAlign="center">{photo?.photo_title}</Typography>
      <Grid container spacing={3} p={4} mt={5}>
        <Grid item md={5}>
          <img src={photo?.photo_src} className="grid-image" style={{objectFit:'contain',width:'100%'}}/>
        </Grid>
        <Grid item md={4} sx={{margin:'auto'}}>
          <Typography variant="body1" textAlign='right'>{photo?.photo_caption}</Typography>
        </Grid>
      </Grid>
    </Container>
    </>
  )
}

export default PhotoPage
