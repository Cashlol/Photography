import React, { useState, useEffect} from 'react'
import axios from "axios"
import {Container, Grid, Box, Button} from '@mui/material';
import Form from 'react-bootstrap/Form';
import { motion } from 'framer-motion'
import styles from './ContactPage.module.css'
import sideImage from '../../assets/Couples-Photographer26.jpg'

const ContactPage = () => {
  return (
 
    <Grid container>

      
    <Grid item md={5}>
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration:0.5}}
    >
    <img src={sideImage} className={styles.grid_image} height={'731px'}/>
    </motion.div>
    </Grid>
    
    <Grid item md={7} textAlign={'left'} className={styles.grid_content}>
    <Box p={4}>
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1, transition:{duration:0.5}}}
      exit={{opacity: 0, transition:{duration:0.2}}}
    >
      
    <div className={styles.form_header}>Let's Talk !</div>
    <Form>
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder='John Doe' className={styles.form_input}/>
        </Form.Group>
      </Grid>
      <Grid item md={6}>
        <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder='johndoe@gmail.com' className={styles.form_input}/>
        </Form.Group>
      </Grid>
      <Grid item md={12}>
        <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={5} placeholder='Let us know whats on your mind' className={styles.form_input}/>
        </Form.Group>
      </Grid>
    </Grid>
    <button className={styles.form_button}>Send</button>
    </Form>
    
    <Grid item container spacing={10} mt={0} className={styles.social_links}>
      <Grid item>
        <div>Instagram | Twitter</div>
      </Grid>
      <Grid item>
        <div>snaps@gmail.com</div>
      </Grid>
    </Grid>

    </motion.div>
    </Box>
    </Grid>

    
    </Grid>  
  )
}

export default ContactPage

