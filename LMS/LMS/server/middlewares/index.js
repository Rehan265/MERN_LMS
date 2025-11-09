import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const checkAuth = (request, responce, next) => {
  try {
    const authheader = request.headers.authorization;

    if (!authheader) {
      return responce.status(200).json({
        success: false,
        msg: "User is not authorized",
      });
    }

    const token = authheader.split(" ")[1];

    payload = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return responce.status(200).json({
          success: false,
          msg: "User is not authorized",
        });
      }
      request.user = data;
      next();
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: "User is not authorized",
    });
  }
};

export { checkAuth };
