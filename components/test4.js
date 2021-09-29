import React, { useState, useRef, useEffect } from 'react';
import VideoSnapshot from 'video-snapshot';
import Button from '@material-ui/core/Button'


function Test4(props) {
    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const [video, setVideo] = useState();
    const [preview, setPreview] = useState();
    const imgRef = useRef(null);


     
    return (
        <div>
            <div className="row">
                <div className="column">
                    <h1># Video snapshot 🎥</h1>
                    <input
                        ref={inputRef}
                        type="file"
                        onChange={(e) => setVideo(e.target.files?.item(0))}
                    /><br />
                    {video && (
                        <video ref={videoRef} className="Video" controls src={URL.createObjectURL(video)}></video>
                    )}<br />
                    <Button variant='contained' color='primary' >Take Snapshot</Button>
                </div>
                <div className='column'>
                    <h1>Snapshot preview 🦄</h1>
                    {preview && (
                        <img ref={imgRef} className="Video" src={preview} controls/>
                    )}<br />
                </div>
            </div>
        </div>
    )
} export default Test4