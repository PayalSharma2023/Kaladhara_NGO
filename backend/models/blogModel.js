const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    snippet: {
      type: String,
      required: [true, "Snippet is required"],
      trim: true,
      maxlength: [300, "Snippet cannot exceed 300 characters"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    tags: [String], // Assuming tags is an array of strings
    // image: {
    //     type: String,
    //     default:
    //       "https://res.cloudinary.com/dlo1upt02/image/upload/v1695749590/default_profile_pic.jpg", // Replace with your default image URL
    // },
    Createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
      {
        _id: true, // Automatically generates an _id for each comment
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Optional: Hide sensitive fields when converting to JSON
blogSchema.methods.toJSON = function () {
  const blog = this.toObject();
  delete blog.__v;
  return blog;
};

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
