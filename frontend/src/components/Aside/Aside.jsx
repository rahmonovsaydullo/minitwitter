
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Aside = () => {
    let infos = [
        {
            title: "Covid · Last night",
            text: "England's Chief Medical Officer says the UK is at the most dangerous time of the pandemic",
            imgUrl: "https://assets.publishing.service.gov.uk/media/5ee8e5d486650c03f2f4fa55/Statement_10_June.jpg",
            trend: "#covid"
        },
        {
            title: "Technology · This Morning",
            text: "Apple unveils the latest iPhone with groundbreaking AI features",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            trend: "#iPhone15"
        },
        
        

    ]
    return (
        <div className='ps-4 pt-4'>
            <div className='flex justify-center items-center bg-gray-200 py-2 px-4  gap-2 rounded-full w-full'>
                <input type="text" placeholder='Search twitter' style={{ backgroundColor: "transparent", width: "250px" }} />
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className='border mt-4'>
                <h3 className='border-b p-3'>What's happening</h3>
                <div>
                    {infos.map((info, index) => (
                        <div key={index} className="flex flex-col mb-4 border-b px-2 pb-4">
                            <div className='flex '>
                                <div>
                                    <p className="text-sm text-gray-600">{info.title}</p>
                                    <p className="w-44 text-md font-semibold">{info.text}</p>
                                </div>
                                <img src={info.imgUrl} alt="news" className="mt-2 w-28 h-40 object-cover rounded-lg" />
                            </div>
                            <div>Trends with {info.trend}</div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}

export default Aside
