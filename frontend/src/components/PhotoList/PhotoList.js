import React , { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card,CardActions,CardContent,CardMedia, CardHeader,Grid,Typography,Button,IconButton, Modal, Box} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import './PhotoList.css'
import caution from '../../assets/exclamation.png'
 
const PhotoList = ({photo, getPhoto}) => {

  let [open, setOpen] = useState(false)

  let handleClose = () => setOpen(false)
  let handleOpen = () => setOpen(true)

  let handleDelete = () => {
    axios.delete(`/api/photos/${photo?.id}/delete/`).then(() => {
      getPhoto()
      handleClose()
    })
  }

  let getCaption = (content) => {
    let caption = content.replaceAll('\n','')
    if(caption.length>150)
      return caption.slice(0,150) + ' ...'
    else
      return caption
  }

  
  let style = {
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



  let draft = () =>(
      <Card className="card-list">
        <Grid container spacing={4}>
          <Grid item md={6} sm={6} xs={12} style={{overflow:'hidden'}}>
            <CardMedia
              component="img"
              image={photo?.photo_src}
              height="400"
              className="hover-media-card"
            />
          </Grid>
          <Grid item md={5} sm={6} xs={12} p={3}>
            <CardHeader
              title={
                <Typography 
                  variant="h4" 
                >
                  {photo?.photo_title}
                </Typography>
              }
            />
            <CardContent>
                <Typography variant="body1">{photo?.photo_caption !== null && getCaption(photo?.photo_caption)}</Typography>
            </CardContent>
            <CardActions>
            <Modal
              open={open}
              onClose={handleClose}
            >
            <Box sx={style} textAlign={'center'}>
              <Typography variant="h6" sx={{mb:2}}>Are you sure you want to delete ?</Typography>
              <Button variant="contained" sx={{mr:2}} onClick={handleDelete}>Confirm</Button>
              <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
            </Modal>
              <Link to ={`/photos/${photo?.id}`} style={{textDecoration:'none'}}>
                  <Button>View More</Button>
              </Link>
              <IconButton onClick={handleOpen}>
                <DeleteIcon sx={{color:'red'}}/>
              </IconButton>
              <Link to ={`/photos/${photo?.id}/update`}>
                <IconButton>
                  <EditIcon sx={{color:'green'}}/>
                </IconButton>
              </Link>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
  )

  let draft2 = () => (
    <Grid container>
      <Grid md={6} sm={6} xs={12} item style={{overflow:'hidden'}}>
        <img src={photo?.photo_src} height="400" className="hover-media-card"/>
      </Grid>
      <Grid md={5} sm={6} xs={12} item sx={{p:4}} container>
        <Grid item>
          <Typography variant="h4">{photo?.photo_title}</Typography>
          <Typography variant="body1" sx={{mt:3}}>{photo?.photo_caption !== null && getCaption(photo?.photo_caption)}</Typography>
        </Grid>
        <Grid item sx={{mt:2}}>
          <Link to ={`/photos/${photo?.id}`} style={{textDecoration:'none'}}>
            <Button>View More</Button>
          </Link>
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{color:'red'}}/>
          </IconButton>
          <Link to ={`/photos/${photo?.id}/update`}>
          <IconButton>
            <EditIcon sx={{color:'green'}}/>
          </IconButton>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <>     
      {draft()}
    </>
  )
}

export default PhotoList
