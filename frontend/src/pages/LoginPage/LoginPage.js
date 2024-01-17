import React, {useState, useEffect, useContext} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography  from '@mui/material/Typography';
import './LoginPage.css'
import AuthContext from '../../components/context/AuthContext';


const Login = () => {

  const history = useNavigate()
  const { setLoginDets, loginDets, handleLogin } = useContext(AuthContext)
  const isLoggedIn = localStorage.getItem('isLoggedIn') ? localStorage.getItem('isLoggedIn') : null

  //styling for components 
  const paperStyle = {padding:20, height:'60vh', width:380, margin:"20px auto"}
  const inputStyle = {marginBottom:20}
  const loginStyle = {width:"100%", height:'5vh', margin:"5px auto", borderRadius:15}
  //
  
  const [passError, setPassError] = useState({pass: 'Please enter your password', pass_valid : false})
  const [userError, setUserError] = useState({user: 'Please enter your username', user_valid : false})
  const [isSubmit, setIsSubmit] = useState(false)

  //validation checker using regex
  // const validateEmail = () => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  //   if(!emailRegex.test(email) || email === '' || email.length == 0){
  //     setErrors({...errors, email : 'Please enter a valid email address', email_valid : false})
  //   } else {
  //     setErrors({...errors, email : '', email_valid : true})
  //   }
  // }

  useEffect(() => {
    if(isLoggedIn){
      history('/')
    }
  },[])


  const handlePass = (password) => {
    
    if(password === ''){
      setPassError({...passError, pass : 'Please enter your password', pass_valid : false})
    } else {
      setPassError({...passError, pass : '', pass_valid : true})
      setLoginDets({...loginDets, password : password})
    }

  }

  const handleUser = (username) => {

    if(username === ''){
      setUserError({...userError, user : 'Please enter your user name', user_valid : false})
    } else {
      setUserError({...userError, user : '', user_valid : true})
      setLoginDets({...loginDets, username : username})
    }

  }

  const handleSubmit = () => {

    setIsSubmit(true)
    if(passError.pass_valid && userError.user_valid)
    {
      handleLogin()
    }
    
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
              <Form.Control type="text" onChange={(e) => {handleUser(e.target.value)}} isValid={isSubmit && userError?.user_valid} isInvalid={isSubmit && !!userError?.user}/>
              {userError?.user && (
                <Form.Control.Feedback type="invalid">
                {userError?.user}
                </Form.Control.Feedback>
              )}
          </Form.Group>
          <Form.Group style={inputStyle}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => {handlePass(e.target.value)}} isValid={isSubmit && passError?.pass_valid} isInvalid={isSubmit && !!passError?.pass}/>
              {passError?.pass && (
                <Form.Control.Feedback type="invalid">
                {passError?.pass}
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
