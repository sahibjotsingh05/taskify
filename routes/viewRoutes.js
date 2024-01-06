const express = require("express");
const viewsController = require("./../controllers/viewController");

const router = express.Router();

router.get("/login", viewsController.getLoginPage);
router.get("/signup", viewsController.getSignupPage);

module.exports = router;
