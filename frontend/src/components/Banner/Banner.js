import React from 'react'
import { Card,CardMedia, Typography, ImageList, ImageListItem, Box} from '@mui/material'
import { sizing } from '@mui/system';
import bannerImg from '../../assets/banner.jpg'
import './Banner.css'
import TextBanner from '../TextBanner/TextBanner';


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
    <TextBanner/>
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
