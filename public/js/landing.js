$(document).ready(() => {
  //*Listener that handles the login button request routing user to the /login path
  $("#login-button").click(() => {
    console.log("Success!");
    window.location.replace("/login");
  });

  $("#NIN-button").click(() => {
    window.location.replace("/homescreenNIN");
  })

  // click event to gather form info, for username and password
  // IF YOU UNCOMMENT THIS CODE YOU WILL GET DUPLICATES, THE SAME FUNCTION IS BEING RUN IN HOMESCREEN.JS 
  // Mark 11/30

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var form = $('form').serialize();
  //   console.log(form.split('&'));
  // })
});
