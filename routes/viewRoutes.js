const express = require("express");
const viewsController = require("./../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, viewsController.getHomePage);
router.get("/login", viewsController.getLoginPage);
router.get("/signup", viewsController.getSignupPage);

module.exports = router;
