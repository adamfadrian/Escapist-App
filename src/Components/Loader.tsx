import React from 'react'

const Loader = () => {
    return (
        <div className="flex top-0 left-0 right-0 bottom-0 w-screen h-[500vh] fixed backdrop-saturate-50 bg-black/30  z-[800] items-center justify-center">
            <div className="flex space-x-2 fixed h-screen top-[50vh]">
                <div className="w-5 h-5 bg-blue-700 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '-.15s' }}></div>
                <div className="w-5 h-5 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: '-.3s' }}></div>
            </div>
        </div>
    )
}

export default Loader
