import React, { useContext, useEffect, useState, MouseEvent} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {Box, Typography, AppBar, Toolbar, Button, Container,Menu, MenuItem,useMediaQuery, useTheme} from '@mui/material'
import NavDrawer from '../NavDrawer/NavDrawer.js'
import MenuButton from '../Menu/MenuButton.js'
import './Navbar.css'


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

  const location = useLocation()

  // const colorChange = {
  //   color: location.pathname !== '/' ? "black" : "#FFFFFF"
  // }

  const textStyle = {color:'#000000'}

  const navigate = useNavigate()

  const Appbar = () => (
    <Container>
      <AppBar
        className='nav-bar'
        position="fixed"
      >
        <Toolbar>
          {isSmall ? <NavDrawer/> : 
          <>
            <div onClick={() => navigate('/')} className="nav-logo">
            SNAPS
            </div>
            <Box sx={{display:'flex'}}>
              <Button onClick={() => navigate('/posts')} style={textStyle}>Works</Button>
              <Button onClick={() => navigate('/about')} style={textStyle}>About</Button>
              <Button onClick={() => navigate('/contact')} style={textStyle}>Contact</Button>
              <MenuButton />
            </Box>
          </>}
        </Toolbar>
      </AppBar>
    </Container>
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
