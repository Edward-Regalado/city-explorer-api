let cache = require('./modules/weatherCache.js');

const superagent = require('superagent');


function WeatherForecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

const weather = (req, res) => {
  const key = 'weather-' + req.query.lat + req.query.lon;
  if (cache[key] && (Date.now() - cache[key][0]) < (50000)) {
    console.log('cache hit');
    let previousResponeData = cache[key][1];
    res.status(200).send(previousResponeData);
  } else {
    console.log('cache miss');
    superagent
      .get('https://api.weatherbit.io/v2.0/forecast/daily')
      .query({
        key: process.env.WEATHERBIT_API_KEY,
        unit: 'I',
        lat: req.query.lat,
        lon: req.query.lon
      })
      .then(weatherData => {
        cache[key] = [Date.now(), weatherData.body.data.map(day => (new WeatherForecast(day)))];
        res.status(200).send(weatherData.body.data.map(day => (new WeatherForecast(day))));
        console.log(res);
      })
      .catch(err => res.status(500).send(err.req, err.res));
  }
};

module.exports = weather;






