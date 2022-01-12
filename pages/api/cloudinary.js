var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req,res) {
    let uploaded_url = ""
    const fileStr = "https://res.cloudinary.com/demo/image/upload/c_crop,g_west,h_1440,w_1520,x_50/c_scale,h_283/black_car.jpg";
    
    if (req.method === "POST") {
      console.log(fileStr)
        try {
           
            const uploadedResponse = await cloudinary.uploader.upload(
              fileStr,
              {
                chunk_size: 6000000,
                
              }
            );
           uploaded_url = uploadedResponse.secure_url
          console.log(uploaded_url)
        } catch (error) {
          console.log(error)
        }
        res.status(200).json({ data : uploaded_url });
        console.log('comlete!')
    }
}