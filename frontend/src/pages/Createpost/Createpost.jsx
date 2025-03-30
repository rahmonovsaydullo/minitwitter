import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import CreatePost from '../../components/CreatePosts/CreatePosts'

const Createpost = () => {
    return (
        <div className='flex '>
            <SideBar />
            <CreatePost/>
        </div>
    )
}

export default Createpost
