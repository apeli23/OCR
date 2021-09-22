import React, { useState, useEffect } from 'react';


function Test2() {
    (() => {
        const canvas = document.querySelector('canvas');
        console.log('canvas', canvas);

        const video = document.querySelector('video');
        console.log('video', video);

        const ctx = canvas.getContext('2d');
        console.log('ctx', ctx)

    })()
    return (
        <div>   
            <button onClick={handleUpload}>upload</button>
            <video id='video' src='https://res.cloudinary.com/dogjmmett/video/upload/v1632176814/cisne_1_wtkyzm.mp4' autoPlay muted loop controls></video>
            <canvas></canvas>
        </div>
    )
} export default Test2;