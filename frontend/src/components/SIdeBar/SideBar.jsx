import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { 
  faBell as faBellRegular, 
  faBookmark as faBookmarkRegular, 
  faHeart, 
  faUser as faUserRegular 
} from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faHashtag, faHouseChimney, faPlus } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  let icons = [
    { icon: faHouseChimney, title: "Home", color: "rgb(29, 161, 242)" },
    { icon: faHashtag, title: "All posts", color: "black" },
    { icon: faPlus, title: "Create post", color: "black" },   
    { icon: faHeart, title: "My Likes", color: "black" },
    { icon: faBellRegular, title: "Notification", color: "black" },  
    { icon: faBookmarkRegular, title: "Bookmarks", color: "black" }, 
    { icon: faUserRegular, title: "Profile", color: "black" },       
    { icon: faEllipsisH, title: "More", color: "black" },
  ];

  return (
    <div className='flex flex-col items-start justify-center mt-2 ms-28 gap-6 '>
      <FontAwesomeIcon className='text-3xl' icon={faTwitter} style={{ color: 'rgb(29, 161, 242)' }} />
      {icons.map((icon, index) => (
        <div key={index} className='flex align-middle gap-3 text-lg cursor-pointer'>
          <div>
            <FontAwesomeIcon icon={icon.icon} style={{ color: icon.color }} className='text-2xl' />
          </div>
          <p className='font-semibold' style={{ color: icon.color }}>{icon.title}</p>
        </div>
      ))}
     <button className='btn  text-white flex justify-center align-middle py-3 px-20 rounded-full ' style={{backgroundColor: "rgb(29, 161, 242"}}>Tweet</button>
    </div>
  );
};

export default SideBar;
