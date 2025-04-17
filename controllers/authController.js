const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
  
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id, user.username, user.email);
    res.status(201).json({ message: 'Registration successful', token });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user. Please try again.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Email not found. Please register or try again with a valid email.' });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    const token = generateToken(user._id, user.username, user.email,user.userType);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login. Please try again.' });
  }
};

const generateToken = (id, username, email, userType) => {
  return jwt.sign({ id, username, email, userType }, "surajsahani", {
    expiresIn: '30d',
  });
};
