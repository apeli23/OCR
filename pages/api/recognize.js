var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req,res) {
    let uploaded_url = ""
    const fileStr = "https://res.cloudinary.com/demo/image/upload/c_crop,g_west,h_1440,w_1520,x_50/black_car.jpg";
    
    if (req.method === "POST") {
        const uploadedResponse = await cloudinary.uploader.upload_stream(fileStr,{ocr:"adv_ocr"}, (err, result) => {
            if(err) {
                return response.status(500).json({message: "an error occured"})
            }
            const {textAnnotaton} = result.info.ocr.adv_ocr.data[0]

            const extractedText = textAnnotaton.map((anno, i) => i > 0 && anno.description.replace(/[^0-9a-z]/gi, ''))
                .filter(entry => typeof entry==='string')
            
            console.log(`extractedText` )
        }
             
        )
    }
}