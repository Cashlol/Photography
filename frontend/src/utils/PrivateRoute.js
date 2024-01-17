import React, { useContext } from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import AuthContext from '../components/context/AuthContext'

const PrivateRoute = () => {

    const {auth} = useContext(AuthContext)
    // console.log('Private route works', auth)

    return auth ?  
        <>
            <Navbar/>
            <Outlet/>
        </> : 
        <Navigate to = "/login"/>
}

export default PrivateRoute
