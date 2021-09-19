function Test() {
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
                    <video controls height="120" id="v" tabIndex="-1" autobuffer="auto" preload="auto">
                        <source type="video/webm" src="https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm" />
                    </video>
                </div>
                <div className="column">
                    <div>
                        Canvas element:
                    </div>
                    <canvas id="c"></canvas>
                    <div>
                        Momentum: <input type='text' id="t" />
                    </div>
                </div>
            </div></div>
    )
} export default Test;