import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Container, Grid, IconButton, Alert, AlertTitle } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./UploadPage.module.css";

const AddPage = () => {
  const imgRef = useRef();
  const history = useNavigate();
  const photoId = useParams().id;
  const [isSubmit, setIsSubmit] = useState(false);
  const [displayImg, setDisplayImg] = useState([]);
  const [photos, setPhotos] = useState([]);
  const formData = new FormData();

  const [data, setData] = useState({
    post_title: "",
    post_caption: "",
    post_photo: [],
  });

  const [titleError, setTitleError] = useState({
    title: "Please enter the title",
    title_valid: false,
  });
  const [captionError, setCaptionError] = useState({
    caption: "Please enter the description",
    caption_valid: false,
  });

  formData.append("post_title", data.post_title);
  formData.append("post_caption", data.post_caption);

  //determine whether photo id is null. if null return and cancel get request
  //if not null. allow get request to retrieve the intended photo
  useEffect(() => {
    if (photoId == null) return;
    axios
      .get(`/api/posts/${photoId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDisplayImg(response.data);
      });
  }, []);

  //validate each input to determine whether its empty
  const handleTitle = (value) => {
    if(value === ''){
      console.log('Title false')
      setTitleError({...titleError, title: "Please enter the title" ,title_valid : false})
    } else{
      setTitleError({...titleError, title: "" ,title_valid : true})
      setData({ ...data, post_title: value });
      console.log('Title true')}
  }

  const handleCaption = (value) => {
    if(value === ''){
      console.log('Caption false')
      setCaptionError({...captionError, caption: "Please enter the description" ,caption_valid : false})
    } else{
      setCaptionError({...captionError, caption: "" ,caption_valid : true})
      setData({ ...data, post_caption : value });
      console.log('Caption true')}
  }

  //appends form data with photo, title and caption
  //post the form data using axios to the api end point
  const handleSubmit = (e) => {

    e.preventDefault();
    setIsSubmit(true);

    if(titleError.title_valid && captionError.caption_valid && photos.length!==0)
    {

      for (let key in photos) {
        formData.append(`post_photo[${key}]image`, photos[key]);
      }
  
      axios
        .post("/api/post/create/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "Success!",
            text: "Photo have been uploaded",
            icon: "success",
            confirmButtonText: "Cool",
          }).then((result) => {
            if (result.isConfirmed) history("/posts");
          });
        })
        .catch((error) => {
          console.log("Failed");
        });
    } else {


    }


  };

  //fix the update function aint working like shit
  const handleUpdate = () => {
    console.log("UPDATING", data);
    axios
      .put(`/api/post/${photoId}/update/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: "Success!",
          text: "Photo have been updated",
          icon: "success",
          confirmButtonText: "Cool",
        }).then((result) => {
          if (result.isConfirmed) history("/");
        });
      });
  };

  //removes the file and image from the state based on given index
  //if it works it aint stupid
  const handleDelete = (index) => {
    setDisplayImg((images) => {
      return images.filter((_, i) => i !== index);
    });

    setPhotos((photo) => {
      return photo.filter((_, i) => i !== index);
    });

    console.log("New Images", displayImg);
  };

  //on change function that previews photo before upload
  //store files into an array after creating an object url for corresponding files
  const handlePhoto = (e) => {
    const selectedFiles = [];
    const previewFilesObj = [...e.target.files];

    previewFilesObj.map((file) => {
      return selectedFiles.push(URL.createObjectURL(file));
    });

    //preview photos on cards
    setDisplayImg(selectedFiles);
    setPhotos([...e.target.files]);
  };

  const handleCancel = () => {
    history("/posts");
  };

  const openFileUpload = () => {
    imgRef.current.click();
   
  };

  console.log("Photos", photos);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="false">
        <Grid container spacing={0}>
          <Grid item md={5}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.main_header}>
                {photoId ? "Update Post " : "Upload Post"}
              </div>
            </motion.div>
            <Form>
              <Form.Group 
                controlId="post_title"
                className={styles.form_input}
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    handleTitle(e.target.value)
                  }}
                  isValid={isSubmit && titleError?.title_valid}
                  isInvalid={isSubmit && !!titleError?.title}
                />
                {titleError?.title && (
                <Form.Control.Feedback type="invalid">
                  {titleError?.title}
                </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                controlId="post_caption"
                className={styles.form_input}
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Something interesting goes here ...."
                  onChange={(e) => {
                    handleCaption(e.target.value)
                  }}
                  isValid={isSubmit && captionError?.caption_valid}
                  isInvalid={isSubmit && !!captionError?.caption}
                />
                {captionError?.caption && (
                <Form.Control.Feedback type="invalid">
                {captionError?.caption}
                </Form.Control.Feedback>
                )}

              </Form.Group>
              <Form.Group>
                <button
                  type="button"
                  onClick={() => openFileUpload()}
                  className={styles.form_button}
                >
                  Browse
                </button>
                <button
                  className={styles.form_button_alt}
                  onClick={(e) => handleSubmit(e)}
                >
                  {photoId ? "Update " : "Upload"}
                </button>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  ref={imgRef}
                  onChange={(e) => {
                    handlePhoto(e);
                  }}
                  multiple
                  className={styles.hide}
                />
              </Form.Group>
            </Form>
          </Grid>

          <Grid item md={1}></Grid>

          <Grid
            item
            container
            md={6}
            className={styles.photo_mosaic}
            spacing={1}
            sx={{
              justifyContent: displayImg.length > 0 ? "" : "center",
              alignItems: displayImg.length > 0 ? "" : "center",
              marginTop: "5em",
            }}
          >
            {displayImg.length > 0 ? (
              displayImg.map((photo, index) => (
                <Grid item md={4} style={{ position: "relative" }} key={index}>
                  <span className={styles.card_action}>
                    {/* <IconButton>
                    <EditIcon sx={{color:'white'}}/>
                  </IconButton> */}
                    <IconButton onClick={() => handleDelete(index)}>
                      <ClearIcon sx={{ color: "white" }} />
                    </IconButton>
                  </span>
                  <img
                    src={photo}
                    className={styles.media_card}
                    width="100%"
                    height="300"
                  />

                  {/* <Card key={index}>
                    <CardMedia
                      component="img"
                      src={photo}
                      height="250"
                      width="150"
                    />
                  </Card> */}
                </Grid>
              ))
            ) : ((isSubmit && photos.length == 0) ? 
              <Alert severity="error">
                <AlertTitle>You need to upload some photos</AlertTitle>
              </Alert>
              :
              <div>
                Uploaded images will be shown here
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </motion.main>
  );
};

export default AddPage;
