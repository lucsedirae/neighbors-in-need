// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// const compression = require("compression");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const exphb = require("express-handlebars");
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use(compression());
// We need to use sessions to keep track of our user's login status
app.use(
  //* Session secret is a randomly generated string to improve security. 
  //? Should be replaced at some point with an autoincrementing variable. Perhaps tied to an autoincrement in the SQL db?
  session({ secret: "L9RQML1kGE", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
app.engine(
  "handlebars",
  exphb({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
