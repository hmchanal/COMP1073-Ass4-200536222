const apiKey = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=579108f8c3ac9c199dc0ed94fbae89a4';
const giphyApiKey = 'ZMdtlEoonQ7vMDdlKRkjXM36Yrpqx5lM';

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const weatherGif = document.getElementById('weatherGif');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;

    weatherResult.innerHTML = `<p>${weatherDescription}, ${temperature}°C</p>`;
    
    const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/random?tag=${weatherDescription}&api_key=${giphyApiKey}`);
    const gifData = await gifResponse.json();
    
    const gifUrl = gifData.data.image_original_url;
    weatherGif.src = gifUrl;
  } catch (error) {
    console.error('Error fetching data:', error);
    weatherResult.innerHTML = 'Error fetching weather data.';
    weatherGif.src = '';
  }
}