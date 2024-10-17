require('dotenv').config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const handlingErrors = require('../errors/handlingErrors');
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
// Configuration
cloudinary.config({
  cloud_name: "dlo1upt02",
  api_key: "624951121267476",
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({id, role}, process.env.JWT_SECRET , {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.create({ email, password, role });
    const token = createToken(user._id, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      user: user._id,
    });

  } catch (err) {
    const errors = handlingErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.volunteer_signup_post = async (req, res, next) => {
  const { Volunteername, email, password, description, skills } = req.body;
  try {
    const profilePicture = req.files.profilePicture;
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // Check if tempFilePath exists
    if (!profilePicture.tempFilePath) {
      return res
        .status(400)
        .json({ errors: { photo: "Temporary file path is missing." } });
    }
    // Upload the file to Cloudinary
    cloudinary.uploader.upload(
      profilePicture.tempFilePath,
      { folder: "volunteers" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).send("File upload failed.");
        }

        //Handle skills
        let skillArray = [];
        if (skills) {
          if (Array.isArray(skills)) {
            skillArray = skills;
          } else if (typeof skills === "string") {
            //Assuming skills are sent as a comma-seperated string
            skillArray = skills.split(",").map((skill) => skill.trim());
          }

          //create the volunteer in the database
        }
        const volunteer = await User.create({
          Volunteername,
          email,
          password,
          profilePicture: result.secure_url,
          description,
          skills: skillArray,
          role: 'volunteer'
          // isApproved defaults to false for volunteers in the model
        });

        //create JWT token
        const token = createToken(volunteer._id, volunteer.role);

        //Set jwt token in a cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          maxAge: maxAge * 1000,
        });

        //respond with success
        res.status(201).json({
          volunteer: volunteer._id,
        });

        // Optionally, delete the temporary file after uploading
        fs.unlink(profilePicture.tempFilePath, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });
      }
    );
  } catch (err) {
    const errors = handlingErrors(err);
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
    const token = createToken(user._id, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({
      message: "logged in successfully",
      user: user._id,
      role: user.role,
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