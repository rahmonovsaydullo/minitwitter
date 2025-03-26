import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Allposts from './pages/Allposts/Allposts';
import Comments from './pages/comments/Comments';
import Createpost from './pages/Createpost/Createpost';
import Mylikes from './pages/Mylikes/Mylikes';
import Notification from './pages/Notification/Notification';
import Profile from './pages/Profile/Profile';


const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/allposts' element={<Allposts />} />
          <Route path='/createpost' element={<Createpost />} />
          <Route path='/mylikes' element={<Mylikes />} />
          <Route path='/notif' element={<Notification />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/comments' element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
