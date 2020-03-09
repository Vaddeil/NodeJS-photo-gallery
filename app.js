const path = require("path");
const express = require("express");
const ejs = require("ejs");
const gallery = require("./gallery");
const pageInfo = require("./pageInfo");

const app = express();

// Moment Module
const moment = require("moment");
const year = "YYYY";

app.locals.moment = require("moment");
app.locals.year = year;

//
app.locals.gallery = gallery;
app.set("view engine", "ejs");

// Endpoints
app.get("/", function(req, res) {
  res.render("index", pageInfo.index);
});
app.get("/galleryList", function(req, res) {
  res.render("galleryList", pageInfo.gallery);
});

app.get("/gallery/:id", function(req, res) {
  app.locals.photoid = req.params.id;
  res.render("galleryID", pageInfo.photo);
});

// CSS Styling from root public directory
app.use(express.static(path.join(__dirname, "public")));

//error page setup//
app.use(function(req, res, next) {
  res.status(404);
  res.send("404: File Not Found");
});

//local:host:3000//
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
