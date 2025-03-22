import { useNavigate } from "react-router-dom"; 
import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import img from "../../assets/twitter.svg";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State for image
  const navigate = useNavigate(); 

  // Handle file selection
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Store selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("user_name", username);
    formData.append("password", password);
    formData.append("profile_picture", profilePicture); // Attach file

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data" 
        }
      });

      console.log("Signup Successful", response.data);
      navigate("/login"); // Redirect to login page

    } catch (error) {
      console.error("Signup failed", error.response?.data);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={img} alt="Twitter" className="h-12" />
        </div>
        <h1 className="text-center text-2xl font-bold mb-6">
          Create an account
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            className="w-full mb-4 border py-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <input
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
           Register
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
