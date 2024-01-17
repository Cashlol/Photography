import React, {useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AuthContext from '../context/AuthContext.js';

const MenuButton = () => {

const {handleLogout} = useContext(AuthContext)  
const navigate = useNavigate()  

const location = useLocation()

// const colorChange = {
//   color: location.pathname !== '/' ? "black" : "#FFFFFF"
// }


const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};
const handleClose = () => {
setAnchorEl(null);
};

  return (
    <div>
      <Button
        id="basic-button"
        onClick={handleClick}
        style={{color:'#000000'}}
      >
        Actions
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/post/add')}>Add Post</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuButton
