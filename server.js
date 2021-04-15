'use strict';

// assign methods to variables if you're goign to use more than once
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// importing the objects from the weather.json file and assign to varible so we can use it.
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

// PORT set to process.env.PORT in .env or PORT 3001 for default
const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  try {
    const mappedWeatherData = weatherData.data.map(day => new WeatherForecast(day));
    response.json(mappedWeatherData);
  } catch (error) {
    handleErrors(error, response);
  }
})

function WeatherForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleErrors(err, response) {
  response.status(500).send('Internal error');
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));







