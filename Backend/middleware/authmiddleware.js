
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const userauth = async (req, res, next) => {
  console.log(" Auth middleware hit");
  const { token } = req.cookies;

  if (!token) {
    console.log(" No token found, unauthorized access");
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      console.log(" No user found for token");
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    console.log(" Token verified, user:", req.user._id);
    next();
  } catch (error) {
    console.error(" Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
