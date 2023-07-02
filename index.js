/* const API_KEY = "750d8443a227b5e847d2c1e53af23b9d"

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data)
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key]
    })

    cleanUp()
}

const cleanUp = () => {
    let container = document.getElementById(`container`)
    let loader = document.getElementById(`loader`)

    loader.style.display = `none`
    container.style.display = `flex`
}

const getDate = () => {
    let date = new Date()
    return `${("0" + date.getDate())}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
} */

const result = document.querySelector(".result")
const form = document.querySelector(".getWeather")
const nameCity = document.querySelector("#city")



form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (nameCity.value === "") {
        showError("Ambos campos son obligatorios")
        return
    }

    callApi(nameCity.value)
})

function callApi(city) {
    const API_KEY = "750d8443a227b5e847d2c1e53af23b9d"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${API_KEY}`

    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(dataJSON => {
            if (dataJSON.cod === "404") {
                showError(`Ciudad no encontrada`)
            } else {
                clearHTML()
                showWeather(dataJSON)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

function showWeather(data) {
    const { name, main: { temp, temp_min, temp_max, humidity, pressure }, weather: [arr] } = data

    const degrees = kelvinToCentigrade(temp)
    const min = kelvinToCentigrade(temp_min)
    const max = kelvinToCentigrade(temp_max)

    const content = document.createElement(`div`)
    content.innerHTML = `
                        <h5>Clima en ${name}</h5>
                        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" class="icono" alt="Icono">
                        <h2>${degrees}°C</h2>
                        <p>Min: ${min}°C</p>
                        <p>Max: ${max}°C</p>
                        <p>Humedad: ${humidity}%</p>
                        <p>Presión: ${pressure}hPA</p>
                        `;

    result.appendChild(content)
}

function showError(message) {
    console.log(message)
    const alert = document.createElement(`p`)
    alert.classList.add(`alertMessage`)
    alert.innerHTML = message

    form.appendChild(alert)
    setTimeout(() => {
        alert.remove()
    }, 2000)
}

function kelvinToCentigrade(temp){
    return parseInt (temp - 273.15)
}

function clearHTML(){
    result.innerHTML = ""
}
