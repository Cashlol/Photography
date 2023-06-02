import React from 'react'
import { Card,CardMedia, Typography, ImageList, ImageListItem, Box} from '@mui/material'
import { sizing } from '@mui/system';
import bannerImg from '../../assets/dark_ocean.jpg'
import './Banner.css'


let draft2 = () => (
  <Card className="banner-card">
    <CardMedia
      image={bannerImg}
      height="400"
      component="img"
    />
  </Card>
)

let draft = () =>(
  <div className='banner-image' 
    style={{
      backgroundImage: `url(${bannerImg})`
    }}>
    <Box className="float-text">
    <Typography variant="h1">SNAPS</Typography>
    </Box>
  </div>
)



const Banner = () => {
  return (
    <>
      {draft()}
    </>
  )
}

export default Banner
