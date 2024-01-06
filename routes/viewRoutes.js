const express = require("express");
const viewsController = require("./../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getHomePage);
router.get("/login", authController.isLoggedIn, viewsController.getLoginPage);
router.get("/signup", authController.isLoggedIn, viewsController.getSignupPage);

module.exports = router;
