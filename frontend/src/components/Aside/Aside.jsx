import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Aside = () => {
    return (
        <div className='ps-4 pt-4'>
            <div className='flex justify-center items-center bg-gray-200 py-2 px-4  gap-2 rounded-full w-full'>
                <input type="text" placeholder='Search twitter' style={{ backgroundColor: "transparent", width: "250px" }} />
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div>
                <h3>What's happening</h3>
                <div>
                    <div> <p></p></div>

                </div>
            </div>
        </div>
    )
}

export default Aside
