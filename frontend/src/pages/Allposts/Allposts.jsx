import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Posts from '../../components/Posts/Posts'
import Aside from '../../components/Aside/Aside'


const Allposts = () => {
  return (
    <div className='flex'>
      <SideBar/>
      <Posts/>
      <Aside/>
    </div>
  )
}

export default Allposts
