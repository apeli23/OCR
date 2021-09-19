var cloudinary = require("cloudinary").v2;
import Tesseract from 'tesseract.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

 
export default async function handler(req, res) {
  let uploaded_url = ""
  const fileStr = req.body.data

  if (req.method === "POST") {

    console.log("backend received", fileStr);

  //   try {
  //     Tesseract.recognize(
  //       fileStr,
  //       'eng',
  //       { logger: m => console.log(m) }
  //     ).then(({ data: { text } }) => {
         
  //       uploaded_url = text 
      
  //     })
  //   } catch (error) {
  //     console.log('error', error);
  //   }

  //     res.status(200).json({ data : uploaded_url });
  //     console.log(uploaded_url);
  }
}