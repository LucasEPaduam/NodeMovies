const Movies = require("../controllers/moviesController");

module.exports = {
  getMovies: (app) => {
    app.get('/api/filmes', Movies.getMovies);
  },
  getSpecificMovie: (app) => {
    app.get('/api/filmes/:id', Movies.getSpecificMovie);
  },
  getSpecificMovieByName: (app) => {
    app.get('/api/filmes/name/:name', Movies.getSpecificMovieByName);
  },
  addMovie:(app) => {
    app.post('/api/filmes', Movies.addMovie);
  },
  updateMovie:(app) => {
    app.put('/api/filmes/:id', Movies.updateMovie);
  },
  deleteMovie:(app) => {
    app.delete('/api/filmes/:id', Movies.deleteMovie);
  },
  getMoviesLancadosAposData: (app) => {
    app.get('/api/filmes/lancados/:date', Movies.getMoviesLancadosAposData);
  },
  searchMoviesByString: (app) => {
    app.get('/api/filmes/busca/:query', Movies.searchMoviesByString);
}

}


