// *Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// *Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // *If the user already has an account send them to the members page if not send them to landing/login
    if (req.user) {
      res.redirect("/members.html");
    }
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  app.get("/login", (req, res) => {
    // *If the user already has an account send them to the homescreenCG page, otherwise route to login.html 
    if (req.user) {
      res.redirect("/homescreenCG");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // *Here we've add our isAuthenticated middleware to this route.
  // *If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/homescreenCG", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  //*This route displays the Neighbor In Need view that does not require user authentication
  app.get("/homescreenNIN", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/homescreenNIN.html"));
  });
};
