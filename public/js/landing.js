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

  $(".navbar-img").click(() => {
    // console.log("Success!");
    window.location.replace("/landing");
  });

  //if the CG radio is clicked show the create account fields
  $("#gridRadios2").click(() => {
    $("#hide").show();
    $("#hide-button").show();
    $("#hide-go").hide();
  });
//* End document.ready
});
