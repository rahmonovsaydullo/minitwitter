import React, { useEffect, useState } from "react";
import magicImg from "../../assets/Home/magic.svg";
import axios from "axios";
import Posts from "../Posts/Posts";

const MainSection = () => {
  const [userData, setUserData] = useState(null);
  const [text, setText] = useState("");
  const [refreshPosts, setRefreshPosts] = useState(false); // Track new posts

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get(`http://localhost:3000/user/${username}`)
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Error fetching user:", error.message));
  }, []);

  // Handle post submission
  const handlePostSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in. Please log in to post.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/posts", { text, user_id: userId });
      setText(""); // Clear input field
      setRefreshPosts((prev) => !prev); // Toggle refresh state
    } catch (error) {
      console.error("Post creation failed", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full static border ms-10 bg-gray-100">
      <div className="flex justify-between bg-white border-b px-5 py-3">
        <p className="font-semibold">Home</p>
        <img src={magicImg} alt="" />
      </div>
      <div className="bg-white">
        <div className="flex ms-2 pt-3 gap-4">
          <img
            src={userData?.profile_picture}
            alt=""
            className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-300"
          />
          <input
            className="w-full border px-4"
            type="text"
            placeholder="Create new post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-end px-3 py-4">
          <button onClick={handlePostSubmit} className="text-white px-7 py-3 bg-blue-400 rounded-full">
            Tweet
          </button>
        </div>
      </div>
      <Posts refresh={refreshPosts} />
    </div>
  );
};

export default MainSection;
