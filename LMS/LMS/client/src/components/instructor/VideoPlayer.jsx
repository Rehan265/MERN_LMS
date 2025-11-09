import React from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer({ url, onEnded = () => { } }) {
    return (
        <div className='relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out'>
            <ReactPlayer onEnded={onEnded} url={url} playing={true} controls />

        </div>
    )
}

export default VideoPlayer