import express from "express";
import { createOrder } from "../../controllers/student-controller/order-controller.js";

const studentOrderRouter = express.Router();

studentOrderRouter.route("/create-order").post(createOrder);

export default studentOrderRouter;
