import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();


    console.log("Stored Token:", localStorage.getItem("token"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            navigate("/");
            return;
        }
    
        const formData = new FormData();
        formData.append("text", text);
    
        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token.trim()}`
        };
    
        console.log("🔍 Sending Headers:", headers); // ✅ Debugging headers
    
        try {
            const response = await axios.post("http://localhost:3000/posts", formData, { headers });
            console.log("✅ Post created successfully!", response.data);
            alert("Post created successfully!");
            navigate("/");
        } catch (error) {
            console.error("❌ Post creation failed", error.response?.data || error.message);
            alert("Failed to create post. Please try again.");
        }
    };
    
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
