import jwt from "jsonwebtoken";

const isSigned = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ success: false, message: "Token not found" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userIdFromToken = decodedToken.id; // Assuming userId is stored in the token payload

    // Comparing userId from token with userId in request
    const { uid } = req.params;
    if (userIdFromToken !== uid) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // If userId from token matches userId in request, execution continues to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default isSigned;
