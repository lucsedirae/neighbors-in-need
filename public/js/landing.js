//const { initialize } = require("passport");

$(document).ready(() => {
  //hide create account fields and go button initially
  function init(){
    $("#hide").toggle(500);
    $("#hide-button").toggle(500);
    $("#hide-go").toggle(500);
  };
  init();

  //if NIN radio is clicked hide the create account feilds
  $("#gridRadios1").click(() => {
    $("#hide-go").toggle(500);
  });

  $("#go-homescreen").click(() => {
    // console.log("Success!");
    window.location.replace("/homescreenNIN");
  });

  //if the CG radio is clicked show the create account fields
  $("#gridRadios2").click(() => {
    $("#hide").toggle(500);
    $("#hide-button").toggle(500);
  });


  // click event to gather form info, for username and password
  // IF YOU UNCOMMENT THIS CODE YOU WILL GET DUPLICATES, THE SAME FUNCTION IS BEING RUN IN HOMESCREEN.JS 
  // Mark 11/30

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var form = $('form').serialize();
  //   console.log(form.split('&'));
  // })
});
