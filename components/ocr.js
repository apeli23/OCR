import { buildUrl } from 'cloudinary-build-url';
import { useRef } from 'react';

function OCR() {
    const image = useRef();

    const handleUpload = async (e) => {
        const file = e.target.files?.item(0);
        console.log('file', file);

        // Store promises in array

        await readFile(file).then((encoded_file) => {
            uploadImage(encoded_file);
        });

    }

    function readFile(file) {
        return new Promise(function (resolve, reject) {
            let fr = new FileReader();

            fr.onload = function () {
                resolve(fr.result);
            };

            fr.onerror = function () {
                reject(fr);
            };

            fr.readAsDataURL(file);
        });
    }
    const uploadImage = async (img) => {
        // console.log('to upload ...', img)
        try {
            fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: img }),
                headers: { "Content-Type": "application/json" },
            }).then((response) => {
                console.log(response.status);
                response.json().then((data) => {
                    console.log(data)
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <input onChange={handleUpload} type="" ref={image} type='file' />
            <button  >Upload</button>
        </div>
    )
} export default OCR;