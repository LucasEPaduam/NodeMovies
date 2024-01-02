const client = require('../../config/dbConnection');
const {ObjectId} = require('mongodb')

module.exports = class MoviesModel {

    static async getMovies() {
        console.log(`[getallmovies]`);
        const cursor = await client.db("dsw").collection("movies").find();
        const movies = await cursor.toArray();
        return movies;
    }

    static async getSpecificMovie(movieId) {
        movieId = new ObjectId(movieId);
        const movie = await client.db("dsw").collection("movies").findOne({_id: movieId});        
        return movie;
    }

    static async getSpecificMovieByName(movieName) {
        const movie = await client.db("dsw").collection("movies").findOne({ name: movieName });
        return movie;
    }

    static async addMovie(data) {
        console.log(`[Movie Model - Add Movie] ${data}`);
        try {
            const newMovie = { name: data.name, director: data.director, link: data.link,
                createdAt: new Date()
            }
            const addedMovie = await client.db("dsw").collection("movies").insertOne(newMovie);
            console.log(`New movie inserted with the following id ${addedMovie.insertedId}`);
            return addedMovie;
        } catch (error) {
            console.log(`[movieService] Model Error: ${error}`);
        } 
    }

    static async updateMovie(movieId, data) {
        console.log(`[Movie Model - updateMovie] ${data}`);
        try {            
            movieId = new ObjectId(movieId);
            const updatedMovie = await client.db("dsw").collection("movies").updateOne({_id: movieId}, {$set:data});
            console.log(`New movie inserted with the following id ${updatedMovie.acknowledged}`);
            return updatedMovie;
        } catch (error) {
            console.log(`[movieService] Model Error: ${error}`);
        } 
    }

    static async deleteMovie(movieId) {
        console.log(`[Movie Model - delete] ${movieId}`);
        movieId = new ObjectId(movieId);
        try {
            const deletedMovie = await client.db("dsw").collection("movies").deleteOne({_id: movieId}, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
              });
            console.log(`Deleted from DB id ${movieId}`);
            return deletedMovie;
        } catch (error) {
            console.log(`[movieService] Model Error: ${error}`);
        } 
    }

    static async getMoviesLancadosAposData(date) {
        const movies = await client.db("dsw").collection("movies").find({ createdAt: { $gt: new Date(date) } }).toArray();
        return movies;
    }

    static async searchMoviesByString(searchString) {
        const movies = await client.db("dsw").collection("movies").find({
            $or: [
                { name: { $regex: searchString, $options: 'i' } },
                { director: { $regex: searchString, $options: 'i' } },
                { link: { $regex: searchString, $options: 'i' } },               
            ]
        }).toArray();
        return movies;
    }

}

