import React from 'react'
import { FiX } from 'react-icons/fi';

const InfoModal = ({ children, title, state, toggle }) => {
  return (
    <div className={`${state ? "bg-gray-700/50" : "bg-transparent invisible"} transition-colors duration-200 min-h-screen w-full fixed top-0 text-[4vw] z-20`}>
        <div className={`${state ? "" : "translate-y-full"} transition-transform duration-500 h-3/4 w-full px-5 pb-5 absolute bottom-0 rounded-t-xl bg-white overflow-y-scroll overflow-x-hidden`}>
            <div className='fixed left-0 right-0 rounded-t-xl bg-white'>
                <p className='mt-2.5 mb-3 text-center font-medium'>{title}</p>
                <button
                    className='absolute top-0 right-4 h-full w-[5%]'
                    onClick={toggle}
                    type='button'
                >
                    <FiX className='w-full h-full opacity-60'/>
                </button>
            </div>
            { children }
        </div>
    </div>
  )
}

export default InfoModal