import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const SideBar = () => {
  return (
    <div>
      <FontAwesomeIcon className='text-2xl' icon={faTwitter} style={{ color: 'rgb(29, 161, 242)' }} />
    </div>
  );
};

export default SideBar;
