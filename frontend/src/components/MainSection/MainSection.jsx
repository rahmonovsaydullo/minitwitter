import React, { useEffect, useState } from 'react'
import magicImg from '../../assets/Home/magic.svg'
import axios from 'axios'

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
    <div className='w-6/12 border ms-10 bg-gray-100 '>
      <div className='flex justify-between bg-white border-b px-5 py-3'>
        <p className='font-semibold'>Home</p>
        <img src={magicImg} alt="" />
      </div>
      <div className='bg-white'>
        <div className='flex  ms-2 pt-3 gap-4'>
          <img src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          <input className='w-full border px-4' type="text" placeholder="Create new post" />
        </div>
        <div className='flex justify-between px-3 py-4'>
          <input type="file" />
          <button className='text-white px-7 py-3 bg-blue-400 rounded-full '>Tweet</button>
        </div>
      </div>

      <div className='mt-4 text-center'>
        {userData ? (
          <>
            <p className='text-xl font-semibold'>{userData.name}</p>
            <p className='text-gray-600'>@{userData.username}</p>
            <img
              src={userData?.profile_picture || "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"}
              alt="User Profile"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  )
}

export default MainSection
