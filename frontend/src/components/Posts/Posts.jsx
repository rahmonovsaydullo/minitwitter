import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket as faArrowUpFromBracketRegular, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { formatDistanceToNow } from "date-fns";

const Posts = () => {

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        try {
            const response = await axios
                .get('http://localhost:3000/posts')

            console.log(response.data);
            setPosts(response.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchPosts()
        console.log(fetchPosts());
    }, [])

    return (
        <div className='w-full border  bg-gray-100 '>
            {
                posts.map((post) => (
                    <div className='px-3 py-3' key={post.id}>
                        <div className='flex justify-between'>
                            <p className='text-blue-500'>@{post.username}</p>
                            <p>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
                        </div>
                        <p className='text-2xl'>{post.text}</p>
                        {/* <img src={post.post_img} alt="" /> */}
                        <div className='flex justify-around pt-2 '> 
                            <FontAwesomeIcon icon={faComment}  className='cursor-pointer'/>
                             <FontAwesomeIcon icon={faArrowUpFromBracketRegular}  className='cursor-pointer'/>
                              <FontAwesomeIcon icon={faHeart} style={{ color: "red" }}  className='cursor-pointer'/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts

