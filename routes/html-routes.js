// *Requiring path to so we can use relative routes to our HTML files
//? Mel 12/1 - is this necessary with handlebars?
//! JD 12/3 - yes, it is a built-in node method that allows the referencing of relative directory pathing
const path = require("path");
const db = require("../models");

// *Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // *If the user already has an account send them to the members page if not send them to landing/login
    if (req.user) {
      // renders members.handlebars if user has account
      res.render("members"); 
    }
    // res.sendFile(path.join(__dirname, "../public/landing.html"));
    //otherwise renders create login/landing
    res.render("landing");
  });

  app.get("/login", (req, res) => {
    // *If the user already has an account send them to the homescreenCG page, otherwise route to login.html
    if (req.user) {
      //res.redirect("/homescreenCG");
      //postdetails would be an array with the objects with the details included
      res.render("homescreenCG", {
        // post: postdetails
      });

    }
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("landing");
  });

  // *Here we've add our isAuthenticated middleware to this route.
  // *If a user who is not logged in tries to access this route they will be redirected to the signup page
  //! JD - 12/5/20 - Middleware not functioning properly. Termporarily disabled to allow redirect
  // app.get("/homescreenCG", isAuthenticated, (req, res) => {
  app.get("/homescreenCG", (req, res) => {

    //res.sendFile(path.join(__dirname, "../public/homescreenCG.html"));
    // console.log(postdetails);
    res.render("homescreenCG", {
      // post: postdetails
    });
  });

  //*This route displays the Neighbor In Need view that does not require user authentication
  app.get("/homescreenNIN", (req, res) => {
    //res.sendFile(path.join(__dirname, "../public/homescreenNIN.html"));
    res.render("homescreenNIN");
  });

  app.get("/members", (req, res) => {
    res.render("members");
  });

  app.get("/landing", (req, res) => {
    res.render("landing");
  });
};
