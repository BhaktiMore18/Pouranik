import User from "../Models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendPasswordResetEmail, sendPasswordResetConfirmation } from "../Utils/emailService.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async(req, res) => {
    const { email, password, FullName } = req.body;

  try {
    const existingUser = await User.findOne({ email_id: email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email_id: email, name: FullName, password: hashedPassword });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(201).json({ token, user: { email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
}

export const logIn = async(req, res) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email_id: email });
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({ token, user: { email: user.email }, message: "Welcome back !" });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
}

export const getUserDetails = async(req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try{
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user: {email: user.email_id, name: user.name }});
  }catch(error){
    console.error("Error fetching user details: ", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

export const refreshToken = async(req, res) => {
  const user = req.user;
  const newToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "2h"});
  res.status(200).json({ token: newToken });
}

/**
 * Forgot Password - Send reset email
 * POST /api/v1/user/forgot-password
 */
export const forgotPassword = async(req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email_id: email });
    
    if (!user) {
      // For security reasons, don't reveal if email exists or not
      return res.status(200).json({ 
        success: true, 
        message: "If that email exists, a password reset link has been sent." 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token before saving to database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token and expiration to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    
    await user.save();

    // Send email with unhashed token
    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ 
      success: true, 
      message: "Password reset link has been sent to your email." 
    });

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error sending password reset email. Please try again later.", 
      error: error.message 
    });
  }
}

/**
 * Reset Password - Update password with token
 * POST /api/v1/user/reset-password/:token
 */
export const resetPassword = async(req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: "Password must be at least 6 characters long" 
    });
  }

  try {
    // Hash the token from URL to compare with database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token and not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() } // Token not expired
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Password reset token is invalid or has expired" 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    // Send confirmation email
    await sendPasswordResetConfirmation(user.email_id);

    res.status(200).json({ 
      success: true, 
      message: "Password has been reset successfully. You can now login with your new password." 
    });

  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error resetting password. Please try again later.", 
      error: error.message 
    });
  }
}