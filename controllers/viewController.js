const catchAsync = require("../utils/catchAsync");

exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

exports.getSignupPage = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", {
    title: "Signup",
  });
});
