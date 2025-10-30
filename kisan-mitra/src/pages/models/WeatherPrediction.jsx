import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Required to automatically register all the components

const WeatherPrediction = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (err) => {
                    setError('Location access denied.');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getCurrentWeather(latitude, longitude);
            get10DaysForecast(latitude, longitude);
        }
    }, [latitude, longitude]);

    const getCurrentWeather = (lat, lon) => {
        const options = {
            method: 'POST',
            headers: {
                'x-apihub-key': 'nhHlubaiWz3undhsS8sczkZphZSMk2Lm4z9jM8VyXz05SkqADP',
                'x-apihub-host': 'Weather-API.allthingsdev.co',
                'x-apihub-endpoint': 'f5ba59cd-7870-46b6-8f91-3053fcd66349',
            },
        };

        fetch(`https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast?latitude=${lat}&longitude=${lon}&unit=celsius`, options)
            .then(response => response.json())
            .then(data => {
                const weather = data?.data?.currentConditions;
                if (weather) {
                    setCurrentWeather({
                        temperature: weather.temperature,
                        humidity: weather.humidity,
                        windSpeed: weather.wind,
                        condition: weather.description || 'Clear',
                        feelsLike: weather.feelsLikeTemperature,
                        high: weather.high,
                        low: weather.low,
                        sunrise: weather.sunriseTime?.time,
                        sunset: weather.sunsetTime?.time,
                    });
                } else {
                    setError('Unable to fetch current weather data.');
                }
            })
            .catch(error => {
                console.error('Error fetching current weather:', error);
                setError('Error fetching current weather.');
            });
    };

    const get10DaysForecast = (lat, lon) => {
        const options = {
            method: 'POST',
            headers: {
                'x-apihub-key': 'nhHlubaiWz3undhsS8sczkZphZSMk2Lm4z9jM8VyXz05SkqADP',
                'x-apihub-host': 'Weather-API.allthingsdev.co',
                'x-apihub-endpoint': 'a85e4cad-f8d7-4067-90de-a1f5a3897bb5',
            },
        };

        fetch(`https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast/10daysForecast?latitude=${lat}&longitude=${lon}&unit=celsius`, options)
            .then(response => response.json())
            .then(data => {
                const dailyForecast = data?.data?.forecast?.days || [];
                setForecast(dailyForecast);
            })
            .catch(error => {
                console.error('Error fetching 10-day forecast:', error);
                setError('Error fetching 10-day forecast.');
            });
    };

    // Prepare data for charts
    const prepareChartData = () => {
        const labels = forecast.map(day => day.dayName);
        const temperatures = forecast.map(day => day.high);
        const humidities = forecast.map(day => day.humidity);

        return {
            labels,
            datasets: [
                {
                    label: 'High Temperature (°C)',
                    data: temperatures,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: true,
                },
                {
                    label: 'Humidity (%)',
                    data: humidities,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: true,
                },
            ],
        };
    };

    return (
        <div className="flex flex-col md:flex-row bg-blue-50 p-6 rounded-lg max-w-6xl mx-auto shadow-md text-gray-800 font-sans">
            <div className="md:w-1/2 p-4">
                <h1 className="text-3xl text-blue-600 font-bold mb-4">Current Weather</h1>
                {error ? (
                    <p className="text-red-600 text-lg">{error}</p>
                ) : (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <WiThermometer className="text-3xl text-blue-600 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{currentWeather.temperature}°C</p>
                                <p>Temperature</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <WiHumidity className="text-3xl text-blue-600 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{currentWeather.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <WiStrongWind className="text-3xl text-blue-600 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{currentWeather.windSpeed} m/s</p>
                                <p>Wind Speed</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <WiDaySunny className="text-3xl text-blue-600 mx-auto mb-2" />
                                <p className="text-lg font-semibold">{currentWeather.condition}</p>
                                <p>Condition</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <p className="text-lg font-semibold">{currentWeather.feelsLike}°C</p>
                                <p>Feels Like</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <p className="text-lg font-semibold">{currentWeather.high}°C</p>
                                <p>High</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <p className="text-lg font-semibold">{currentWeather.low}°C</p>
                                <p>Low</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <p className="text-lg">Sunrise: {currentWeather.sunrise}</p>
                                <p>Sunset: {currentWeather.sunset}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="md:w-1/2 p-4">

                <h2 className="text-xl font-semibold mb-2">Temperature and Humidity Trends</h2>
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <Line
                        data={prepareChartData()}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Temperature and Humidity Over 10 Days',
                                },
                            },
                        }}
                    />
                </div>

                <h2 className="text-xl font-semibold mb-2">Detailed Forecast Chart</h2>
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <Bar
                        data={prepareChartData()}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'High Temperature and Humidity Over 10 Days',
                                },
                            },
                        }}
                    />
                </div>
                        <h1 className="text-3xl text-blue-600 font-bold mb-4">10-Day Forecast</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {forecast.map((day, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold">{day.dayName}</h3>
                                    <p>High: {day.high}°C</p>
                                    <p>Low: {day.low}°C</p>
                                    <p>Humidity: {day.humidity}%</p>
                                    <p>Wind: {day.wind}</p>
                                    <p className="mt-2">{day.description}</p>
                                    <p>Sunrise: {day.sunriseTime.time}</p>
                                    <p>Sunset: {day.sunsetTime.time}</p>
                                </div>
                            ))}
                        </div>
            </div>
        </div>
    );
};

export default WeatherPrediction;