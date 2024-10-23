// controllers/adminController.js
const User = require('../models/userModel');

// Approve or Reject Volunteer
const approveVolunteer = async (req, res) => {
    const Volunteerid = req.params.id;
    const { isApproved } = req.body; // true or false

    try {
        const volunteer = await User.findById(Volunteerid);

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        if (volunteer.role !== 'volunteer') {
            return res.status(400).json({ message: 'User is not a volunteer' });
        }

        volunteer.isApproved = true;
        await volunteer.save();

        res.status(200).json({ message: `Volunteer has been ${isApproved ? 'approved' : 'rejected'}`, volunteer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during approval process' });
    }
};

// Get All Volunteers Awaiting Approval
const getVolunteersAwaitingApproval = async (req, res) => {
    try {
        const volunteers = await User.find({ role: 'volunteer', isApproved: false }).select('-password');
        res.status(200).json(volunteers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching volunteers' });
    }
};

// Get All Volunteers (Approved and Pending)
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await User.find({ role: 'volunteer' }).select('-password').sort({});
        res.status(200).json(volunteers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching volunteers' });
    }
};

module.exports = { approveVolunteer, getVolunteersAwaitingApproval, getAllVolunteers };
