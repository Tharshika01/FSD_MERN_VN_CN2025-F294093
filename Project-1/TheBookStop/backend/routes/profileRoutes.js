const router = require("express").Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Get Profile
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Update Profile
router.put("/update", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    user.address = {
      street: req.body.street || user.address?.street,
      city: req.body.city || user.address?.city,
      state: req.body.state || user.address?.state,
      pincode: req.body.pincode || user.address?.pincode,
    };

    await user.save();

    res.json({ message: "Profile Updated", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
