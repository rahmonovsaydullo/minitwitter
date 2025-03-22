import React from 'react'
import SideBar from '../../components/SIdeBar/SideBar';
import MainSection from '../../components/MainSection/MainSection';
import Aside from '../../components/Aside/Aside';

const Home = () => {
  return (
    <div className='flex '>
      <SideBar />
      <MainSection />
      <Aside/>
    </div>
  )
}

export default Home
