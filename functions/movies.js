'use strict';
let cache = require('../modules/moviesCache');

const superagent = require('superagent');

function Movies(infor) {
  this.title = infor.title;
  this.overview = infor.overview;
  this.image_url = `https://image.tmdb.org/t/p/w500/${infor.poster_path}`;
}

const movies = (req, res) => {
  const key = req.query.city;
  if (cache[key] && (Date.now() - cache[key][0]) < (50000)) {
    console.log('cache hit');
    let previousResponeData = cache[key][1];
    res.status(200).send(previousResponeData);
  } else {
    console.log('cache miss');
    superagent
      .get('https://api.themoviedb.org/3/search/movie')
      .query({
        api_key: process.env.MOVIE_API_KEY,
        query: req.query.city,
      })
      .then(movieInfor => {
        res.send(movieInfor.body.results.map(infor => (new Movies(infor))));
      })
      .catch(err => res.status(500).send(err.req, err.res));
  }
};

module.exports = movies;
