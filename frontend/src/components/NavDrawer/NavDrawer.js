import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Box, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, styled} from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

const NavDrawer = () => {
  
  let [drawerOpen, setDrawerOpen] = useState(false)

  let navigate = useNavigate()

  let goBack = () => {
    navigate("/")
  }

  let list = () => (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={goBack}>
          <ListItemIcon sx={{color:'black'}}>
            <HomeRoundedIcon/>
          </ListItemIcon>
          <ListItemText>
              <Typography variant="subtitle1">Home</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{color:'black'}}>
            <InfoRoundedIcon/>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle1">About Us</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{color:'black'}}>
            <AccountBoxRoundedIcon/>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle1">Contact</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  )

  return (
    <>
      <IconButton 
        edge='start'
        size='large'
        color='inherit' 
        aria-label='logo' 
        sx={{mr:3}}
        onClick={()=>setDrawerOpen(true)}
      >
        <MenuIcon/>
      </IconButton>
      <Drawer 
        anchor='left' 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
      >
        <Box width='200px' role='presentation'
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
        {list()}
        </Box>
        <Divider/>
    </Drawer>

    </>
  )
}

export default NavDrawer
