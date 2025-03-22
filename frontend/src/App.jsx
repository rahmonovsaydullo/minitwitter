import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Home from './pages/Home/Home';


const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
