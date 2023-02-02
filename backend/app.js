var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require("dotenv").config();

// ** import api router
var apiRouter = require("./routes/api");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ** use api router
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message });
});

module.exports = app;
