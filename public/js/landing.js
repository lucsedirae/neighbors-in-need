const { initialize } = require("passport");

$(document).ready(() => {
  //*Listener that handles the login button request routing user to the /login path
  $("#login-button").click(() => {
    console.log("Success!");
    window.location.replace("/login");
  });

  $("#NIN-button").click(() => {
    window.location.replace("/homescreenNIN");
  });

  let NINchecked = false;
  let CGchecked = false;

  //if NIN radio is clicked hide the create account feilds
  $("#gridRadios1").click(() => {
    $("#hide").css({ opacity: 0 });
    $("#hide-go").css({ opacity: 1});
  });

  $("#go-homesreen").click(() => {
    // console.log("Success!");
    window.location.replace("/homescreenNIN");
  });

  //if the CG radio is clicked show the create account fields
  $("#gridRadios2").click(() => {
    $("#hide").css({ opacity: 1 });
    $("#hide-go").css({ opacity: 0})
  });

  init();
  //hide create account fields and go button initially
  function init(){
    $("#hide").css({ opacity: 0 });
    $("#hide-go").css({ opacity: 0})
  };

  // click event to gather form info, for username and password
  // IF YOU UNCOMMENT THIS CODE YOU WILL GET DUPLICATES, THE SAME FUNCTION IS BEING RUN IN HOMESCREEN.JS 
  // Mark 11/30

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var form = $('form').serialize();
  //   console.log(form.split('&'));
  // })
});
