const express = require('express');
const adminController = require('../controller/adminController');
const volunteerController = require('../controller/volunteerController');
const verifytoken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');


const router = express.Router();

// Approve Volunteer
router.put('/approve-volunteer/:id', verifytoken , authorizeRoles('admin'), adminController.approveVolunteer);

// Get All Volunteers Awaiting Approval
router.get('/volunteers-awaiting-approval', verifytoken, authorizeRoles('admin'), adminController.getVolunteersAwaitingApproval);

// Optional: Get All Volunteers
router.get('/volunteers', verifytoken, authorizeRoles('admin'), adminController.getAllVolunteers);

//defining api end points

router.put('/volunteers/:id', verifytoken, authorizeRoles("admin"), volunteerController.volunteer_update);
router.delete('/volunteers/:id',  verifytoken, authorizeRoles("admin"), volunteerController.volunteer_delete);

module.exports = router;