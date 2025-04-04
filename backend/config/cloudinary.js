import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath){
        console.error("No local file path provided for upload.");
        return null
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        await fs.unlink(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        try {
            await fs.unlink(localFilePath);
        } catch (unlinkError) {
            console.error("Error deleting local file after failed upload:", unlinkError);
        }

        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
    //   console.log("Cloudinary Deletion Result:", result);
  
      if (result.result !== "ok") {
        console.error("Failed to delete from Cloudinary:", result);
        throw new Error("Cloudinary deletion failed");
      }
  
      return result;
    } catch (error) {
      console.error("Cloudinary Delete Error:", error);
      throw error;
    }
  };
  

export {uploadOnCloudinary, deleteFromCloudinary};
