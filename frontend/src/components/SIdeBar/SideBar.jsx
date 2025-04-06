import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBell as faBellRegular,
  faBookmark as faBookmarkRegular,
  faHeart,
  faUser as faUserRegular
} from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faHashtag, faHouseChimney, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const gotoCreatePost = () => {
    navigate("/createpost")
  }

  let sideBarItems = [
    { icon: faHouseChimney, title: "Home", color: "rgb(29, 161, 242)", path: "/home", action: () => navigate("/home") },
    { icon: faHashtag, title: "All posts", color: "black", path: "/allposts", action: () => navigate("/allposts") },
    { icon: faPlus, title: "Create post", color: "black", path: "/createpost", action: () => navigate("/createpost") },
    { icon: faHeart, title: "My Likes", color: "black", path: "/mylikes", action: () => navigate("/mylikes") },
    { icon: faBellRegular, title: "Notification", color: "black", path: "/notif", action: () => navigate("/notif") },
    { icon: faBookmarkRegular, title: "Bookmarks", color: "black", path: "", action: () => navigate("") },
    { icon: faUserRegular, title: "Profile", color: "black", path: "/profile", action: () => navigate("/profile") },
    { icon: faEllipsisH, title: "More", color: "black", path: "", action: () => navigate("") },
    { icon: faRightFromBracket, title: "Logout", action: handleLogout }
  ];


  return (
    <div className='flex flex-col items-start  ms-20 gap-6 border-r border-black px-8 h-screen'>
      <FontAwesomeIcon className='text-3xl mt-3' icon={faTwitter} style={{ color: 'rgb(29, 161, 242)' }} />
      {sideBarItems.map((item, index) => {
        const isActive = location.pathname === item.path
        return (
          <div key={index} className={`flex align-middle gap-3 text-lg cursor-pointer ${ isActive ? "text-[#1DA1F2] " : ""}` }onClick={item.action}>
            <div>
              <FontAwesomeIcon icon={item.icon}  style={{ color: isActive ? "rgb(29, 161, 242)" : "black" }} className='text-2xl' />
            </div>
            <p className='font-semibold'  style={{ color: isActive ? "rgb(29, 161, 242)" : "black" }}>{item.title}</p>
          </div>
        )
      })}
      <button className='btn  text-white flex justify-center align-middle py-3 px-20 rounded-full ' style={{ backgroundColor: "rgb(29, 161, 242" }} onClick={gotoCreatePost}>Tweet</button>
    </div>
  );
};

export default SideBar;
