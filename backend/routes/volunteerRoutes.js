const express = require('express');
const volunteerController = require('../controller/volunteerController');

const router = express.Router();

router.get('/signup', volunteerController.volunteer_signup_get);
router.post('/signup', volunteerController.volunteer_signup_post);
router.get('/login', volunteerController.volunteer_login_get);
router.post('/login', volunteerController.volunteer_login_post);
router.patch('/:id', volunteerController.volunteer_update);
router.delete('/:id', volunteerController.volunteer_delete);
router.get('/logout', volunteerController.volunteer_logout_get)

module.exports = router;
