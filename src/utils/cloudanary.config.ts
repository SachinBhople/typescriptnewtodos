
// const cloudinary = require("cloudinary").v2
import clould from "cloudinary"
const cloudinary = clould.v2
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY as string,
    cloud_name: process.env.CLOUD_NAME as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

export default cloudinary