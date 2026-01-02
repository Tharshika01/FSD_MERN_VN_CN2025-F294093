const express = require("express");
const router = express.Router();
const { register, login, getAllUsers } = require("../controllers/authController");

// POST routes
router.post("/register", register);
router.post("/login", login);

// ✅ GET all users
router.get("/users", getAllUsers);

module.exports = router;
