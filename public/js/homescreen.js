//* ready method removes any potential syncing issues on load
$(document).ready(() => {
  //*API key for openweathermap.org ajax call
  const APIkey = "84e4a73dbe21261105a8b82f64a0523a";

  //*Populates weather forecast to DOM
  function weather() {
    const cityName = "Richmond";
    const queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=" +
      APIkey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then((response) => {
      let forecastDay = "";
      let temp = "";
      let wIcon = "";
      for (let i = 0; i < 4; i++) {
        const day = $(".day-" + [i]);
        if (i === 0) {
          forecastDay = moment(response.list[i].dt_txt);
          temp = Math.floor(response.list[i].main.temp);
          wIcon = response.list[i].weather[0].icon;
        } else {
          j = i * 8;
          forecastDay = moment(response.list[j].dt_txt);
          temp = Math.floor(response.list[j].main.temp);
          wIcon = response.list[j].weather[0].icon;
        }
        day.find(".date").html(forecastDay.format("MMM Do"));
        day
          .find(".weather-icon")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" + wIcon + "@2x.png"
          );
        day.find(".temp").html(temp + "° F");
      }
    });
  }
  weather();

  //* drawMap adds the map to the homescreen view
  function drawMap() {
    const events = [];

    //*Creates the map on the HTML page using hardcoded coordinates for Richmond VA (our developmental stage focus area)
    //?Can we create a search panel that allows user to choose their starting view? Should require an api query that posts new coordinates to the setView
    //?when user searches for their preferred starting view
    const map = L.map("map").setView([37.5407, -77.436], 13);
    const locations = [];

    //*Imports the map tile layer and lays it on the map element
    L.tileLayer(
      "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Utb4r10D6uLj3qIbPQGs",
      {
        attribution:
          '<a href=https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }
    ).addTo(map);

    //* Retrieves event data from SQL and populates the map with markers for each location based on stored coordinates
    //TODO: NEEDS TO BE FUNCTIONIZED
    $.get("/api/events", (data) => {
      for (let i = 0; i < data.length; i++) {
        events.push(data[i]);
        locations.push({
          id: data[i].id,
          latitude: data[i].latitude,
          longitude: data[i].longitude,
        });
      }
    }).then(() => {
      for (let i = 0; i < locations.length; i++) {
        const marker = L.marker([
          locations[i].latitude,
          locations[i].longitude,
        ]).addTo(map);
      }
    });

    //* Retrieves event data and populates the info panel
    //? Refactor suggestion: replace jQuery loop with a handlebars view
    $.get("/api/events", (data) => {
      for (let i = 0; i < data.length; i++) {
        let time = new Date(data[i].eventTime);
        let hour = time.getHours();
        let ampm = "am";
        //Formatting time to AM/PM
        if (hour > 12) {
          hour -= 12;
          ampm = "pm";
        }

        let displayTime =
          time.getMonth() + 1 + "/" + time.getDate() + " at " + hour + ampm;
        //If the time indicated is 12AM - aka no time provided do not display the time
        if (hour === 12 && ampm === "am") {
          displayTime = time.getMonth() + 1 + "/" + time.getDate();
        }
        $("#info-table").append(`
          <tr>
            <td scope="col">${data[i].location}</td>
            <td scope="col">${data[i].address}</td>
            <td scope="col">${displayTime}</td>
            <td scope="col">${data[i].eventDescription}</td>
          </tr>
        `);
      }
    });
  }

  //*"get_started" toggles a drop down menu with all the form elements location, address, ect..
  $("#get_started").on("click", () => {
    $("#myDIV").toggle(500);
  });

  let tempObj = {};
  let coords = {};

  $("#event-button").on("click", (event) => {
    let newEvent = {
      location: $("#location").val(),
      address: $("#address").val(),
      time: $("#time").val(),
      description: $("#description").val(),
      // latitude: coords.latitude,
      // longitude: coords.longitude,
    };
    $.post("/api/newEvent", newEvent);
    // pushEvent();
    location.reload();
  });

  function loadScreen() {}

  //*CODE PUTS BOTH THE PASSWORD AND USERNAME IN LANDING.JS IN AN ARRAY AND/OR COLLECTS THE FORM DATA FROM HOMESCREENnin.html
  // $("#event-button").on("click", (event) => {
  //   event.preventDefault();
  //   tempObj = {
  //     location: $("#location").val(),
  //     address: $("#address").val(),
  //     time: $("#time").val(),
  //     description: $("#description").val(),
  //   };
  //   getCoords();
  //   // pushEvent();
  // });

  //*Checks to see if a map element is present on DOM. If so it calls the drawMap func
  if ($.find("#map").length > 0) {
    drawMap();
  }
  //*End of document.ready
});

// function pushEvent() {
//   //!This goes in the promise
//   let newEvent = {
//     location: tempObj.location,
//     address: tempObj.address,
//     time: tempObj.time,
//     description: tempObj.description,
//     latitude: coords.latitude,
//     longitude: coords.longitude,
//   };
//   console.log(newEvent);
//   $.post("/api/newEvent", newEvent);
//   console.log(newEvent);
// }

// function getCoords(address) {
//   //*Positionstack geocoding code
//   const accessToken = "0a0c85b3c0a2dcab89f4744c3d376bd5";
//   const searchString = address;
//   const queryURL =
//     "http://api.positionstack.com/v1/forward?access_key=" +
//     accessToken +
//     "&query=" +
//     searchString +
//     "&output=json";
//   +$.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then((response) => {
//     const locObj = response.data[0];
//     locations.locations.push({
//       address: locObj.label,
//       latitude: locObj.latitude,
//       longitude: locObj.longitude,
//     });
//     return { latitude: locObj.latitude, longitude: locObj.longitude };
//   });
// }
