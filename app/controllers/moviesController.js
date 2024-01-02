const MoviesModel = require("../models/moviesModel");

module.exports = class MoviesController {
   static async getMovies(req, res, next) {
      console.log('[Movies Controller] getMovies');
      try {
         const movies = await MoviesModel.getMovies();
         if (!movies) {
            res.status(404).json(`Não existe filme cadastrado.`);
         }
         movies.forEach(movie => {
            console.log(`[Movie controller: retorno do banco] ${movie.name}`);
         });
         res.status(200).json(movies);
      } catch (error) {
         console.log(`[Movies Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async getSpecificMovie(req, res, next) {
      console.log('[Movies Controller] getMovies');
      try {
         const movieId = req.params.id;
         const movie = await MoviesModel.getSpecificMovie(movieId);
         if (!movie) {
            res.status(404).json(`Não existe filme cadastrado.`);
         }else{

         res.status(200).json(movie);
         }
       
      } catch (error) {
         console.log(`[Movies Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async getSpecificMovieByName(req, res, next) {
      console.log('[Movies Controller] getSpecificMovieByName');
      try {
         const movieName = req.params.name;
         const movie = await MoviesModel.getSpecificMovieByName(movieName);
         if (!movie) {
            res.status(404).json(`Não existe filme cadastrado.`);
         } else {
            res.status(200).json(movie);
         }
      } catch (error) {
         console.log(`[Movies Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async addMovie(req, res, next) {
      console.log('[Add Movie Controller]', req.body);
      try {
         const addedMovie = await MoviesModel.addMovie(req.body);
         res.status(200).json(addedMovie);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async updateMovie(req, res, next) {      
      try {
         const movieId = req.params.id;
         console.log('[Update Movie Controller Param ID]', req.params.id);
         const updatedMovie = await MoviesModel.updateMovie(movieId, req.body);
         res.status(200).json(updatedMovie);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async deleteMovie(req, res, next) {
      console.log('[Movies Controller] deleteMovies');
      try {
         const movieId = req.params.id;
         const deletedMovie = await MoviesModel.deleteMovie(movieId);
         if (!deletedMovie) {
            res.status(404).json(`Não deletado.`);
         }else{

         res.status(200).json(deletedMovie);
         }
       
      } catch (error) {
         console.log(`[Movies Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async getMoviesLancadosAposData(req, res, next) {
      try {
          const date = req.params.date;
          const movies = await MoviesModel.getMoviesLancadosAposData(date);
          if (!movies || movies.length === 0) {
              res.status(404).json(`Não há lançamentos após a data informada.`);
          } else {
              res.status(200).json(movies);
          }
      } catch (error) {
          console.log(`[Movies Controller Error] ${error}`);
          res.status(500).json({ error: error });
      }
  }

  static async searchMoviesByString(req, res, next) {
   try {
       const searchString = req.params.query;
       const movies = await MoviesModel.searchMoviesByString(searchString);
       if (!movies || movies.length === 0) {
           res.status(404).json(`Não foram localizados itens com: ${searchString}`);
       } else {
           res.status(200).json(movies);
       }
   } catch (error) {
       console.log(`[Movies Controller Error] ${error}`);
       res.status(500).json({ error: error });
   }
}


}

