require("dotenv").config();
const Blog = require("../models/blogModel");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
// Configuration
cloudinary.config({
  cloud_name: "dlo1upt02",
  api_key: "624951121267476",
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

module.exports.blog_get_by_id = async (req, res) => {
  try {
    const blogId = req.params.id; // Assuming the route is /blogs/:id
    if (!blogId) {
      return res.status(400).json({ error: "Blog ID is required." });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
  }
};

module.exports.blog_post = async (req, res) => {
  const { title, body } = req.body;
  try {
    const volunteerId = req.user.id;
    const blog = await Blog.create({
      title,
      // snippet,
      body,
      Createdby: volunteerId,
      // image: result.secure_url,
    });

    // const populatedBlog = await blog.populate("createdBy", "name email image");
    res.status(201).json({ blog });

    // const image = req.files.photo;
    // // Check if files were uploaded
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).send("No files were uploaded.");
    // }

    // // Check if tempFilePath exists
    // if (!image.tempFilePath) {
    //   return res
    //     .status(400)
    //     .json({ errors: { photo: "Temporary file path is missing." } });
    // }
    // Upload the file to Cloudinary
    // cloudinary.uploader.upload(
    //   image.tempFilePath,
    //   { folder: "blogs" },
    //   async (error, result) => {
    //     if (error) {
    //       console.error("Cloudinary Upload Error:", error);
    //       return res.status(500).send("File upload failed.");
    //     }

    //     // Optionally, delete the temporary file after uploading
    //     fs.unlink(image.tempFilePath, (err) => {
    //       if (err) console.error("Error deleting temp file:", err);
    //     });
    // }
    // );
  } catch (err) {
    console.log(err);
  }
};

module.exports.blog_update = async (req, res) => {
  try {
    const blogId = req.params.id;
    const {updates} = req.body;
    const user = req.user;

    // Log the update operation
    console.log(`Updating Blog ID: ${blogId} with:`, updates);

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // Check if the user is the author or an admin
    if (blog.Createdby.toString() !== user.id.toString() && !user.role.includes('admin')) {
      return res.status(403).json({ message: 'Access denied: You can only update your own blogs.' });
    }

     // Perform the update
     const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {$set: updates},
      {new: true}
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    res.status(200).json({
      message: 'Blog updated successfully.',
      blog: updatedBlog,
    });

  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports.blog_delete = async (req, res) => {
  try {
    const blogId = req.params.id;
    const user = req.user;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // Check if the user is the author or an admin
    if (blog.Createdby.toString() !== user.id.toString() && !user.role.includes('admin')) {
      return res.status(403).json({ message: 'Access denied: You can only update your own blogs.' });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    res.status(200).json({
      message: 'Blog deleted successfully.',
      blog: deletedBlog,
    });

  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};