'use strict';

// assign methods to variables if you're goign to use more than onnce
// bring in all the required methods for a server
const express = require('express');
const cors = require('cors');
const app = express();

// require 'dotenv for the environment file
// calling the cors(), because it's required for our server
require('dotenv').config();
app.use(cors());

// refactored movies and weather and importing from folder
const movies = require('./functions/movies');
const weather = require('./functions/weather');

// PORT set to process.env.PORT in .env or PORT 3001 for default
const PORT = process.env.PORT || 3002;

// refactored
app.get('/weather', weather);
app.get('/movies', movies);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


// importing the objects from the weather.json file and assign to
// varible so we can use it.
// const weatherData = require('./data/weather.json');
// const { request } = require('express');

// function Movies(infor) {
// this.title = infor.title;
// this.overview = infor.overview;
// }
//
// app.get('/', (req, res) => {
// res.send('backend server is listening');
// });

// app.get('/weather', (request, response) => {
// console.log('backend is listening');
// superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
// .query({
// key: process.env.WEATHERBIT_API_KEY,
// unit: 'I',
// lat: request.query.lat,
// lon: request.query.lon
// })
// .then(weatherData => {
// response.send(weatherData.body.data.map(day => (new WeatherForecast
// (day))));
// console.log(response);
// })
// .catch(err => (err.request, err.response));
// });


// https://api.themoviedb.org/3/search/movie?
// api_key=bc8774b1b4d020c62bb62615cad7746c&query=seattle
// app.get('/movies', (request, response) => {
// superagent.get('https://api.themoviedb.org/3/search/movie')
// .query({
// api_key: process.env.MOVIE_API_KEY,
// query: request.query.city,
// })
// .then(movieInfor => {
// response.send(movieInfor.body.results.map(infor => (new Movies
// (infor))));
// })
// .catch(err => (err.request, err.response));
// });