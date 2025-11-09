import express from "express";
import {
  loginUser,
  registerUser,
} from "../../controllers/auth-controller/auth-controller.js";
import { checkAuth } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.get("/check-auth", checkAuth, (request, responce) => {
  const userData = request.user;

  return responce.status(200).json({
    success: true,
    msg: "User Authenticated Successfully",
    data: {
      userData,
    },
  }); 
});

export default authRouter;
