import express from "express";
import multer from "multer";
import {
  bulkUploadMedia,
  deleteMedia,
  uploadMedia,
} from "../../controllers/instructor-controller/mediaController.js";
const mediaRouter = express.Router();

const upload = multer({ dest: "uploads/" });

mediaRouter.post("/upload", upload.single("file"), uploadMedia);
mediaRouter.delete("/delete/:id", deleteMedia);
mediaRouter.post("/bulk-upload", upload.array("files", 10), bulkUploadMedia);

export default mediaRouter;
