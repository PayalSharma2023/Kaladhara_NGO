const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    Volunteername: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "minimum length for password is 6"],
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dlo1upt02/image/upload/v1695749590/default_profile_pic.jpg", // Replace with your default image URL
    },
    description: {
      type: String,
      minlength: [10, "minimum length is 10"],
      maxlength: [1000, "cannot exceed 100 letters"]
    },
    role: {
      type: String,
      enum: ["volunteer", "admin"],
      default: "volunteer",
    },
    skills: {
      type: [String], // Array of skill names
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  },
  { timestamps: true }
);

//fire a function after doc saved to db
volunteerSchema.post("save", function (doc, next) {
  console.log("new volunteer was created and saved", doc);
  next();
});

//hashing password before saving it to db
volunteerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.role = "volunteer";
  this.updatedAt = Date.now();
  next();
});

//creating a static method
volunteerSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const Volunteer = mongoose.model("volunteers", volunteerSchema);

module.exports = Volunteer;
