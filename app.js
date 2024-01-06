const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const appError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
const viewRouter = require("./routes/viewRoutes");

// 1) GLOBAL MIDDLEWARES

// serving static files

app.use(express.static(path.join(__dirname, "public")));

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

// Test Middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
