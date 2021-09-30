import React, { useState, useRef, useEffect } from 'react';
import VideoSnapshot from 'video-snapshot';
import Button from '@material-ui/core/Button'


function Test4(props) {
    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const [video, setVideo] = useState();
    const [preview, setPreview] = useState();
    const imgRef = useRef(null);
    var snapshoter;

    useEffect(() => {
        
    }, [])
    const onChange = async (e) => {
        const file = e.target.files?.item(0);
        console.log('files', file)
        setVideo(file)
        snapshoter = new VideoSnapshot(file);
        try {
            const videoPreview = await snapshoter.takeSnapshot();
            // console.log('videoPreview', videoPreview)
            setPreview(videoPreview)
        } catch (error) {
            console.error(error)
        }
    }

    const onSnapshot = async () => {
        snapshoter = new VideoSnapshot(video)
        console.log('snapshoter', snapshoter);
        const currentTime = videoRef.current.currentTime
        console.log('currentTime', currentTime);
        const videoPreview = await snapshoter.takeSnapshot(currentTime)
        console.log('videoPreview', videoPreview);
        setPreview(videoPreview);
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
        </div>
    )
} export default Test4