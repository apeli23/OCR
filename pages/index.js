import Image from '../img/galaxy.png'
import { buildUrl } from 'cloudinary-build-url';

const url = buildUrl('black_car_gx0hta', {
  cloud: {
    cloudName: 'dogjmmett',
  },
  transformation: [
    { gravity: "west", height: 1440, width: 1520, x: 50, crop: "crop" },
    { effect: "pixelate_region:15", gravity: "ocr_text" }
  ]
});


export default function Home() {

  return (
    <div>

      <img
        src={url}
        alt="Galaxy"
        width={300}
        height={300}
      /><h3>Cloudinary - Static</h3>

    </div>
  )
}