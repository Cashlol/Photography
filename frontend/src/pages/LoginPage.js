import React, {useState, useEffect, useContext} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography  from '@mui/material/Typography';
import './LoginPage.css'
import AuthContext from '../components/context/AuthContext';


const Login = () => {

  //styling for components 
  const paperStyle = {padding:20, height:'60vh', width:380, margin:"20px auto"}
  const inputStyle = {marginBottom:20}
  const loginStyle = {width:"100%", height:'5vh', margin:"5px auto", borderRadius:15}
  //
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})

  const { loginDets, setLoginDets, handleLogin, handleLogout } = useContext(AuthContext)

  //validation checker using regex
  // const validateEmail = () => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  //   if(!emailRegex.test(email) || email === '' || email.length == 0){
  //     setErrors({...errors, email : 'Please enter a valid email address', email_valid : false})
  //   } else {
  //     setErrors({...errors, email : '', email_valid : true})
  //   }
  // }

  const validateUsername = () => {
    if(username === ''){
      setErrors({...errors, username : 'Please enter your user name', user_valid : false})
    } else {
      setErrors({...errors, username : '', user_valid : true})
      setLoginDets({...loginDets, username : username})
    }
  }
  
  const validatePass = () => {
    if(pass === ''){
      setErrors({...errors, pass : 'Please enter your password', pass_valid : false})
    } else {
      setErrors({...errors, pass : '', pass_valid : true})
      setLoginDets({...loginDets, password : pass})
    }
  }

  useEffect(() => {
    validatePass()
  },[pass])

  useEffect(() => {
    validateUsername()
  },[username])

  //submit login details to backend to determine whether the credentials are valid
  // const handleSubmit = () => {
  //   axios.post(LOGIN_URL, loginDets, 
  //     {
  //       headers: {'Content-Type' : 'multipart/form-data'},
  //       withCredentials: true
  //     }
  //     ).then((response) => {

  //       setAuthTokens(response)
  //       const accessToken = response?.data?.access

  //       if(response.status === 200){
  //         localStorage.setItem('authTokens', JSON.stringify(authToken))
  //         setAuth({username,pass,accessToken})
  //         history('/')
  //       }else{
  //         alert('Something went wrong!')
  //       }
        
  //     })
      
  // }

  const handleSubmit = () => {
    handleLogin()
  }

  return (
    <div>
    <Typography variant="h3" textAlign={"center"} sx={{p:3}}>SNAPS</Typography>
    <Container>
      <Paper style={paperStyle}>
        <Form>
          <Typography variant="h4" sx={{mb:5, fontWeight:"bold"}} textAlign={"center"}>Login</Typography>
          <Form.Group style={inputStyle}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={(e) => {setUsername(e.target.value)}} isInvalid={!!errors?.username} isValid={errors?.user_valid}/>
              {errors?.username && (
                <Form.Control.Feedback type="invalid">
                {errors?.username}
                </Form.Control.Feedback>
              )}
          </Form.Group>
          <Form.Group style={inputStyle}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={(e) => {setPass(e.target.value)}} isInvalid={!!errors?.pass} isValid={errors?.pass_valid}/>
              {errors?.pass && (
                <Form.Control.Feedback type="invalid">
                {errors?.pass}
                </Form.Control.Feedback>
              )}
          </Form.Group>
          <Link to="">
            <Typography sx={{mb:2}} variant="body2">Forgot password ?</Typography>
          </Link>
          <Button sx={{mt:2}} variant="outlined" style={loginStyle} onClick={handleSubmit}>Login</Button>
          {/* <Button sx={{mt:2}} variant="outlined" style={loginStyle} onClick={handleLogout}>Logout</Button> */}
        </Form>
      </Paper>
    </Container>
    </div>
  )
}

export default Login
