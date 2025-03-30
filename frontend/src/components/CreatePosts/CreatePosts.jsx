import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [text, setText] = useState("");
    const [post_img, setPostimg] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("text", text)
        formData.append("post_img", post_img)

        try {
            const response = await axios.post("http://localhost:3000/posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Created Successfully", response.data);
            navigate("/");
        } catch (error) {
            console.error("Signup failed", error);
            setError(error.response?.data?.message || "Signup failed. Try again.");
        }
    }


    return (
        <div className='flex'>
            <form className='flex flex-col justify-center w-96 ms-52' onSubmit={handleSubmit}>
                <input className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500' type="text" value={text}  onChange={(e) => setName(e.target.value)} placeholder='Text' required />
                <input className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500' type="text" value={post_img} onChange={(e) => setName(e.target.value)} placeholder='Post image' required />
                <button className='className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"'>Post</button>
            </form>
        </div>
    )
}

export default CreatePost
