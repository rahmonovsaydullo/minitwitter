import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId"); 

        if (!userId) {
            alert("User not logged in. Please log in to post.");
            navigate("/login"); 
            return;
        }

        const formData = new FormData();
        formData.append("text", text);
        formData.append("user_id", userId); 

        axios.post("http://localhost:3000/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log("Post created successfully!", response.data);
                alert("Post created successfully!");
                navigate("/home");
            })
            .catch((error) => {
                console.error("Post creation failed", error.response?.data || error.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-1/2 bg-gray-100">
            <form
                className="bg-white shadow-lg rounded-lg p-6 w-96"
                onSubmit={handleSubmit}
            >
                <h2 className="text-xl font-semibold mb-4 text-center">Create a Post</h2>

                <input
                    type="text"
                    className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write something..."
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
