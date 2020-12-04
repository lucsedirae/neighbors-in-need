//const { initialize } = require("passport");

$(document).ready(() => {
  //hide create account fields and go button initially
  function init(){
    $("#hide").hide();
    $("#hide-button").hide();
    $("#hide-go").hide();
  };
  init();

  //if NIN radio is clicked hide the create account feilds
  $("#gridRadios1").click(() => {
    $("#hide-go").show();
    $("#hide").hide();
    $("#hide-button").hide();
  });

  $("#go-homescreen").click(() => {
    // console.log("Success!");
    window.location.replace("/homescreenNIN");
  });

  //if the CG radio is clicked show the create account fields
  $("#gridRadios2").click(() => {
    $("#hide").show();
    $("#hide-button").show();
    $("#hide-go").hide();
  });

  $("#signup-button").click(() => {
    const newUser = {
      email: $("#new-email").val().trim(),
      password: $("#inputPassword3").val().trim()
    };
    console.log(newUser);

    $.ajax({
      url: "/api/signup",
      data: newUser,
      type: "POST",
      success: () => {
        console.log("success");
      }
    });
  });
  // click event to gather form info, for username and password
  // IF YOU UNCOMMENT THIS CODE YOU WILL GET DUPLICATES, THE SAME FUNCTION IS BEING RUN IN HOMESCREEN.JS 
  // Mark 11/30

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var form = $('form').serialize();
  //   console.log(form.split('&'));
});
