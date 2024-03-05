const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

router.post(
	"/profile",
	tokenValidation.validateToken,
	userController.getUserProfile
);

router.put(
	"/profile",
	tokenValidation.validateToken,
	userController.updateUserProfile,
	userController.addAccount
);
router.put(
	"/profile",
	tokenValidation.validateToken,
	userController.addAccount
);

router.delete(
	"/profile/:id",
	tokenValidation.validateToken,
	userController.deleteUserProfile
);

router.get(
	"/",
	userController.getAllProfile
);

module.exports = router;