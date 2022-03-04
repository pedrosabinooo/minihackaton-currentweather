let URL = "https://api.openweathermap.org/data/2.5/weather?lat=-23&lon=-45&appid=d914c82f2580398b7b13c199a6c77966&lang=pt_br"
let climateData = {};
// Pedir localização do usuário


// Retornar dados da API
function getClimateData(){
    let promise = axios.get(URL);
    promise.then((response) => { 
        climateData = response.data 
        teste()
        renderClimate()});
    promise.catch(() => { window.location.reload() });
}
getClimateData()
function teste(){console.log(climateData)}

// Criar HTML dinâmico
function renderClimate(){
    let divContent = document.querySelector("main")
    divContent.innerHTML += `
    <div class= 'infosTempo'>
        <div class='imagem'>
            <img src="http://openweathermap.org/img/wn/${climateData.weather[0].icon}@2x.png" alt="">
            <p><strong>${toCelsius(climateData.main.temp)}</strong></p>
        </div>
        <div>
            <p>Humidade: ${climateData.main.humidity}%</p>
            <p>Sensação térmica: ${toCelsius(climateData.main.feels_like)}</p>
        </div>
        <div>
            <p>Temp max: ${toCelsius(climateData.main.temp_max)}</p>
            <p>Temp min: ${toCelsius(climateData.main.temp_min)}</p>
        </div>
         
    </div>
    <div class= 'infosAdicionais'>
        <p class='local'><strong>${climateData.name}, ${climateData.sys.country}</strong></p>
        <p>Temp max: ${climateData.main.temp_max}</p>
        <p>${climateData.weather[0].description}</p>
    </div>
    <div class='gif'>
        <img src='./img/sol.gif'>
    </div>
    
    `
}

function toCelsius(temp){
    return (temp-273).toFixed(0) + "°C";
}

function toLocalTime(time){
    return time+climateData.sys.timezone;
}