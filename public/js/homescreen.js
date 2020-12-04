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
    $.get("/api/events", data => {
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
          locations[i].longitude
        ]).addTo(map);
      }
    });

    //* Retrieves event data and populates the info panel
    //? Refactor suggestion: replace jQuery loop with a handlebars view
    $.get("/api/events", data => {
      for (let i = 0; i < data.length; i++) {
        $("#info-table").append(`
          <tr>
            <td scope="col">${data[i].location}</td>
            <td scope="col">${data[i].address}</td>
            <td scope="col">${data[i].eventTime}</td>
            <td scope="col">${data[i].eventDescription}</td>
          </tr>
        `);
      }
    });

    const postdetails = [];
    //Get request to populate tables through handlebars
    $.get("/api/events", data => {
      for (let i = 0; i < data.length; i++) {
        postdetails.push({
          location: data[i].location,
          address: data[i].address,
          eventTime: data[i].eventTime,
          eventDescription: data[i].eventDescription
        });
      }
    })

    //*Positionstack geocoding code
    //! JD 12/2 - Currently commented out until form submission validation is connected
    // const accessToken = "0a0c85b3c0a2dcab89f4744c3d376bd5";
    // //! searchString needs to be redefined as the address coming out of SQL
    // const searchString = "6610 Fernwood St Henrico, VA 23228";
    // const queryURL =
    //   "http://api.positionstack.com/v1/forward?access_key=" +
    //   accessToken +
    //   "&query=" +
    //   searchString +
    //   "&output=json";+

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(response => {
    //   const locObj = response.data[0];
    //   locations.locations.push({
    //     address: locObj.label,
    //     latitude: locObj.latitude,
    //     longitude: locObj.longitude,
    //   });
    // });
  }

  //*"get_started" toggles a drop down menu with all the form elements location, address, ect..
  $("#get_started").on("click", () => {
    $("#myDIV").toggle(500);
  });

  //*CODE PUTS BOTH THE PASSWORD AND USERNAME IN LANDING.JS IN AN ARRAY AND/OR COLLECTS THE FORM DATA FROM HOMESCREENnin.html
  //!MARK 11/30
  $("form").submit((event) => {
    event.preventDefault();
    const form = $("form").serialize();
  });

  drawMap();


});
