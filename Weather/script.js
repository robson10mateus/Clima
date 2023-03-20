const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const weatherEl = document.getElementById('weather');
const body = document.querySelector('body');
const locationBtn = document.getElementById('location-btn');

searchBtn.addEventListener('click', () => {
	const cityName = cityInput.value;
	const apiKey = '30d0972913f949fde4da1b540adf1646';
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=pt_br&units=metric`;

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			locationEl.textContent = `Localização: ${data.name}, ${data.sys.country}`;
			temperatureEl.textContent = `Temperatura: ${data.main.temp}°C`;
			weatherEl.textContent = `Clima atual: ${data.weather[0].description}`;
			const weather = data.weather[0].main.toLowerCase();
			body.classList = '';
			body.classList.add(weather);
		})
		.catch(error => console.log('Error:', error));
});

locationBtn.addEventListener('click', () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const apiKey = '30d0972913f949fde4da1b540adf1646';
			const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`;

			fetch(apiUrl)
				.then(response => response.json())
				.then(data => {
					locationEl.textContent = `Localização: ${data.name}, ${data.sys.country}`;
					temperatureEl.textContent = `Temperatura: ${data.main.temp}°C`;
					weatherEl.textContent = `Clima atual: ${data.weather[0].description}`;
					const weather = data.weather[0].main.toLowerCase();
					body.classList = '';
					body.classList.add(weather);
				})
				.catch(error => console.log('Error:', error));
		});
	} else {
		alert('Geolocation is not supported by this browser.');
	}
});
