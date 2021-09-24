import React, { useState, useEffect, useRef } from 'react';
import captureVideoFrame from "capture-video-frame";


function Test2() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const targetframeRef = useRef(null)
    const frameRate = 24;

    useEffect(() => {
        var vid = videoRef.current;
        // console.log('vid', vid);

        var canvas = canvasRef.current;
        // console.log('canvas', canvas)

        var context = canvas.getContext('2d')
        // console.log('context', context);

        var targetFrame = targetframeRef.current;
        // console.log('targetFrame', targetFrame)

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
        // that's all is needed
        vid.addEventListener('seeked', function () {
            context.drawImage(vid, 0, 0, cw, ch);
        });

        seek(targetOffset, targetFrame, vid)
    }, [seek])

    function seek(targetOffset, targetFrame, vid) {
        // console.log('targetOffset', targetOffset);
        // console.log('targetFrame', targetFrame);
        // console.log('vid', vid);
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


    return (
        <div>
            <h3>
                scroll up is forward
            </h3>
            <div className="row">
                <div className="column">
                    <div>
                        Video element:
                    </div>
                    <video controls height="120" ref={videoRef} id="v" tabIndex="-1" autobuffer="auto" preload="auto">
                        <source type="video/webm" src="https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm" />
                    </video>
                </div>
                <div className="column">
                    <div>
                        Canvas element:
                    </div>
                    <canvas ref={canvasRef} id="c"></canvas>
                    <div>
                        Momentum: <input ref={targetframeRef} type='text' id="t" />
                    </div>
                </div>
            </div>
        </div>
    )
} export default Test2;