import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Aside = () => {
  return (
    <div>
      <div className=''>
        <FontAwesomeIcon icon={faSearch}/> 
        <input type="text" />
      </div>
    </div>
  )
}

export default Aside
