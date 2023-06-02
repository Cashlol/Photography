import React, {createContext, useState, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
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
        history('/login')
    }

    //pass the login details to be authenticated
    //return and store jwt token retrieved and save it inside the local storage
    //logs outs if there's any other response other than status 200
    const handleLogin = () => {

        axios.post(LOGIN_URL, loginDets, 
            {
                headers: {'Content-Type' : 'multipart/form-data'},
                withCredentials: true
            }
        ).then((response) => {

            if(response.status === 200) {
                setAuth(jwt_decode(response?.data?.access))
                localStorage.setItem('authTokens', JSON.stringify(response?.data))
                history('/')
            }
            else{
                handleLogout()
            }

        })
    }  

    // console.log(authTokens,"AUTH TOKENS")

    return(
        <AuthContext.Provider value={{auth, setAuth,setLoginDets, loginDets ,handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext