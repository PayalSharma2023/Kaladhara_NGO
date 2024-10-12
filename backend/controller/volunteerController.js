const jwt = require("jsonwebtoken");
require('dotenv').config();
const Volunteer = require("../models/volunteerModel");
const handlingErrors = require("../errors/handlingErrors");
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
const createToken = (id) => {
  return jwt.sign({ id }, "volunteer secret key", {
    expiresIn: maxAge,
  });
};

module.exports.volunteer_signup_get = (req, res) => {
  res.send("signup");
};

module.exports.volunteer_signup_post = async (req, res, next) => {
  const { Volunteername, email, password, description, skills } = req.body;
  try {
    const profilePicture = req.files.photo;
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
        const volunteer = await Volunteer.create({
          Volunteername,
          email,
          password,
          profilePicture: result.secure_url,
          description,
          skills: skillArray,
        });

        //create JWT token
        const token = createToken(volunteer._id);

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

module.exports.volunteer_login_get = (req, res) => {
  res.send("login");
};

module.exports.volunteer_login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const volunteer = await Volunteer.login(email, password);
    const token = createToken(volunteer._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({
      volunteer,
    });
  } catch (err) {
    const errors = handlingErrors(err);
    console.log(errors);
  }
};

module.exports.volunteer_logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.volunteer_update = async (req, res) => {
  const volunteerId = req.params.id;
  const { updates } = req.body;
  try {

    const { skills, ...otherUpdates } = updates;
    let updateObject = {};

    // If there are fields other than 'skills' to update, add them using $set
    if (Object.keys(otherUpdates).length > 0) {
      updateObject.$set = otherUpdates;
    }

    // If 'skills' are provided, add them using $addToSet to avoid duplicates
    if (skills && Array.isArray(skills) && skills.length > 0) {
      updateObject.$addToSet = { skills: { $each: skills } };
    }

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      updateObject,
      { new: true, runValidators: true } // 'new: true' returns the updated document
    );
    // Check if volunteer was found and updated
    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    // Respond with the updated volunteer
    res.status(200).json({ result: updatedVolunteer });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports.volunteer_delete = async (req, res) => {
  const volunteerId = req.params.id;
  try {
    await Volunteer.findByIdAndDelete(volunteerId).then(() => {
      res.status(200).json({ mssg: "Account deleted successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
