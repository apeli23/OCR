import React, { useState, useRef, useEffect } from 'react';

function Test3() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const targetframeRef = useRef(null)
    const imageRef = useRef(null);
    const btnRef = useRef(null)
    const inputRef = useRef(null)
    const previewRef = useRef(null)

    const frameRate = 24;
    const [video, setVideo] = useState();

    function showFunction() {
        var inpt = previewRef.current
        inpt.style.display = 'none'
    }

    return (
        <div>
            <input
                ref={inputRef}
                onClick={showFunction}
                // onChange={handleChange}
                type="file"
                onChange={(e) => setVideo(e.target.files?.item(0))}
            />
            {video && (
                <video controls width="230" src={URL.createObjectURL(video)}></video>
            )}
             
                <video controls height="120" ref={previewRef} id="v" tabIndex="-1" autobuffer="auto" preload="auto">
                    <source type="video/webm"
                        src='https://res.cloudinary.com/dogjmmett/video/upload/v1632176814/cisne_1_wtkyzm.mp4'
                    />
                </video>
             
        </div>
    )
} export default Test3;