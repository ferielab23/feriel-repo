console.log('javascript connected!');

const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
});

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
});

async function fetchWeather() {
    try {
        const apiKey = process.env.OPEN_WEATHER_API_KEY; 
        const city = "New York";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Fetch request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        displayWeather(data);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

fetchWeather();

function displayWeather(weatherData) {
    const temperature = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;

    const weatherIconElement = document.getElementById('weather-icon');
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

    const weatherTempElement = document.getElementById('weather-temp');
    weatherTempElement.textContent = `${temperature}Â°F`;

    const weatherDescriptionElement = document.getElementById('weather-description');
    weatherDescriptionElement.textContent = weatherDescription;
}
