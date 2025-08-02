import User from "../Models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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