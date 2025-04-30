// Posts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket as faShare,
  faComment,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import CommentSidebar from "../CommentSidebar/CommentSidebar";


const userId = 1;

const Posts = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const postsData = response.data;

      const likesRes = await axios.get(`http://localhost:3000/user/${userId}/likes`);
      const likedPostIds = likesRes.data.map((like) => like.postId);

      const enrichedPosts = postsData.map((post) => ({
        ...post,
        isLiked: likedPostIds.includes(post.id),
        likeCount: post.likecount,
      }));

      setPosts(enrichedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:3000/likes/${postId}`, { userId });
      const { liked } = res.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: liked,
                likeCount: post.likeCount + (liked ? 1 : -1),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <>
      <div className="w-full border bg-gray-100">
        {posts.map((post) => (
          <div className="px-4 py-4 border-b bg-white" key={post.id}>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p className="text-blue-500 font-medium">@{post.username}</p>
              <p>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
            </div>

            <p className="text-xl mt-2 mb-3">{post.text}</p>

            <div className="flex justify-around items-center text-lg text-gray-700 mb-2">
              <button
                className="hover:text-blue-500 transition"
                onClick={() => setActivePost(post)}
              >
                <FontAwesomeIcon icon={faComment} className="mr-1" />
              </button>

              <button
                className="hover:text-green-500 transition"
                onClick={() => alert("Share clicked!")}
              >
                <FontAwesomeIcon icon={faShare} className="mr-1" />
              </button>

              <button
                className={post.isLiked ? "text-red-500" : ""}
                onClick={() => toggleLike(post.id)}
              >
                <FontAwesomeIcon icon={faHeart} className="mr-1" />
                <span>{post.likeCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Sidebar */}
      {activePost && (
        <CommentSidebar post={activePost} onClose={() => setActivePost(null)} />
      )}
    </>
  );
};

export default Posts;
