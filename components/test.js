import React, { useState, useRef, useEffect } from 'react';


const useCanvas = (callback) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log('canvas', canvas)
        const context = canvas.getContext('2d');
        console.log('context', context)
        callback([canvas, context]);
    }, []);

    return canvasRef;
}

const Test = () => {
    const [position, setPosition] = useState({})
    const canvasRef = useCanvas(([canvas, context]) => {
        context.fillRect(0, 0, canvas.width, canvas.height);
        const x = canvas.width;
        const y = canvas.height;
        setPosition({ x, y });

    });
    const vid = useRef()

    console.log('vid', vid)
    
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
                    <video controls height="120" ref={vid} id="v" tabIndex="-1" autobuffer="auto" preload="auto">
                        <source type="video/webm" src="https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm" />
                    </video>
                </div>
                <div className="column">
                    <div>
                        Canvas element:
                    </div>
                    <canvas ref={canvasRef}  id="c"></canvas>
                    <div>
                        Momentum: <input type='text' id="t" />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Test;