import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import CreatePost from '../../components/CreatePosts/CreatePosts'
import Aside from '../../components/Aside/Aside'

const Createpost = () => {
    return (
        <div className='flex '>
            <SideBar />
            <CreatePost/>
            <Aside/>
        </div>
    )
}

export default Createpost
