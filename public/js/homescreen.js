//To remove any potential syncing issues on load
$(document).ready(function(){
    var APIkey = "84e4a73dbe21261105a8b82f64a0523a";

    function weather(){
        const cityName = "Richmond";
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&units=imperial&appid=" + APIkey
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            for(let i =0; i < 4; i++){
                let day = $(".day-"+[i]);
                console.log(response);
                if(i===0){
                    var forecastDay = moment(response.list[i].dt_txt);
                    var temp = Math.floor(response.list[i].main.temp);
                    var wIcon = response.list[i].weather[0].icon;
                }
                else{
                    j = i*8;
                    var forecastDay = moment(response.list[j].dt_txt);
                    var temp = Math.floor(response.list[j].main.temp);
                    var wIcon = response.list[j].weather[0].icon;
                }
                day.find(".date").html(forecastDay.format("MMM Do"))
                day.find(".weather-icon").attr("src", "https://openweathermap.org/img/wn/" + wIcon + "@2x.png");
                day.find(".temp").html(temp+ "° F");
            }
        })
    }
    weather();
})