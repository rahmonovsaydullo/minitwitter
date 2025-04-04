import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../assets/twitter.svg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        username: username,
        password: password,
      });

      console.log(response);

      const user = response.data.user;
      const token = response.data.token;

      if (!user || !token) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("token", token);

      console.log("Login successful");
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={img} alt="Twitter" className="w-12" />
        </div>
        <h1 className="text-center text-2xl font-bold mb-6">
          Log in to Twitter
        </h1>
        <form onSubmit={handleLogin}>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Log In
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-blue-500">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
          <a href="/signup" className="hover:underline">
            Sign up to Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
