import userModel from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
    const user = await userModel.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(" Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}