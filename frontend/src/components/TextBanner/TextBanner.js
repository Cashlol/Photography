import React, { useEffect } from 'react'
import { Typography,Grid, Divider } from '@mui/material'
import AOS from 'aos';import 'aos/dist/aos.css';    
import 'aos/dist/aos.css';

const TextBanner = () => {

    useEffect(() => {
        AOS.init()
    },[])

    return (
        <>
        <Grid container sx={{mb:15,mt:15}}>
            <Grid item md={6} textAlign={'left'}>
                <Typography sx={{fontSize:'5em' }}>
                YOUR DREAM MAKERS
                </Typography>
            </Grid>
            
            <Grid item p={3} md={6} textAlign={'left'}  data-aos="fade-in">
                <Typography variant="h4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Typography variant="body1" sx={{mt:4}}>
                    -"Lorem ipsum dolor sit amet"
                </Typography>
            </Grid>
        </Grid>
        </>
    )
}


export default TextBanner
