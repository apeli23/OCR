import React, { useState, useRef, useEffect } from 'react';


const Test = () => {
    const vplayer = useRef(null)
    const canvasRef = useRef(null);
    useEffect(() => {
        const player = vplayer.current
        console.log(player)
        const canvas = canvasRef.current;
        console.log('canvas', canvas)
        let context = canvas.getContext('2d');
        console.log('context', context)
        canvas.width = 300;
        console.log('width', canvas.width)
        canvas.height = 300;
        console.log('height', canvas.height)

        //grab a frame from the video
        context.drawImage(player, 0, 0);

        //convert to grayscale image
        //ONLY WORKS IF image is not tainted by CORS

        let imgdata = context.getImageData(0, 0, canvas.width, canvas.height);
        imgdata.crossOrigin = "Anonymous";
        console.log('imgdata', imgdata)
        let len = imgdata.data.length;
        //width * height * 4 = length of the array
        for (let i = 0; i < len; i = i + 4) {
            let red = imgdata.data[i];
            let green = imgdata.data[i + 1];
            let blue = imgdata.data[i + 2];
            //let lum = .2126 * red + .7152 * green + .0722 * blue;
            let lum = (red + green + blue) / 3;
            imgdata.data[i] = lum;
            imgdata.data[i + 1] = lum;
            imgdata.data[i + 2] = lum;
        }
        //update what is displayed on the canvas.
        context.putImageData(imgdata, 0, 0);
        // console.log(canvas.toBlob())
        

    }, []);


    return (
        <div>

            {/* <button onClick={grabScreen}>grabScrn</button> */}
            <h3>
                scroll up is forward
            </h3>
            <div className="row">
                <div className="column">
                    <div>
                        Video element:
                    </div>
                    <video controls height="120" ref={vplayer} id="v" tabIndex="-1" autobuffer="auto" preload="auto">
                        <source type="video/webm" src="https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm" />
                    </video>
                </div>
                <div className="column">
                    <div>
                        Canvas element:
                    </div>
                    <canvas ref={canvasRef} id="c"></canvas>
                    <div>
                        Momentum: <input type='text' id="t" />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Test;