


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
// import transporter from '../config/nodemailer.js'; // 

export const registerUser = async (req, res) => {
  console.log(" Register route hit");
  console.log("Incoming data:", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    console.log(" Checking if user already exists...");
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log(" User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log(" Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(" Creating new user...");
    const newUser = new userModel({ name, email, password: hashedPassword });

    console.log(" Saving user to DB...");
    await newUser.save();

    console.log(" Generating token...");
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });

    // 📧 Commented out email logic temporarily
    /*
    console.log("📧 Sending welcome email...");
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to MY_TODO buddy',
      text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nTODO App Team`
    };
    await transporter.sendMail(mailOptions);
    console.log("📧 Welcome email sent successfully");
    */

    console.log(" Registration successful");
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const isAunthenticated = (req, res) => {
  console.log("🔥 Checking authentication status");
  try {
    return res.status(200).json({ sucess: true });
  }
  catch (error) {
    console.error(" Error checking authentication status:", error);
    return res.json({ message: "Internal server error" });
  }
}


