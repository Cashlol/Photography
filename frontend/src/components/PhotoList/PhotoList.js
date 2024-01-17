import React , { useState, useEffect }from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {motion, useScroll} from 'framer-motion'
import axios from 'axios'
import { Grid,Button,IconButton, Modal, Box} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './PhotoList.css'

 
const PhotoList = ({post, getPost}) => {

const [open, setOpen] = useState(false)
const navigate = useNavigate()
const handleClose = () => setOpen(false)
const handleOpen = () => setOpen(true)

const handleDelete = () => {
  axios.delete(`/api/post/${post?.id}/delete/`).then(() => {
    getPost()
    handleClose()
  })
}
  
const getDateString = (date) => {

  const options = {year:'numeric',month:'long',day:'numeric'}
  return new Date(date).toLocaleDateString(undefined,options)
  
}

const getCaption = (content) => {
  const caption = content.replaceAll('\n','')
  if(caption.length>150)
    return caption.slice(0,150) + ' ...'
  else
    return caption
}

const height = ["280","280"]
const width = ["100%", "100%"]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500',
  bgcolor: 'white',
  borderRadius:'10px',
  boxShadow: 24,
  p: 3,
}

const draft2 = () => (

<Grid container>

<Grid item md={3} sm={6} xs={12} style={{overflow:'hidden'}} mt={5}>
<motion.div
  initial={{opacity:0, width:0}}
  animate={{opacity:1, width:'100%'}}
  exit={{opacity:0, width:0}}
  transition={{duration:0.5}}
>
<img src={post.post_photo[0].image} height={'400px'} width={'90%'} className='media-card'/>
</motion.div>
  
</Grid>
<Grid item md={3} container spacing={1}>
{post.post_photo.slice(1,3).map((photos, index) => (
<Grid item style={{overflow:'hidden'}} key={photos.id}>
<motion.div
  initial={{opacity:0, width:0}}
  animate={{opacity:1, width:'100%'}}
  exit={{opacity:0, width:0}}
  transition={{duration:0.5}}
>
<img src={photos.image} height={height[index]} width={width[index]} className='media-card'/>
</motion.div>
</Grid>
))}
</Grid>


<Grid item md={6} sm={12} xs={12} container className="caption-overlap">
<motion.div
  initial={{opacity:0}}
  animate={{opacity:1}}
  exit={{opacity:0}}
  transition={{duration:0.5}}
>
<Grid item md={12} container>
<Grid item>
<div className="card-header">{post?.post_title}</div>
<div className="card-date">{getDateString(post?.date_uploaded)}</div>
</Grid>
<Grid item>
<div className="card-content">{post?.post_caption !== null && getCaption(post?.post_caption)}</div>
</Grid>
<Modal
  open={open}
  onClose={handleClose}
>
<Box sx={style} textAlign={'center'}>
  <div variant="h6" sx={{mb:2}}>Are you sure you want to delete ?</div>
  <Button variant="contained" sx={{mr:2}} onClick={handleDelete}>Confirm</Button>
  <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
</Box>
</Modal>
<Button onClick={() => navigate(`/post/${post?.id}`)}>View Collection</Button>
  <IconButton onClick={handleOpen}>
  <DeleteIcon/>
</IconButton>
  <IconButton onClick={() => navigate(`/post/${post?.id}/update`)}>
  <EditIcon/>
</IconButton>
</Grid>
</motion.div>
</Grid>
</Grid>
  
)

return (
  <>     
    {draft2()}
  </>
)
}

export default PhotoList

