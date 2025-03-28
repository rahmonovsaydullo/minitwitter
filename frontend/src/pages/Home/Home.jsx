import React, { useEffect } from 'react'
import SideBar from '../../components/SideBar/SideBar';
import MainSection from '../../components/MainSection/MainSection';
import Aside from '../../components/Aside/Aside';


const Home = () => {

  return (
    <div className='flex '>
      <SideBar />
      <MainSection />
      <Aside />
    </div>
  )
}

export default Home
