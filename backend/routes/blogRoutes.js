const express = require("express");
const blogController = require("../controller/blogController");
const verifytoken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


router.get(
  "/:id",
  // verifytoken,
  // authorizeRoles("volunteer", "admin", "user"),
  blogController.blog_get_by_id
);

router.get(
  "/",
  // verifytoken,
  // authorizeRoles("volunteer", "admin", "user"),
  blogController.blog_get_all
);

router.get(
  "/search",
  // verifytoken,
  // authorizeRoles("volunteer", "admin", "user"),
  blogController.blog_search
);

router.post(
  "/",
  // verifytoken,
  // authorizeRoles("volunteer", "admin"),
  blogController.blog_post
);

router.put(
  "/:id",
  // verifytoken,
  // authorizeRoles("volunteer", "admin"),
  blogController.blog_update
);

router.delete(
  "/:id",
  // verifytoken,
  // authorizeRoles("volunteer", "admin"),
  blogController.blog_delete
);

module.exports = router;
