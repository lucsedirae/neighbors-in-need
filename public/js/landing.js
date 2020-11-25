$(document).ready(() => {
  //*Listener that handles the login button request routing user to the /login path
  $("#login-button").click(() => {
    console.log("Success!");
    window.location.replace("/login");
  });

  $("#NIN-button").click(() => {
    window.location.replace("/homescreenNIN");
  })
});
