$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signup-button");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/homescreenCG");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => {
        console.log(err);
      // .catch(handleLoginErr);
  });

  // function handleLoginErr(err) {
  //   $("#alert .msg").text(err.responseJSON);
  //   $("#alert").fadeIn(500);
  // }
}});

  // $("#signup-button").click(() => {
  //   const newUser = {
  //     email: $("#new-email").val().trim(),
  //     password: $("#inputPassword3").val().trim()
  //   };
  //   console.log(newUser);

  //   $.ajax({
  //     url: "/api/signup",
  //     data: newUser,
  //     type: "POST",
  //     success: () => {
  //       console.log("success");
  //       //this doesnt seem to work
  //       window.location.replace("/homescreenCG");
  //     }
  //   });
  // });