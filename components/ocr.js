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
import {
  Flex,
  Button,
  Container,
  Title,
  Video,
  VideoContainer,
  UploadButton,
  Status,
  Text,
} from '../styles/ocr';
import Link from 'next/link';

function OCR() {
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const pdfRef = useRef(null);

  const [video, setVideo] = useState();
  const [uploadready, setUploadReady] = useState(false);
  const [link, setLink] = useState('');

  const { jsPDF } = require('jspdf');

  var snapshoter;
  let url = [];
  let recognized_Text = '';

  const videoHandler = async (e) => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.item(0);
    setVideo(file);
  };

  const handleSnapshot = async () => {
    snapshoter = new VideoSnapshot(video);
    const currentTime = videoRef.current.currentTime;
    const videoPreview = await snapshoter.takeSnapshot(currentTime);
    handleOCR(videoPreview);
  };

  const handleOCR = async (preview) => {
    try {
      fetch('/api/tesseract', {
        method: 'POST',
        body: JSON.stringify({ data: preview }),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log(response.status);
        response.json().then((data) => {
          url.push(data);
          generatePDF(url[0]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function generatePDF(text) {
    recognized_Text = text.message;

    const doc = new jsPDF();
    doc.text(recognized_Text, 10, 10);

    doc.save('a4.pdf');
    setUploadReady(true);
  }

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const onUploadFileChange = ({ target }) => {
    console.log(`target.file`, target.files[0]);
    fileToBase64(target.files[0], (err, result) => {
      if (result) {
        handleCloudinary(result);
      }
    });
  };

  async function handleCloudinary(pdf) {
    try {
      fetch('/api/cloudinary', {
        method: 'POST',
        body: JSON.stringify({ data: pdf }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          setLink(data.data);
        });
    } catch (error) {
      console.error(error);
    }
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
          {link ? (
            <Status>
              <Link href={link} passHref>
                <a>
                  <Text>{link}</Text>
                </a>
              </Link>
            </Status>
          ) : (
            ''
          )}
          <Button 
            title="click to select video"
            onClick={videoHandler}
          >Select Video
          </Button>
          <input ref={inputRef} type="file" hidden onChange={handleChange} />
          {video ? (
            <Video
              ref={videoRef}
              className="Video"
              controls
              src={URL.createObjectURL(video)}
            ></Video>
          ) : (
            <Video
            title="video shows here"
            controls></Video>
          )}
          <Flex>
            <Button
              title="click to begin text recognition"
             onClick={handleSnapshot}
             >Recognize Text 📝
            </Button>
            <UploadButton
              title="upload generated PDFs"
              onClick={() => {
                pdfRef.current.click();
              }}
            >
              Upload
            </UploadButton>
          </Flex>
          <input
            ref={pdfRef}
            type="file"
            name="filetobase64"
            onChange={onUploadFileChange}
            accept="application/pdf"
            hidden
          />
        </VideoContainer>
      </Container>
    </>
  );
}
export default OCR;
