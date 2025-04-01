const express = require("express");

const router = express.Router();

// Controller functions
const {
	getUsers,
	loginUser,
	signupUser,
	forgotPassword,
	logOutUser
} = require("../controllers/userController");

// Get all users
router.get("/user", getUsers);


// Login
router.post("/auth/login", loginUser);

// Logout
router.post("/logout", logOutUser);

// Signup
router.post("/auth/signup", signupUser);

//forgot password

router.post("/auth/forgot-password", forgotPassword);



module.exports = router;
