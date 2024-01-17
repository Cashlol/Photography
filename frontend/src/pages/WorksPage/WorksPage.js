import React, { useState, useEffect} from 'react'
import axios from "axios"
import {Skeleton,Container,Typography,Grid} from '@mui/material';
import { motion , useScroll} from 'framer-motion'
import PhotoList from '../../components/PhotoList/PhotoList.js'
import './WorksPage.css'

const WorksPage = () => {

const [post, setPost] = useState({})

const {scrollYProgress} = useScroll()

useEffect(() => {
    getPost()
}, [])

const getPost = () => {
    axios.get("/api/posts/").then((response) => {
        setPost(response.data)
    })
}

const getMargin = () => {
  return  post.length > 1 ? 12 : 0
}

console.log(post.length)

  return (

    <Container>
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration:0.5}}
    >
    <div className="main-header">Featured</div>
    </motion.div>
    <motion.main
      // initial={{opacity: 0 , y:70}}
      // animate={{opacity: 1 , y:0}}
      // exit={{opacity: 0 , y:70, transition:{duration:0.3}}}
      // transition={{duration:0.3}}
    >
      <Grid container spacing={3} p={1}>
        {post.length>0 ? post.map((post, index) => (
        <Grid item md={12} mt={4} mb={getMargin()} key={post.id} >
            <PhotoList post={post} getPost={getPost}/>
        </Grid>
        ))
            :
        (
          <Grid item md={12}>
          <h5 className="display-empty">
          Looks like its empty now 
          </h5>
          </Grid>
        )
        }
        </Grid>
      </motion.main>
    </Container>
  )
}

export default WorksPage
