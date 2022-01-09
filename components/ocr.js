import React, { useState, useRef, useEffect } from 'react';
import VideoSnapshot from 'video-snapshot';
import {
  Cloudinary,
  Top,
  TopCenter,
  TopImg,
  TopLeft,
  TopTitle,
  TopText,
  TopRight,
} from '../styles/topbar';

import { Button, Container, Title, Video, VideoContainer } from '../styles/ocr';

function OCR() {
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  const [video, setVideo] = useState();
  const [preview, setPreview] = useState();
  const [text, setText] = useState();
  const [pdf, setPDF] = useState();

  const { jsPDF } = require('jspdf');

  var snapshoter;
  let url = [];
  let obj = {};
  let recognized_Text = '';

  const videoHandler = async (e) => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.item(0);
    setVideo(file);
  };

  const onSnapshot = async () => {
    snapshoter = new VideoSnapshot(video);
    const currentTime = videoRef.current.currentTime;
    const videoPreview = await snapshoter.takeSnapshot(currentTime);
    setPreview(videoPreview);
    handleOCR(videoPreview);
  };

  const handleOCR = async (preview) => {
    // console.log('to upload ...', preview)
    try {
      fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: preview }),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log(response.status);
        response.json().then((data) => {
          console.log('data:', data);
          url.push(data);
          // console.log('url', url)
          // console.log('url[0]', url[0])
          generatePDF(url[0]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function generatePDF(txt) {
    recognized_Text = txt.message;
    setText(recognized_Text);
    const pdf_text = textRef.current;
    console.log('pdf_text', pdf_text);

    const doc = new jsPDF();
    doc.text(recognized_Text, 10, 10);
    doc.save('a4.pdf');
  }

  function handleCloudinary() {
    console.log(pdf);
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
    <>
      <Top>
        <TopLeft>
          <TopImg src="https://www.creative-tim.com/assets/frameworks/icon-nextjs-552cecd0240ba0ae7b5fbf899c1ee10cd66f8c38ea6fe77233fd37ad1cff0dca.png" />
          <TopText>Next js</TopText>
          <TopImg src="https://cdn-images-1.medium.com/max/1200/1*gGzRmUKNOC_X7klFjTk8EA.png" />{' '}
          <TopText>Emotion css</TopText>
          <Cloudinary src="https://res.cloudinary.com/cloudinary-marketing/images/dpr_2.0/c_scale,w_300,dpr_3.0/f_auto,q_auto/v1638460217/website_2021/cloudinary_logo_blue_0720/cloudinary_logo_blue_0720.png?_i=AA" />
        </TopLeft>
        <TopCenter>
          <TopTitle>VIDEO CHARACTER RECOGNITION</TopTitle>
        </TopCenter>
        <TopRight></TopRight>
      </Top>
      <Container>
        <VideoContainer>
          <Title> Video snapshot 🎥</Title>
          <Button onClick={videoHandler}>Select Video</Button>
          <input ref={inputRef} type="file" hidden onChange={handleChange} />
          {video ? (
            <Video
              ref={videoRef}
              className="Video"
              controls
              src={URL.createObjectURL(video)}
            ></Video>
          ) : (
            <Video controls></Video>
          )}
          <Button>Recognize Text</Button>
        </VideoContainer>
      </Container>
    </>
  );
}
export default OCR;
