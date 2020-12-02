$(document).ready(() => {
  // *Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // *When the form is submitted, we validate there's an email and password entered
  landing.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      return;
    }

    // *If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // *loginUser does a post to our "api/landing" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/landing", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/homescreenCG");
        // *If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
  //*Listener that handles the login button request routing user to the /login path
  $("#login-button").click(() => {
    console.log("Success!");
    window.location.replace("/login");
  });

  $("#NIN-button").click(() => {
    window.location.replace("/homescreenNIN");
  })
});
