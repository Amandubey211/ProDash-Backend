import UserAuthModel from "../Model/UserAuth.Model.js";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/AuthUtils.js";
import { sendMail } from "../utils/NodeMailer.js";
import jwt from "jsonwebtoken";

export const SignUpController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateUsername(userName)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid details provided",
      });
    }

    const existingUser = await UserAuthModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please use a different email address",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = new UserAuthModel({
      userName: userName,
      password: hashedPassword,
      email: email,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.token = accessToken;
    user.save();

    // Send verification email
    sendMail("signup", user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};

export const SignInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid details provided",
      });
    }

    const user = await UserAuthModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.token = accessToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        userName: user.userName,
        userId: user._id,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while LogingIn",
    });
  }
};

export const VerifyController = async (req, res) => {
  try {
    const { token } = req.body;
    const { uid } = req.params;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please log in to continue",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    const userIdFromToken = decodedToken.id;

    if (userIdFromToken !== uid) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    res.status(200).json({
      success: true,
      message: "Token is valid",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("token expired");
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};
