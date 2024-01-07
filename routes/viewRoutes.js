const express = require("express");
const viewsController = require("./../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/:day/:month/:year",
  authController.protect,
  viewsController.getHomePage
);
router.get("/", authController.protect, viewsController.getHomePage);
router.get("/login", viewsController.getLoginPage);
router.get("/signup", viewsController.getSignupPage);

router.post("/createTask", authController.protect, viewsController.createTask);

module.exports = router;
