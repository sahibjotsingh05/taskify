const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

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

exports.getHomePage = catchAsync(async (req, res, next) => {
  let { day, month, year } = req.params;
  let istoday = false;
  if (!day || !month || !year) {
    const today = new Date();
    day = day || today.getDate();
    month = month || today.getMonth() + 1;
    year = year || today.getFullYear();
    istoday = true;
  }

  const user = await User.findById(req.user.id, { tasks: 1 });
  console.log(user);

  res.status(200).render("dashboard", {
    title: "Welcome to Dashboard",
    day,
    month,
    year,
    istoday,
    user,
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  // Find the user by ID
  const user = await User.findById(req.user.id);

  // Add the task to the tasks array
  user.tasks.push(req.body);

  // Save the updated user
  await user.save();

  res.status(200).json({ message: "Task added successfully" });
});
