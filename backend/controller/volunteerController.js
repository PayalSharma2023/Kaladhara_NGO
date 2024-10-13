const User = require("../models/userModel");

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

    const updatedVolunteer = await User.findByIdAndUpdate(
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
    await User.findByIdAndDelete(volunteerId).then(() => {
      res.status(200).json({ mssg: "Account deleted successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
