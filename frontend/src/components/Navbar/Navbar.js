import React, { useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Box, Typography, AppBar, Toolbar, Button} from '@mui/material'
import { useMediaQuery, useTheme } from "@mui/material";
import NavDrawer from '../NavDrawer/NavDrawer.js'
import './Navbar.css'
import AuthContext from '../context/AuthContext.js';

const Navbar = () => {

  // let [offSet,setOffSet] = useState(0)

  // let handleScroll = () => {
  //   const onScroll = () => setOffSet(window.pageYOffset);
  //   window.removeEventListener('scroll', onScroll);
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', onScroll);
  // }
  
  // useEffect(() => {
  //   handleScroll()
  // }, [])
  const {handleLogout} = useContext(AuthContext)

  const Appbar = () => (
    <Box sx={{mb:8}}>
      <AppBar
        className='nav-bar'
      >
        <Toolbar>
          {isSmall ? <NavDrawer/> : ''}
          
          <Typography variant="h5" component="div" sx={{flexGrow:1}}>
          SNAPS
          </Typography>
          <Link to="/photos/add">
          <Button variant="contained" className="post-button" sx={{mr:1}}>Add Post</Button>
          </Link>
          <Button variant="outlined" className="logout-button" sx={{mr:1}} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )

  let theme = useTheme()
  let isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <>
      <Appbar/>
    </>
  )
}

export default Navbar
