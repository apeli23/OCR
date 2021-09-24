import React, { useState, useRef, useEffect } from 'react';
import captureVideoFrame from "capture-video-frame";

const Test = () => {
    var photo;
    const [pic, setPic] = useState()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    useEffect(() => {
        /**
     * 1. Select video and canvas
     * 2. Get canvas context
     */
        const canvas = canvasRef.current;
        // console.log('canvas', canvas);

        const video = videoRef.current;
        // console.log('video', video);

        const ctx = canvas.getContext('2d');
        // console.log('ctx', ctx)

        /**
    * Set canvas dimensions
    */
        video.addEventListener('loadedmetadata', () => {
            canvas.height = 400;
            canvas.width = 360;
        });
        console.log(video)
        /**
     * 1. Start drawing on play
     * 2. Redraw
     */

        draw(video, ctx)
        console.log('reached here')
    }, [draw]);

    function draw(video, ctx) {
        const frameRate = 24;
        video.addEventListener('play', () => {
            const drawImage = () => {
                ctx.drawImage(video, 0, 0);
                if (!video.paused) {
                    setTimeout(drawImage, 1000 / frameRate);
                }
            }
            setTimeout(drawImage, 1000 / frameRate);

        })
        console.log('ctx', ctx);
    }
    return (
        <div>
            <video id='video' ref={videoRef} src='https://res.cloudinary.com/dogjmmett/video/upload/v1632176814/cisne_1_wtkyzm.mp4' autoPlay muted loop controls width='400' height ='360'></video>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};
export default Test;