
const app =  require('./config/server');
const routes = require('./app/routes/routes')



routes.getMovies(app);
routes.getSpecificMovie(app);
routes.getSpecificMovieByName(app);
routes.addMovie(app);
routes.updateMovie(app);
routes.deleteMovie(app);
routes.getMoviesLancadosAposData(app);
routes.searchMoviesByString(app);
