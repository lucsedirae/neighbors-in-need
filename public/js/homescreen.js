//To remove any potential syncing issues on load
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
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      let forecastDay = "";
      let temp = "";
      let wIcon = "";
      for (let i = 0; i < 4; i++) {
        const day = $(".day-" + [i]);
        console.log(response);
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
});
