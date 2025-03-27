import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import img from "../../assets/twitter.svg";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePicture) {
      setError("Please select a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", profilePicture); 

    try {
      const response = await axios.post("http://localhost:3000/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("Signup Successful", response.data);
      navigate("/");

    } catch (error) {
      console.error("Signup failed", error);
      setError(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={img} alt="Twitter" className="h-12" />
        </div>
        <h1 className="text-center text-2xl font-bold mb-6">Create an account</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          <a href="/" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
