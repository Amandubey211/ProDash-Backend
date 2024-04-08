import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

//password Validation
export const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(
    password
  );
};

//user name validation
export const validateUsername = (userName) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(userName);
};
export const validateMobileNumber = (mobileNumber) => {
  return /^\d{10}$/.test(mobileNumber);
};

export const hashPassword = async (password) => {
  try {
    let saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error("Password hashing failed"); //
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3d",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};
