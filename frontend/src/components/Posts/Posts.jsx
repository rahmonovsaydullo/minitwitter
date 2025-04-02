import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket as faArrowUpFromBracketRegular, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


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
        <div className='w-6/12 border ms-10 bg-gray-100 '>
            {
                posts.map((post) => (
                    <div key={post.id}>
                            <div>
                                <p>{post.name}</p>
                                <p>{post.username}</p>
                                <p>{post.created_at}</p>
                            </div>
                            <p>{post.text}</p>
                        <img src={post.post_img} alt="" />
                        <div className='flex justify-around'> <FontAwesomeIcon icon={faComment} /> <FontAwesomeIcon icon={faArrowUpFromBracketRegular} /> <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} /></div>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts

