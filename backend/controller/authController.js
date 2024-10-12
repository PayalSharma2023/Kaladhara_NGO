require('dotenv').config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const handlingErrors = require('../errors/handlingErrors');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET , {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      user: user._id,
      token,
    });
  } catch (err) {
    const errors = handlingErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("signup");
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = await createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({
      message: "logged in successfully",
      user: user._id,
    });
  } catch (err) {
    const errors = handlingErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res)=>{
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect('/')
}