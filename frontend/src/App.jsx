import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Allposts from './pages/Allposts/Allposts';
import Comments from './pages/comments/Comments';


const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/allposts' element={<Allposts />} />
          <Route path='/comments' element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
