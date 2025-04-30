// components/CommentSidebar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const userId = 1;

const CommentSidebar = ({ post, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (post) fetchComments();
  }, [post]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/${post.id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to load comments:", error.message);
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post("http://localhost:3000/comments", {
        userId,
        postId: post.id,
        text: newComment.trim(),
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Failed to submit comment:", error.message);
    }
  };

  if (!post) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l z-50 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Comments on <span className="text-blue-600">@{post.username}</span></h2>
        <button className="text-red-500 font-bold" onClick={onClose}>×</button>
      </div>

      <div className="p-4">
        <p className="mb-4 text-gray-700 italic">"{post.text}"</p>

        <div className="space-y-3 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-2">
              <p className="text-sm"><strong>@{comment.username}</strong>: {comment.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSidebar;
