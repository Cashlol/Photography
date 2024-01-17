import './App.css';
import { cloneElement } from 'react';
import {useRoutes, useLocation} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage/HomePage.js';
import PhotoPage from './pages/PhotoPage.js';
import UploadPage from './pages/UploadPage/UploadPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import WorksPage from './pages/WorksPage/WorksPage.js';
import AboutPage from './pages/AboutPage/AboutPage.js';
import ContactPage from './pages/ContactPage/ContactPage.js'
import {AuthProvider} from './components/context/AuthContext.js';
import { AnimatePresence } from 'framer-motion'

export default function App() {

//   <Router>
//   <>
//   <AuthProvider>
//   <Routes>
//       <Route exact path="/login" element ={<LoginPage/>}/>
//       <Route exact path="/" element={<PrivateRoute/>}>
//         <Route exact path="/" element ={<HomePage/>}/>
//         <Route path = "/posts" element ={<WorksPage/>}/>
//         <Route path="/post/add" element={<UploadPage/>}/>
//         <Route path="/post/:id" element={<PhotoPage/>}/>
//         <Route path="/post/:id/update" element={<UploadPage/>}/>
//       </Route>
//     </Routes>    
//   </AuthProvider>
//   </>
// </Router>

  const element = useRoutes([
    {path: "/login", element: <LoginPage/>},
    {path: "/", element: <PrivateRoute/>, children: [
      {path:"/", element: <HomePage/>},
      {path: "posts", element: <WorksPage/>},
      {path: "post/add", element: <UploadPage/>},
      {path: "post/:id", element: <PhotoPage/>},
      {path: "post/:id/update", element: <UploadPage/>},
      {path: "contact", element: <ContactPage/>},
      {path: "about", element: <AboutPage/>},
    ]}
  ])



  const location = useLocation()

  if(!element) return null

  return (
    <AnimatePresence mode="wait">
      {cloneElement(element, {key : location.pathname})}
    </AnimatePresence>
  )
}


