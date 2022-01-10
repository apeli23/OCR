import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';

function Test4() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

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
    console.log(`target.file`, target.files[0])
    fileToBase64(target.files[0], (err, result) => {
      if (result) {
        setFile(result);
        setFileName(target.files[0]);
      }
    });
    
  };
  console.log(file);
  return (
    <div>
      <div className="upload-area">
        {fileName && <p className="filename">{fileName.name}</p>}
        <input
          type="file"
          name="filetobase64"
          onChange={onUploadFileChange}
          accept="application/pdf"
        />
      </div>
      <br />
      {file ? (
        <textarea
          id="base64File"
          rows="30"
          cols="150"
          value={file}
          readOnly
        ></textarea>
      ) : null}
    </div>
  );
}
export default Test4;
