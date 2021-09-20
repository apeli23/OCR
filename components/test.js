import React, { useState, useRef, useEffect } from 'react';

const Test = () => {
    const vplayer = useRef(null)
    const canvasRef = useRef(null);
    console.log('height', vplayer.height);
    useEffect(() => {
        /**
     * 1. Select video and canvas
     * 2. Get canvas context
     */
        const canvas = document.querySelector('canvas');
        console.log('canvas', canvas);

        const video = document.querySelector('video');
        console.log('video', video);

        const ctx = canvas.getContext('2d');
        console.log('ctx', ctx)

        /**
    * Set canvas dimensions
    */
        video.addEventListener('loadedmetadata', () => {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
        });

        /**
     * 1. Start drawing on play
     * 2. Redraw
     */
        const frameRate = 24;
        video.addEventListener('play', () => {
            const drawImage = () => {
                ctx.drawImage(video, 0, 0);
                if(!video.paused){
                    setTimeout(drawImage, 1000/ frameRate);
                } 
                
            }
            setTimeout(drawImage, 1000/frameRate);
            console.log('ctx', ctx);
        })

    }, []);


    return (
        <div>

            <video id='video' src='https://res.cloudinary.com/dogjmmett/video/upload/v1632176814/cisne_1_wtkyzm.mp4' autoPlay muted loop controls></video>
            <canvas></canvas>
        </div>
    )
};
export default Test;