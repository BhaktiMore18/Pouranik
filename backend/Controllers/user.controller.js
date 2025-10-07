import User from "../Models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto"; // ✅ Naya import
import nodemailer from "nodemailer"; // ✅ Naya import

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

// ================= NEW: REQUEST PASSWORD RESET =================
export const requestPasswordReset = async (req, res) => {  //  Naya function
  const { email } = req.body;

  try {
    const user = await User.findOne({ email_id: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token & expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken; // ✅ Add fields in user.model.js
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email_id,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password. This link expires in 1 hour.</p>`
    });

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

// ================= NEW: RESET PASSWORD =================
export const resetPassword = async (req, res) => {  // ✅ function
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // token valid hai?
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}
