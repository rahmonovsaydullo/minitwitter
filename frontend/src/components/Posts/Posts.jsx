import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket as faShare,
  faComment,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import CommentSidebar from "../CommentSidebar/CommentSidebar";

const Posts = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = async () => {
    try {
      const postsRes = await axios.get("http://localhost:3000/posts");
      const postsData = postsRes.data;

      const likesRes = await axios.get("http://localhost:3000/likes/user/likes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const likedPostIds = likesRes.data.map((like) => like.post_id);

      const enrichedPosts = postsData.map((post) => ({
        ...post,
        isLiked: likedPostIds.includes(post.id),
        likeCount: post.likecount, // Assuming `likecount` comes from your `posts` query
      }));

      setPosts(enrichedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/likes/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPost = res.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: updatedPost.liked,
                likeCount: updatedPost.likeCount,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error.response?.data || error.message);
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
              <button onClick={() => setActivePost(post)} className="hover:text-blue-500 transition">
                <FontAwesomeIcon icon={faComment} className="mr-1" />
              </button>

              <button onClick={() => alert("Share clicked!")} className="hover:text-green-500 transition">
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

      {activePost && <CommentSidebar post={activePost} onClose={() => setActivePost(null)} />}
    </>
  );
};

export default Posts;
