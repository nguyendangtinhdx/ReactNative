/*
Send GET / POST api requests to server
*/
const urlGetMovies = 'http://5c80dfef02991c0014ed04bd.mockapi.io/api/movies';
const urlPostMovies = 'http://5c80dfef02991c0014ed04bd.mockapi.io/api/movies';
const urlUpdateMovie = 'http://5c80dfef02991c0014ed04bd.mockapi.io/api/movies';
const urlDeleteMovie = 'http://5c80dfef02991c0014ed04bd.mockapi.io/api/movies';

function* getMoviesFromApi() {
    const response = yield fetch(urlGetMovies, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const movies = yield response.status === 200 ? JSON.parse(response._bodyInit): []       
    return movies;
}

//send POST request to add new Movie
function* insertNewMovieFromApi(newMovie) {
    const response = yield fetch(urlPostMovies, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newMovie.name,
            releaseYear: newMovie.releaseYear,
        }),
    });
    yield console.log(`response = ${JSON.stringify(response)}`); 
    return yield (response.status === 201);//true or false
}
//send PUT request to update existing Movie
function* updateMovieFromApi(updatedMovie) {
    const urlLink = `${urlUpdateMovie}/${updatedMovie.id.toString()}`;    
    const response = yield fetch(urlLink, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: updatedMovie.name,
            releaseYear: updatedMovie.releaseYear,    
        }),
    });    
    return yield (response.status === 200);//true or false
}
//send DELETE request to update existing Movie
function* deleteMovieFromApi(deletedMovieId) {     
    const urlLink = `${urlDeleteMovie}/${deletedMovieId}`;    
    const response = yield fetch(urlLink, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
        }),
    });
    return yield (response.status === 200);//true or false
}
export const Api = {
    getMoviesFromApi,
    insertNewMovieFromApi,
    updateMovieFromApi,
    deleteMovieFromApi
}; 