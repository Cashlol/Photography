import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage.js';
import PhotoPage from './pages/PhotoPage.js';
import UploadPage from './pages/UploadPage.js';
import LoginPage from './pages/LoginPage';
import {AuthProvider} from './components/context/AuthContext';

function App() {
  return (
    <Router>
      <>
      <AuthProvider>
      <Routes>
          <Route exact path="/login" element ={<LoginPage/>}/>
          <Route exact path="/" element={<PrivateRoute/>}>
            <Route exact path="/" element ={<HomePage/>}/>
            <Route path="/photos/add" element={<UploadPage/>}/>
            <Route path="/photos/:id" element={<PhotoPage/>}/>
            <Route path="/photos/:id/update" element={<UploadPage/>}/>
          </Route>
        </Routes>    
      </AuthProvider>
      </>
    </Router>

  );
}

export default App;
