// *Requiring path to so we can use relative routes to our HTML files
//Mel 12/1 - is this necessary with handlebars?
const path = require("path");

// *Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

//do we need to pull the data from the db in this file and push to an array of objects postdetails?
//Logic from Wk 13 Act 4 line 36 server.js
//const postdetails = [];

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
        post: postdetails
      });
    }
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("landing");
  });

  // *Here we've add our isAuthenticated middleware to this route.
  // *If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/homescreenCG", isAuthenticated, (req, res) => {
    //res.sendFile(path.join(__dirname, "../public/homescreenCG.html"));
    res.render("homescreenCG", {
      post: postdetails
    });
  });

  //*This route displays the Neighbor In Need view that does not require user authentication
  app.get("/homescreenNIN", (req, res) => {
    //res.sendFile(path.join(__dirname, "../public/homescreenNIN.html"));
    res.render("homescreenNIN", {
      post: postdetails
    });
  });
};
