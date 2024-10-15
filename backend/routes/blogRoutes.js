const express = require("express");
const blogController = require("../controller/blogController");
const verifytoken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


router.get(
  "/blog/:id",
  verifytoken,
  authorizeRoles("volunteer", "admin", "user"),
  blogController.blog_get_by_id
);

router.get(
  "/blog",
  verifytoken,
  authorizeRoles("volunteer", "admin", "user"),
  blogController.blog_get_all
);

router.get(
  "/blog-search",
  verifytoken,
  authorizeRoles("volunteer", "admin", "user"),
  blogController.blog_search
);

router.post(
  "/blog",
  verifytoken,
  authorizeRoles("volunteer", "admin"),
  blogController.blog_post
);

router.put(
  "/blog/:id",
  verifytoken,
  authorizeRoles("volunteer", "admin"),
  blogController.blog_update
);

router.delete(
  "/blog/:id",
  verifytoken,
  authorizeRoles("volunteer", "admin"),
  blogController.blog_delete
);

module.exports = router;
