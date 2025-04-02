import React, { useEffect, useState } from 'react'
import magicImg from '../../assets/Home/magic.svg'
import axios from 'axios'
import Posts from '../Posts/Posts';

const MainSection = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username")
    axios
      .get(`http://localhost:3000/user/${username}`)
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error.message);
      });


  }, [])

  return (
    <div className='w-full border ms-10 bg-gray-100 '>
      <div className='flex justify-between bg-white border-b px-5 py-3'>
        <p className='font-semibold'>Home</p>
        <img src={magicImg} alt="" />
      </div>
      <div className='bg-white'>
        <div className='flex  ms-2 pt-3 gap-4'>
          <img src={userData?.profile_picture } alt="" className='w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-300' />
          <input className='w-full border px-4' type="text" placeholder="Create new post" />
        </div>
        <div className='flex justify-end px-3 py-4'>
          <button className='text-white px-7 py-3 bg-blue-400 rounded-full '>Tweet</button>
        </div>
      </div>
    <Posts/>
    </div>
  )
}

export default MainSection
