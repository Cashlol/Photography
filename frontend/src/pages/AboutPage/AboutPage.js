import React, { useState, useEffect} from 'react'
import axios from "axios"
import {Container, Grid, Box} from '@mui/material';
import { motion } from 'framer-motion'
import './AboutPage.css'
import portfolio from '../../assets/portfolio.jpg'

const AboutPage = () => {

  return (
  
  <Grid container>
  <Grid item md={5}>
  <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    transition={{duration:0.5}}
  >
  <img src={portfolio} className="grid-image" height={'731px'}/>
  </motion.div>
  </Grid>
  
  <Grid item md={7} textAlign={'left'} className="grid-content" container>
  <Box p={4}>
  <Grid item>
  <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1, transition:{duration:0.5}}}
    exit={{opacity: 0, transition:{duration:0.2}}}
  >
    <div className="grid-subheader">HI, I'M</div>
  </motion.div>
  <motion.div
    initial={{opacity: 0, }}
    animate={{opacity: 1, transition:{duration:1}}}
    exit={{opacity: 0, transition:{duration:0.2}}}
  >
    <div className="grid-header">JANE DOE</div>
  </motion.div>
  </Grid>
  <Grid item md={8}>
  <motion.div
    initial={{opacity: 0, }}
    animate={{opacity: 1, transition:{duration:1}}}
    exit={{opacity: 0, transition:{duration:0.2}}}
  >
    <div className="grid-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt vehicula dui ut congue. Integer at neque ante. </div>
    <div className="grid-body">Fusce facilisis, urna in porttitor pulvinar, mi risus placerat ipsum, eget pretium ipsum leo sed tortor....... </div>
  </motion.div>
  </Grid>
  </Box>
  </Grid>
  </Grid>  
  
  )
}

export default AboutPage
