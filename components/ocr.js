import React, { useState, useRef, useEffect } from 'react';
import VideoSnapshot from 'video-snapshot';
import Button from '@material-ui/core/Button'

function OCR() {
    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const [video, setVideo] = useState();
    const [preview, setPreview] = useState();
    const [text, setText] = useState();
    const imgRef = useRef(null);
    var snapshoter;
    let url=[]
    let recognized_Text = ''


    const onChange = async (e) => {
        const file = e.target.files?.item(0);
        setVideo(file)
    }

    const onSnapshot = async () => {
        snapshoter = new VideoSnapshot(video)
        const currentTime = videoRef.current.currentTime
        const videoPreview = await snapshoter.takeSnapshot(currentTime)
        setPreview(videoPreview);
        handleOCR(videoPreview);
    }


    const handleOCR = async (preview) => {
        // console.log('to upload ...', preview)
        try {
            fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: preview }),
                headers: { "Content-Type": "application/json" },
            }).then((response) => {
                console.log(response.status);
                response.json().then((data) => {
                    // console.log(data)
                    // console.log('data:', data);
                    url.push(data);
                });
                handleText(url)
            });
        } catch (error) {
            console.error(error);
        }
    }
     
    function handleText (){
        console.log('url[0]', url)
        // recognized_Text =url[0]
        console.log('recognized_Text', recognized_Text)
    }
    return (
        <div>
            <div className="row">
                <div className="column">
                    <h1># Video snapshot 🎥</h1>
                    <input
                        ref={inputRef}
                        type="file"
                        onChange={onChange}
                    /><br />
                    {video && (
                        <video ref={videoRef} className="Video" controls src={URL.createObjectURL(video)}></video>
                    )}<br />
                    <Button variant='contained' color='primary' onClick={onSnapshot}>Take Snapshot</Button>
                </div>
                <div className='column'>
                    <h1>Snapshot preview 🦄</h1>
                    {preview && (
                        <img ref={imgRef} className="Video" src={preview} controls />
                    )}<br />
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <h1>Recognized Text shows here</h1>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
} export default OCR;