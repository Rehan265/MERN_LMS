import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinaryV2.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    throw new Error("Error Uploading to cloudinary");
  }
};
// const deleteMediaToCloudinary = async (publicId) => {
//   try {
//     await cloudinaryV2.uploader.destroy(publicId);
//   } catch (error) {
//     throw new Error("Error deleting to cloudinary");
//   }
// };

const deleteMediaToCloudinary = async (publicId) => {
  try {
    const result = await cloudinaryV2.uploader.destroy(publicId);
    console.log("Deleted:", result);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error("Error deleting from Cloudinary");
  }
};

export { uploadMediaToCloudinary, deleteMediaToCloudinary };
