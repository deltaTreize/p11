const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");


router.post("/login", userController.loginUser);
router.post("/signup", userController.createUser);
router.get("/confirm-email/:userId", userController.confirmEmail);

router.post(
	"/profile",
	tokenValidation.validateToken,
	userController.getUserProfile
);
router.put(
	"/profile",
	tokenValidation.validateToken,
	userController.updateUserProfile
);
router.put(
	"/account",
	tokenValidation.validateToken,
	userController.addAccount
);
router.put(
	"/account/operations",
	tokenValidation.validateToken,
	userController.addOperation
);
router.put(
	"/account/operations/description",
	tokenValidation.validateToken,
	userController.updateDescription
);
router.put(
	"/account/operations/category",
	tokenValidation.validateToken,
	userController.updateCategory
);
router.put(
	"/account/close",
	tokenValidation.validateToken,
	userController.closeAccount
);

router.get("/", userController.getAllProfile);

router.get("/admin/", (req, res) => {
  userController.getAllProfilePagined(req, res);
});

module.exports = router;
