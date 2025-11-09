import {
  deleteMediaToCloudinary,
  uploadMediaToCloudinary,
} from "../../helpers/cloudinary.js";

const uploadMedia = async (request, responce) => {
  try {
    const result = await uploadMediaToCloudinary(request.file.path);
    return responce.status(200).json({
      success: true,
      msg: "Media Uploaded successfully",
      result,
    });
  } catch (error) {
    responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
const deleteMedia = async (request, responce) => {
  try {
    const { id } = request.params;

    if (!id) {
      return responce.status(200).json({
        success: false,
        msg: "All fields are required",
      });
    }

    await deleteMediaToCloudinary(id);
    return responce.status(200).json({
      success: true,
      msg: "Asset Deleted successfully from cloudinary",
    });
  } catch (error) {
    responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
const bulkUploadMedia = async (request, responce) => {
  try {
    console.log(request.files);

    const uploadPromises = request.files.map((fileItem) => {
      return uploadMediaToCloudinary(fileItem.path);
    });

    const result = await Promise.all(uploadPromises);
    console.log(result);

    return responce.status(200).json({
      success: true,
      msg: "Bulk Media Uploaded successfully",
      result,
    });
  } catch (error) {
    responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

export { uploadMedia, deleteMedia, bulkUploadMedia };
