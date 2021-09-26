import React, { useState, useRef, useEffect } from 'react';
import captureVideoFrame from "capture-video-frame";

const Test = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const targetframeRef = useRef(null)
    const imageRef = useRef(null);
    const btnRef = useRef(null)
    const inputRef = (null)

    const frameRate = 24;
    const [video, setVideo] = useState();


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

        var cw = canvas.width = 200;
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
            console.log(canvas)

        });



        button.addEventListener('click', function () {
            // var dataURL = canvas.toDataURL();
            var img = new Image();
            img.crossOrigin = 'anonymous'
        })
 
        seek(targetOffset, targetFrame, vid)
    }, [seek])


    return (
        <div>
            <input
                // onChange={handleChange}
                type="file"
                onChange={(e) => setVideo(e.target.files?.item(0))}
            />
            {video && (
                <video controls width="230" src={URL.createObjectURL(video)}></video>
            )}
            <canvas ref={canvasRef} id="c"></canvas>
            <div >
                Momentum: <input ref={targetframeRef} type='text' id="t" />
            </div>
        </div>
    )
};
export default Test;