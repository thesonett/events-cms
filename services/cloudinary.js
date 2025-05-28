import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

const storage = multer.memoryStorage()
const upload = multer({ storage })
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

function uploadImage({ original_filename, buffer }) {
    try {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                    public_id: original_filename,
                    overwrite: true,
                    invalidate: true,
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary error inside uploadImage!\n', error)
                        return reject({ success: false, message: 'Upload failed' })
                    }
    
                    resolve({
                        success: true,
                        message: 'Image uploaded!',
                        imageData: {
                            file_name: result.public_id,
                            image_url: result.secure_url,
                        },
                    })
                }
            ).end(buffer)
        })
    }
    catch(error) {
        console.error('Exception occurred inside uploadImage!\n', error)
        return { success: false, message: 'Exception:::: Cloudinary error inside uploadImage!' }
    }
}


export {
    uploadImage,
    upload,
}