import User from "../../models/auth-model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (request, responce) => {
  try {
    const { userName, userEmail, userPassword, role } = request.body;
    if (!userName || !userEmail || !userPassword || !role) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({
      $or: [{ userEmail }, { userName }],
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newlyCreatedUser = await User.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
      role,
    });

    return responce.status(201).json({
      success: true,
      msg: "User created successfully",
      userId: newlyCreatedUser?._id,
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
//===============================================================
const loginUser = async (request, responce) => {
  try {
    const { userEmail, userPassword } = request.body;
    if (!userEmail || !userPassword) {
      throw new Error("All fields are required");
    }

    const checkUser = await User.findOne({ userEmail });

    if (!checkUser) {
      throw new Error("User not found");
    }

    if (await bcrypt.compare(userPassword, checkUser?.userPassword)) {
      const userData = {
        _id: checkUser?._id,
        userName: checkUser?.userName,
        userEmail: checkUser?.userEmail,
        role: checkUser?.role,
      };

      const accessToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
        expiresIn: "120m",
      });
      return responce.status(201).json({
        success: true,
        msg: "Logged in successfully",
        data: {
          accessToken,
          user: userData,
        },
      });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

//===============================================================

export { registerUser, loginUser };
