import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { motion } from 'framer-motion'
import { Grid, Box, Typography, Button} from '@mui/material'
import './HomePage.css'
import bannerImg from '../../assets/banner4.jpg'
import {ReactComponent as Arrow} from '../../assets/Arrow2.svg'


const HomePage = () => {

    const [post, setPost] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getPost()
    }, [])

    const getPost = () => {
        axios.get("/api/posts/").then((response) => {
            setPost(response.data)
        })
    }

    const draft = () => (
        <Box>
        <motion.div 
            initial={{opacity: 0, width:0}}
            animate={{opacity:1, width:'100%'}}
            exit={{opacity:0, width:0}}
            transition={{duration:0.5}}
        >
        <Grid container>
        <Grid md={6} item>
        <img src={bannerImg} className="grid-banner"/>
        </Grid>
        <Grid md={6} item>
        <Box className="grid-text" textAlign={'center'} p={20}>
        <Typography variant="h2">
        Professional Dream Makers
        </Typography>
        </Box>
        </Grid> 
        </Grid>
        </motion.div>
        </Box>
    )

    const draft2 = () => (
        <motion.main 
            initial={{opacity: 0, width:0}}
            animate={{opacity:1, width:'100%'}}
            exit={{opacity:0, width:0}}
            transition={{duration:0.5}}
        >
        <div
            style={{background:`url(${bannerImg})`}}
            className="landing-banner"
        >
        <div className="float-text">
        <Typography sx={{fontSize:'6em', textAlign:'center'}}>SNAPS</Typography>
        <Typography sx={{fontSize:'2.5em', textAlign:'center'}}>Professional Dream Makers</Typography>
        <Button variant="outlined" className="main-button" onClick={() => navigate('/contact')}>Work with us</Button>
        {/* <div href="#" className="link-animate">
        <Arrow className="arrow-left"/>
        <Typography variant="h5" className="text-animate">View Our Works</Typography>
        </div> */}
        </div>
        </div>
        </motion.main>
    )


    return (
        draft2()
    )
}

export default HomePage