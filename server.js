'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, respone) => {
    const filteredWeatherForcast = weatherData.data.map(day => new WeatherForecast(day));
    respone.send(filteredWeatherForcast);
})

function WeatherForecast(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));







