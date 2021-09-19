var cloudinary = require("cloudinary").v2;
import Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';

const worker = createWorker({
  logger: m => console.log(m)
});


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

    // console.log("backend received", fileStr);

    try {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(fileStr);
      // console.log(text);
      uploaded_url = text
      await worker.terminate();
    } catch (error) {
      console.log('error', error);
    }

    res.status(200).json({ message: uploaded_url });
    // console.log("upoaded_url", uploaded_url);
    console.log('backend complete')
  }
}