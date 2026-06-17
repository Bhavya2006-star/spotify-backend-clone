const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists =
      await User.findOne({ email }) ||
      await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Login Successful"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login
};