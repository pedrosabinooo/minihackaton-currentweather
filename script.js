let URL = {
    beg: "https://api.openweathermap.org/data/2.5/weather?lat=",
    mid: "&lon=",
    end: "&appid=d914c82f2580398b7b13c199a6c77966&lang="
};

let climateData = {};
let latitude;
let longitude;
let urlAxios;
// Pedir localização do usuário
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        urlAxios = URL.beg+latitude.toFixed(0)+URL.mid+longitude.toFixed(0)+URL.end+navigator.language.replace("-","_").toLowerCase();
        getClimateData();
      });
} else {
    let location = prompt("Desculpe-me! O seu navegador não suporta a geolocalização. Coloque a sua latitude e longitude separados por ';'.").split(';');
    latitude = parseInt(location[0]).toFixed(0);
    longitude = parseInt(location[1]).toFixed(0);
    urlAxios = URL.beg+latitude+URL.mid+longitude+URL.end+navigator.language.replace("-","_").toLowerCase();
    getClimateData();
}

// Retornar dados da API
function getClimateData(){
    let promise = axios.get(`${urlAxios}`);
    promise.then((response) => { 
        climateData = response.data 
        renderClimate()});
    promise.catch(() => {  });
}

// Criar HTML dinâmico
function renderClimate(){
    let divContent = document.querySelector("main")
    
    divContent.innerHTML += `
    <div>
        <img src="http://openweathermap.org/img/wn/${climateData.weather[0].icon}@2x.png" alt="">
        <p><strong>${toCelsius(climateData.main.temp)}</strong></p>
        <p>Humidade: ${climateData.main.humidity}%</p>
        <p>Sensação térmica: ${toCelsius(climateData.main.feels_like)}</p>
        <p>Temp max: ${toCelsius(climateData.main.temp_max)}</p>
        <p>Temp min: ${toCelsius(climateData.main.temp_min)}</p>
    </div>
    <div>
        <p><strong>${climateData.name}, ${climateData.sys.country}</strong></p>
        <p>${getTime(climateData.dt)}</p>
        <p>${climateData.weather[0].description.toProperCase()}</p>
    </div>
    `
}

function toCelsius(temp){
    return (temp-273).toFixed(0) + "°C";
}

function getTime(timestamp){
    date = new Date(timestamp * 1000),
    datevalues = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
    return `${datevalues[2]}/${datevalues[1]}/${datevalues[0]} ${datevalues[3]}:${datevalues[4]}`;
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};