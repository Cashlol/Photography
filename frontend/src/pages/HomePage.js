import React, { useState, useEffect} from 'react'
import axios from "axios"
import AOS from 'aos';import 'aos/dist/aos.css';    
import 'aos/dist/aos.css';
import {Skeleton,Container,Typography,Grid} from '@mui/material';
import PhotoList from '../components/PhotoList/PhotoList.js'
import Banner from '../components/Banner/Banner.js';
import TextBanner from '../components/TextBanner/TextBanner.js';

const HomePage = () => {

    useEffect(() => {
        getPhoto()
        AOS.init()
        console.log(photos,"lmao")
    }, [])

    let [photos, setPhotos] = useState([])


    let getPhoto = () => {
        axios.get("/api/photos/").then((response) => {
            setPhotos(response.data)
        })
    }

    


    return (
        <>
        <Banner/>
        <Container sx = {{mb:15}}>
        <TextBanner/>
            <Typography 
                variant="h6" 
                textAlign={'center'}
            >
                FEATURED 
            </Typography>
            <Grid container spacing={3} sx={{mt:3}} p={2}>
                {photos.length>0 ? photos.map((photo, index) => (
                <Grid item md={12} >
                    <PhotoList photo={photo} key={index} getPhoto={getPhoto}/>
                </Grid>
                ))
                    :
                (
                    <Grid item md={12}>
                    <Typography variant="h5" textAlign={'center'}>
                        Looks like its empty now 
                    </Typography>
                    </Grid>
                )
            }
            </Grid>
        </Container>
        </>
        
    )
}

export default HomePage