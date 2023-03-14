import { useState,useEffect,useContext } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'
import Edit from './pages/Edit.jsx'
import NotFound from './pages/NotFound.jsx'
import Navbar from './components/Navbar.jsx'
import UserContextProvider, { UserContext } from './contexts/UserContext.jsx'



function App() {

  return (
<>
<UserContextProvider>
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path ='/' element={<Home/>} />
      <Route path ='/login' element={<Login/>} />
      <Route path ='/register' element={<Register/>} />
      <Route path ='/profile' element={<Profile/>} >
        <Route path='/profile/:id' element={<Profile/>}/>
      </Route>
      <Route path ='/admin' element={<Admin/>} />
      <Route path ='/edit' element={<Edit/>} />
      <Route path ='/*' element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
</UserContextProvider>
</>
  )
}

export default App
