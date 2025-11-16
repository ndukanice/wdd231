// Set current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Weather API Configuration
const API_KEY = '86bc8c66c3a23c82933e00f6af832a23';
const CITY = 'Ngbo';
const COUNTRY = 'NG'; // Nigeria country code
const LAT = '6.467'; // Exact latitude for Ngbo
const LON = '7.950'; // Exact longitude for Ngbo

// Fetch Current Weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        document.getElementById('currentWeather').innerHTML = '<p>Unable to load weather data</p>';
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    
    const weatherHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="weather-info">
                <p class="temperature">${temp}°C</p>
                <p class="description">${description}</p>
                <p class="humidity">Humidity: ${humidity}%</p>
            </div>
        </div>
    `;
    
    document.getElementById('currentWeather').innerHTML = weatherHTML;
}

// Fetch 3-Day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        document.getElementById('forecast').innerHTML = '<p>Unable to load forecast data</p>';
    }
}

// Display 3-Day Forecast
function displayForecast(data) {
    // Get forecast for next 3 days at noon
    const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    
    const forecastHTML = forecastData.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        
        return `
            <div class="forecast-day">
                <p class="day-name">${dayName}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day.weather[0].description}">
                <p class="day-temp">${temp}°C</p>
            </div>
        `;
    }).join('');
    
    document.getElementById('forecast').innerHTML = `<div class="forecast-grid">${forecastHTML}</div>`;
}

// Fetch and Display Random Spotlights
async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const members = await response.json();
        
        // Filter for Gold (3) and Silver (2) members only
        const qualifiedMembers = members.filter(member => 
            member.membershipLevel === 2 || member.membershipLevel === 3
        );
        
        // Randomly select 2-3 members
        const numSpotlights = Math.random() < 0.5 ? 2 : 3;
        const selectedMembers = getRandomMembers(qualifiedMembers, numSpotlights);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error fetching spotlights:', error);
        document.getElementById('spotlightContainer').innerHTML = '<p>Unable to load member spotlights</p>';
    }
}

// Get Random Members
function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Display Spotlights
function displaySpotlights(members) {
    const spotlightHTML = members.map(member => {
        const membershipText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
        const membershipClass = member.membershipLevel === 3 ? 'gold' : 'silver';
        
        return `
            <div class="spotlight-card">
                <img src="images/${member.icon}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <span class="membership-badge ${membershipClass}">${membershipText}</span>
                <p class="company-info">📞 ${member.phone}</p>
                <p class="company-info">📍 ${member.address}</p>
                <p class="company-info">🌐 <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            </div>
        `;
    }).join('');
    
    document.getElementById('spotlightContainer').innerHTML = spotlightHTML;
}

// Initialize all functions
console.log('Initializing home page...');
fetchCurrentWeather();
fetchForecast();
fetchSpotlights();
