import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { useScreenshot } from 'use-react-screenshot'

function Test3() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const targetframeRef = useRef(null)
    const imageRef = useRef(null);
    const btnRef = useRef(null)
    const inputRef = useRef(null)
    const previewRef = useRef(null)
    const photoRef = useRef(null)

    const frameRate = 24;
    const [video, setVideo] = useState();

    const [img, takeScreenshot] = useScreenshot()

    const [photo, setPhoto] = useState();

    function showFunction() {
        var preview = document.getElementById('preview')
        preview.style.display = 'none'
    }

    function seek(targetOffset, targetFrame, vid) {
        targetOffset = targetOffset * 0.9;
        targetFrame.value = Math.round(targetOffset * 100) / 100;
        var vct = vid.currentTime - targetOffset;
        if (vct < 0) {
            vct = vid.duration + vct;
        } else if (vct > vid.duration) {
            vct = vct - vid.duration;
        }
        vid.currentTime = vct;
    }

    useEffect(() => {
        var vid = videoRef.current;
        // console.log('vid', vid);

        var canvas = canvasRef.current;
        // console.log('canvas', canvas)

        var context = canvas.getContext('2d')
        // console.log('context', context);

        var targetFrame = targetframeRef.current;
        // console.log('targetFrame', targetFrame)

        var button = btnRef.current

        var cw = canvas.width = 500;
        var ch = canvas.height = Math.round(cw / 1.7777);

        var targetOffset = 0;

        window.addEventListener('wheel', function (e) {
            e.preventDefault();
            targetOffset = targetOffset + (e.deltaY / 1000);
            targetFrame.value = targetOffset;
            seek(); // for demo purpose, we only listen to wheel
            return false;
        });

        vid.addEventListener('seeked', function () {
            context.drawImage(vid, 0, 0, cw, ch);
            // handleUpload(canvas)
        });

        button.addEventListener('click', function () {
            let img = takeScreenshot(photoRef.current);
            handleOCR(img)
        })

        seek(targetOffset, targetFrame, vid)

    }, [seek])

    function handleOCR(img) {
        console.log('imgOCR', img)
    }
    return (
        <div>
            <div className='row'>
                <div className='column'>
                    <h3>Select your video File</h3>
                    <input
                        ref={inputRef}
                        onClick={showFunction}
                        type="file"
                        onChange={(e) => setVideo(e.target.files?.item(0))}
                    /><br />
                    {video && (
                        <video ref={videoRef} className="Video" controls src={URL.createObjectURL(video)}></video>
                    )}

                    <video className="Video" controls height="120" ref={videoRef} id="preview" tabIndex="-1" autobuffer="auto" preload="auto">
                        <source type="video/webm"
                            src='https://res.cloudinary.com/dogjmmett/video/upload/v1632176814/cisne_1_wtkyzm.mp4'
                        />
                    </video>
                </div>
                <div className='column'>
                    <h3>Canvas Element</h3>
                    <div ref={photoRef}>
                        <canvas ref={canvasRef} id="c"></canvas>
                    </div>
                    <div>
                        Momentum: <input ref={targetframeRef} type='text' id="t" />
                    </div><br />
                    <Button variant='contained' color='primary' ref={btnRef}>Upload</Button>
                </div>

            </div>
        </div>
    )
} export default Test3;