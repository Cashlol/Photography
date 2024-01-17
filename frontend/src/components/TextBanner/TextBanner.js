import React, { useEffect } from 'react'
import { Typography,Grid, Divider, Box } from '@mui/material'
import './TextBanner.css'
import { motion } from 'framer-motion'

const TextBanner = () => {

    return (
        <>
        <Box className="float-text">
        <Grid container sx={{mb:15,mt:15}}>
        <Grid item md={6} textAlign={'left'}>
        <motion.article 
            initial={{opacity: 0, x:-50}}
            animate={{opacity: 1, x:0}}
            transition={{duration:0.5}}
            exit={{opacity: 0,  transition: {duration:0.5}}}
        >
            <Typography sx={{fontSize:'4em', color:'#FFFFFF'}}>
            YOUR DREAM MAKERS
            </Typography>
            <Typography variant="h5" sx={{color:'#FFFFFF'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Typography variant="body2" sx={{mt:4 , color:'#FFFFFF'}}>
                -"Lorem ipsum dolor sit amet"
            </Typography>
        </motion.article>
        </Grid>
        </Grid>
        </Box>
        </>
    )
}


export default TextBanner
