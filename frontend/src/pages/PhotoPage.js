import React, { useEffect, useState} from 'react'
import axios from "axios"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Typography, Grid, Container, ImageList, ImageListItem} from '@mui/material'
import { motion } from 'framer-motion' 


const PhotoPage = () => {

  const postId = useParams().id
  const [post, setPost] = useState({})
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    getPost()
  },[])

  useEffect(() => {
    setPhotos(post?.post_photo)
  },[post])

  //gets a response from api endpoint 
  //sets the response into a state to be rendered

  const getPost = () => {

    axios.get(`/api/post/${postId}/`).then((response) => {
      setPost(response.data)
    })

  }

  return (
    <motion.main
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:0.5}}
    >
    <Container>

      {/* <motion.h2
        initial={{opacity:0, y:-20}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-20}}
        transition={{duration:0.5}}
      >
      <Typography variant="h2" sx={{textAlign:'center',mt:12}}>{post?.post_title}</Typography>
      </motion.h2> */}
      
      <Grid container spacing={2} mt={15}>
      <ImageList variant="masonry" cols={3} gap={20}>
      {photos?.map((photos, index) => (
      <ImageListItem key={photos?.image}>
      <img
        src={`${photos.image}?w=248&fit=crop&auto=format`}
        srcSet={`${photos.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={photos.name}
        loading="lazy"
      />
      </ImageListItem>
      ))}
      </ImageList>
      </Grid>

    </Container>
    </motion.main>
  )
}

export default PhotoPage
