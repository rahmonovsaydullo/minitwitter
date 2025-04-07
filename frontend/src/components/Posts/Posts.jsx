import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket as faShare, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Posts = ({ refresh }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  return (
    <div className="w-full border bg-gray-100">
      {posts.map((post) => (
        <div className="px-3 py-3 border-b bg-white" key={post.id}>
          <div className="flex justify-between">
            <p className="text-blue-500">@{post.username}</p>
            <p>
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
          <p className="text-2xl">{post.text}</p>
          <div className="flex justify-around pt-2 text-gray-600">
            <FontAwesomeIcon icon={faComment} className="cursor-pointer hover:text-blue-500" />
            <FontAwesomeIcon icon={faShare} className="cursor-pointer hover:text-green-500" />
            <FontAwesomeIcon icon={faHeart} className="cursor-pointer hover:text-red-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
