import React, { useState, useRef, useEffect } from 'react';
import VideoSnapshot from 'video-snapshot';
import Button from '@material-ui/core/Button';



function OCR() {

    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const imgRef = useRef(null);
    const textRef = useRef(null)

    const [video, setVideo] = useState();
    const [preview, setPreview] = useState();
    const [text, setText] = useState();
    const [pdf, setPDF] = useState();

    const { jsPDF } = require("jspdf");

    var snapshoter;
    let url = []
    let obj = {}
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
                    console.log('data:', data);
                    url.push(data);
                    // console.log('url', url)
                    // console.log('url[0]', url[0])
                    generatePDF(url[0])
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function generatePDF(txt) {
        recognized_Text = txt.message;
        setText(recognized_Text);
        const pdf_text = textRef.current
        console.log('pdf_text', pdf_text)

        const doc = new jsPDF();
        doc.text(recognized_Text, 10, 10);
        doc.save("a4.pdf")
        
        
        

    }

    
    function handleCloudinary() {
        console.log(pdf)
        // try {
        //     fetch("/api/upload", {
        //         method: "POST",
        //         body: JSON.stringify({ data: img }),
        //         headers: { "Content-Type": "application/json" },
        //     })
        //         // .then((response) => {
        //         //     console.log("response", response.status)
        //         //     response.json().then((data) => {
        //         //         urls.push(data.data);
        //         //         toStringUrl(urls)
        //         //     });
        //         // });
        // } catch (error) {
        //     console.error(error);
        // }
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
                    <p ref={textRef}>{text}</p>
                    <Button onClick={handleCloudinary}>Upload</Button>
                </div>
            </div>
        </div>
    )
} export default OCR;