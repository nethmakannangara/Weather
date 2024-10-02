console.log("Project Weather App");

//-------------GET CURRENT DATE------------//
const date = new Date();
console.log(date);  //Clear

const format = {
    weekday: `long`,
    year: `numeric`,
    month: `long`,
    day: `numeric`
};

//----------------------------------------//
let current_date = document.getElementById("date").innerText = date.toLocaleDateString(`en-US`, format);

let main_status_image = document.getElementById("main_status_image");
let api_key = "6a26070bc5a94f398e6133930242909";

let input = document.getElementById("txtsearch");

input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        getCity();
    }
});

getCity = () => {
    let city = document.getElementById("txtsearch").value;
    console.log(city);
    apiCall(city);
    callDailyForecast(city);
}

apiCall = async (city) => {
    var url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=1&aqi=no&alerts=no`;
    await fetch(url).
        then(res => res.json())
        .then(data => {
            console.log(data)
            setWeather(data);
            setHourlyForecast(data);
        }
        );

}

setWeather = async (data) => {
    const city = document.getElementById("city_name");
    const country = document.getElementById("country_name");
    const temperature = document.getElementById("main_temparature");
    const sub_temperature = document.getElementById("sub_main_temparature");
    const feel_like_temperature = document.getElementById("temparature_feel_like");
    const status = document.getElementById("status");

    const sun_rise = document.getElementById("sun_rise_time");
    const sun_set = document.getElementById("sun_set_time");

    const wind_speed = document.getElementById("wind_speed_value");
    const humidity = document.getElementById("humidity_value");
    const cloud_cover = document.getElementById("cloud_cover_value");
    const un_index = document.getElementById("uv_index_value");
    const pressure = document.getElementById("pressure_value");
    const visibility = document.getElementById("visibility_value");

    setStatusImage(data.current.condition.icon, main_status_image);

    city.innerText = data.location.name;
    country.innerText = data.location.country;
    temperature.innerText = parseInt(data.current.temp_c, 10) + " ℃";
    sub_temperature.innerText = parseInt(data.current.temp_c, 10) + " ℃";
    feel_like_temperature.innerText = parseInt(data.current.feelslike_c, 10) + " ℃";
    status.innerText = data.current.condition.text;

    sun_rise.innerText = data.forecast.forecastday[0].astro.sunrise;
    sun_set.innerText = data.forecast.forecastday[0].astro.sunset;

    wind_speed.innerText = parseInt(data.current.wind_kph, 10) + " km/h";
    humidity.innerText = data.current.humidity + "%";
    cloud_cover.innerText = data.current.cloud + "%";
    un_index.innerText = checkUvLevel(data.current.uv);
    pressure.innerText = data.current.pressure_mb + "hPa";
    visibility.innerHTML = data.current.vis_km + " km"
}

checkUvLevel = (uvIndex) => {
    if (uvIndex >= 0 && uvIndex <= 2) {
        return uvIndex + "  (Low)";
    } else if (uvIndex > 2 && uvIndex < 6) {
        return uvIndex + "  (Moderate)";
    } else if (uvIndex >= 6 && uvIndex < 8) {
        return uvIndex + "  (High)";
    } else if (uvIndex >= 8 && uvIndex < 11) {
        return uvIndex + "  (Very High)";
    } else if (uvIndex >= 11) {
        return uvIndex + "  (Extreme)";
    }
}

setStatusImage = (status, image_status) => {
    switch (status) {
        case "Moderate rain at times":
            image_status.src = "img/weather rain and sun.png"
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/176.png":
            image_status.src = "img/weather rain and sun.png";
            break;
        case "Light rain shower":
            image_status.src = "img/ight rain shower.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/116.png":
            image_status.src = "img/Partly cloudy day.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/293.png":
            image_status.src = "img/patchy light rain.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/266.png":
            image_status.src = "img/Light drizzle day.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/122.png":
            image_status.src = "img/overcast-night.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/296.png":
            image_status.src = "img/light-rain day.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/176.png":
            image_status.src = "img/patchy rain nearby night.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/302.png":
            image_status.src = "img/moderate rain day.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/116.png":
            image_status.src = "img/partly_cloudy-night.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/113.png":
            image_status.src = "img/Sunny.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/113.png":
            image_status.src = "img/clear night.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/119.png":
            image_status.src = "img/cloudy-night.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/353.png":
            image_status.src = "img/light rain shower night.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/night/143.png":
            image_status.src = "img/mist.png";
            break;
        case "//cdn.weatherapi.com/weather/64x64/day/122.png":
            image_status.src = "img/overcast day.png";
            break;
        case "":
            image_status.src = "";
            break;
        case "":
            image_status.src = "";
            break;
        case "":
            image_status.src = "";
            break;


    }
}

setHourlyForecast = async (data) => {

    for (let index = 3; index < 24; index++) {
        if (index == 3 || index == 7 || index == 11 || index == 15 || index == 19 || index == 23) {
            var temp_id = `hour[${index}]_temperature`;
            var status_id = `hour[${index}]_status`;
            var status_img = `hour[${index}]_status_image`;

            let temperature = document.getElementById(temp_id);
            let hourlyStatus = document.getElementById(status_id);
            let hourlyStatusImage = document.getElementById(status_img);

            temperature.innerText = parseInt(data.forecast.forecastday[0].hour[index].temp_c, 10) + " ℃";
            hourlyStatus.innerText = data.forecast.forecastday[0].hour[index].condition.text;
            setStatusImage(data.forecast.forecastday[0].hour[index].condition.icon, hourlyStatusImage);

        }
    }

}

// const format = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
// };

// const formatter = new Intl.DateTimeFormat('en-US', format);

// for (let i = 0; i < 7; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);  // Move to the next day
//     console.log(formatter.format(date)); // Format and log the date
// }

callDailyForecast = async (city_name) => {
    const tempUrl = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city_name}&days=7&aqi=no&alerts=no`;

    await fetch(tempUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setDayForecast(data);
        }
        );
}

setDayForecast = async (data) => {
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let index = 1; index < 7; index++) {
        var day_id = `day[${index}]`;
        let daylyForecast_day = document.getElementById(day_id);
        const date = new Date();
        date.setDate(date.getDate() + index)
        daylyForecast_day.innerText = weekDay[date.getDay()];
    }

    for (let i = 0; i < 7; i++) {

        let id_avgHumidity = `day[${i}]_avg_humidity`;
        let id_dayTemp = `day[${i}]_day_temperature`;
        let id_nightTemp = `day[${i}]_night_temperature`;
        let id_dayStatus = `day[${i}]_day_status`;
        let id_nightStatus = `day[${i}]_night_status`;

        const day_avg_humidity = document.getElementById(id_avgHumidity);
        const day_temperature = document.getElementById(id_dayTemp);
        const night_temperature = document.getElementById(id_nightTemp);
        const day_status = document.getElementById(id_dayStatus);
        const night_status = document.getElementById(id_nightStatus);

        day_avg_humidity.innerText = data.forecast.forecastday[i].day.avghumidity + "%";
        day_temperature.innerText = parseInt(data.forecast.forecastday[i].day.maxtemp_c, 10);
        night_temperature.innerText = parseInt(data.forecast.forecastday[i].day.mintemp_c, 10);

        setStatusImage(data.forecast.forecastday[i].hour[8].condition.icon, day_status);
        setStatusImage(data.forecast.forecastday[i].hour[20].condition.icon, night_status)
    }
}

apiCall("Matugama");
callDailyForecast("Matugama");
