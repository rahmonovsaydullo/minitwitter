import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import img from "../../assets/twitter.svg"; // Ensure the correct path to the SVG

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Predefined credentials
    const correctName = "admin";
    const correctPassword = "password";

    // Check if the entered name and password match the predefined credentials
    if (name === correctName && password === correctPassword) {
      // Save to localStorage
      localStorage.setItem("username", name);
      localStorage.setItem("password", password);

      // Redirect to the login page
      navigate("/login");
    } else {
      // If credentials don't match, you can show an error message or handle it as needed
      console.log("Incorrect username or password.");
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
          />
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className="w-full mb-4 border py-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="file"
          />
          <input
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default SignUp;
