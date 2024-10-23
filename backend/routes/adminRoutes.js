const express = require("express");
const adminController = require("../controller/adminController");
const volunteerController = require("../controller/volunteerController");
const projectController = require("../controller/projectController");
const eventController = require("../controller/eventController");
const schoolController = require("../controller/schoolController");
const verifytoken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();
// Approve Volunteer
router.put(
  "/volunteers/:id/approve",
  verifytoken,
  authorizeRoles("admin"),
  adminController.approveVolunteer
);

// Get All Volunteers Awaiting Approval
router.get(
  "/volunteers-awaiting-approval",
  verifytoken,
  authorizeRoles("admin"),
  adminController.getVolunteersAwaitingApproval
);

// Optional: Get All Volunteers
router.get(
  "/volunteers",
  verifytoken,
  authorizeRoles("admin"),
  authorizeRoles("admin"),
  adminController.getAllVolunteers
);

//defining api end points

router.put(
  "/volunteers/:id",
  verifytoken,
  authorizeRoles("admin"),
  volunteerController.volunteer_update
);
router.delete(
  "/volunteers/:id/reject",
  verifytoken,
  authorizeRoles("admin"),
  volunteerController.volunteer_delete
);

//Routes related to project
router.get(
  "/project",
  verifytoken,
  authorizeRoles("admin"),
  projectController.project_get
);
router.get(
  "/project/:id",
  verifytoken,
  authorizeRoles("admin"),
  projectController.project_getbyId
);
router.post(
  "/project",
  verifytoken,
  authorizeRoles("admin"),
  projectController.project_post
);
router.put(
  "/project/:id",
  verifytoken,
  authorizeRoles("admin"),
  projectController.project_update
);
router.delete(
  "/project/:id",
  verifytoken,
  authorizeRoles("admin"),
  projectController.project_delete
);
//Routes related to enents
router.get(
  "/event",
  verifytoken,
  authorizeRoles("admin"),
  eventController.Event_get
);
router.get(
  "/event/:id",
  verifytoken,
  authorizeRoles("admin"),
  eventController.Event_getbyId
);
router.post(
  "/event",
  verifytoken,
  authorizeRoles("admin"),
  eventController.Event_post
);
router.put(
  "/event/:id",
  verifytoken,
  authorizeRoles("admin"),
  eventController.Event_update
);
router.delete(
  "/event/:id",
  verifytoken,
  authorizeRoles("admin"),
  eventController.Event_delete
);
//Routes related to enents
router.get(
  "/school",
  verifytoken,
  authorizeRoles("admin"),
  schoolController.School_get
);
router.get(
  "/School/:id",
  verifytoken,
  authorizeRoles("admin"),
  schoolController.School_getbyId
);
router.post(
  "/school",
  verifytoken,
  authorizeRoles("admin"),
  schoolController.School_post
);
router.put(
  "/school/:id",
  verifytoken,
  authorizeRoles("admin"),
  schoolController.School_update
);
router.delete(
  "/school/:id",
  verifytoken,
  authorizeRoles("admin"),
  schoolController.School_delete
);

module.exports = router;
