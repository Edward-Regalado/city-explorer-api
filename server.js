'use strict';

// assign methods to variables if you're goign to use more than once
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');

// importing the objects from the weather.json file and assign to varible so we can use it.
const weatherData = require('./data/weather.json');
const { request } = require('express');


const app = express();
app.use(cors());

// PORT set to process.env.PORT in .env or PORT 3001 for default
const PORT = process.env.PORT || 3002;

function WeatherForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function Movies(infor) {
  this.title = infor.title;
  this.overview = infor.overview;
}

// function handleErrors(err, response) {
// response.status(500).send('Internal error');
// }


// app.get('/weather', (request, response) => {
// try {
// const mappedWeatherData = weatherData.data.map(day => new WeatherForecast(day));
// response.send(mappedWeatherData);
// } catch (error) {
// handleErrors(error, response);
// }
// });

app.get('/', (request, response) => {
  response.send('hello');
});

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHERBIT_API_KEY,
      unit: 'I',
      lat: request.query.lat,
      lon: request.query.lon
    })
    .then(weatherData => {
      // console.log(weatherData.body.city_name);
      response.send(weatherData.body.data.map(day => (new WeatherForecast(day))));
    })
    .catch(err => (err.request, err.response));
});


// https://api.themoviedb.org/3/search/movie?api_key=bc8774b1b4d020c62bb62615cad7746c&query=seattle
app.get('/movies', (request, response) => {
  superagent.get('https://api.themoviedb.org/3/search/movie')
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.city,
    })
    .then(movieInfor => {
      response.send(movieInfor.body.results.map(infor => (new Movies(infor))));
    })
    .catch(err => (err.request, err.response));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));







