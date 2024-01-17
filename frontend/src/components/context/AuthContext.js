import React, {createContext, useState, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()
const LOGIN_URL = '/api/token/'
const REFRESH_URL = '/api/token/refresh/'

export const AuthProvider =({children}) => {

    const history = useNavigate()

    //checks if there's an item authTokens inside localStorage if true get the item from local storage else set state as null
    // const [authTokens, setAuthTokens] =  useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [auth, setAuth] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loginDets, setLoginDets] = useState(null)

    
    //removes token from local storage and redirects user to the login page
    const handleLogout = () => {
        setAuth(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('isLoggedIn')
        history('/login')
    }

    //pass the login details to be authenticated
    //return and store jwt token retrieved and save it inside the local storage
    //logs outs if there's any other response other than status 200
    const handleLogin = async() => {
    
        try {
            const response = await  axios.post(LOGIN_URL, loginDets , 
                {
                    headers: {'Content-Type' : 'multipart/form-data'}
                }
            )
            
            if(response.status === 200) {
                Swal.fire({
                    title:'Success!',
                    text:'Login Successful',
                    icon:'success',
                    confirmButtonText:'Cool'
                })
                setAuth(jwt_decode(response?.data?.access))
                localStorage.setItem('authTokens', JSON.stringify(response?.data))
                localStorage.setItem('isLoggedIn', true)
                history('/')
            }

        } catch(err) {
            if(err.response?.status === 401){
                Swal.fire({
                    title:'Failed!',
                    text:'Login Unsuccessful',
                    icon:'error',
                    confirmButtonText:'Damn'
                })
            }
            else if(err.response?.status === 400){
                alert('something went wrong')
            }
        }

    }  

    // console.log(authTokens,"AUTH TOKENS")

    return(
        <AuthContext.Provider value={{auth, setAuth,setLoginDets, loginDets ,handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext