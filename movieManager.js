import fs  from 'fs';
import fetch from 'node-fetch';

const MOVIE_DATA_FILE = 'movies.json';

export function readMovieData() {
  try {
    const data = fs.readFileSync(MOVIE_DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading movie data:', err);
    return [];
  }
}

export function writeMovieData(data) {
  try {
    fs.writeFileSync(MOVIE_DATA_FILE, JSON.stringify(data, null, 2));
    console.log('Movie data saved successfully.');
  } catch (err) {
    console.error('Error writing movie data:', err);
  }
}

export function displayMovieCatalog() {
  const movies = readMovieData();
  console.log('=== Movie Catalog ===');
  movies.forEach((movie) => {
    console.log(`Title: ${movie.title}`);
    console.log(`Director: ${movie.director}`);
    console.log(`Release Year: ${movie.releaseYear}`);
    console.log(`Genre: ${movie.genre}`);
    console.log('---------------------');
  });
}

export function addMovie(title, director, releaseYear, genre) {
  const movies = readMovieData();
  const newMovie = { title, director, releaseYear, genre };
  movies.push(newMovie);
  writeMovieData(movies);
}

export function updateMovie(title) {
  const movies = readMovieData();
  const movieToUpdate = movies.find((movie) => movie.title === title);

  if (!movieToUpdate) {
    console.log(`Movie with title "${title}" not found.`);
    return;
  }

  console.log('Enter the updated movie details:');
  rl.question('Director: ', (director) => {
    rl.question('Release Year: ', (releaseYear) => {
      rl.question('Genre: ', (genre) => {
        movieToUpdate.director = director;
        movieToUpdate.releaseYear = releaseYear;
        movieToUpdate.genre = genre;
        writeMovieData(movies);
        console.log(`Movie "${title}" details updated successfully.`);
      });
    });
  });
}

export function deleteMovie(title) {
  const movies = readMovieData();
  const updatedMovies = movies.filter((movie) => movie.title !== title);

  if (movies.length === updatedMovies.length) {
    console.log(`Movie with title "${title}" not found.`);
    return;
  }

  writeMovieData(updatedMovies);
  console.log(`Movie "${title}" deleted successfully.`);
}

export function searchMovies(query) {
  const movies = readMovieData();
  const searchResults = movies.filter((movie) => {
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseTitle = movie.title.toLowerCase();
    const lowerCaseDirector = movie.director.toLowerCase();
    const lowerCaseGenre = movie.genre.toLowerCase();
    return (
      lowerCaseTitle.includes(lowerCaseQuery) ||
      lowerCaseDirector.includes(lowerCaseQuery) ||
      lowerCaseGenre.includes(lowerCaseQuery)
    );
  });

  console.log(`Search Results for "${query}":`);
  searchResults.forEach((movie) => {
    console.log(`Title: ${movie.title}`);
    console.log(`Director: ${movie.director}`);
    console.log(`Release Year: ${movie.releaseYear}`);
    console.log(`Genre: ${movie.genre}`);
    console.log('---------------------');
  });
}
export function filterMovies(criteria) {
    const movies = readMovieData();
    let filteredMovies;
  
    switch (criteria) {
      case 'genre':
        const genres = [...new Set(movies.map((movie) => movie.genre))];
        rl.question(`Enter the genre to filter by (${genres.join(', ')}): `, (genre) => {
          filteredMovies = movies.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
          displayFilteredMovies(filteredMovies);
        });
        break;
      case 'release year':
        rl.question('Enter the release year to filter by: ', (releaseYear) => {
          filteredMovies = movies.filter((movie) => movie.releaseYear === releaseYear);
          displayFilteredMovies(filteredMovies);
        });
        break;
      default:
        console.log('Invalid filter criteria. Please try again.');
        break;
    }
  }
  
  export function displayFilteredMovies(movies) {
    console.log('=== Filtered Movies ===');
    movies.forEach((movie) => {
      console.log(`Title: ${movie.title}`);
      console.log(`Director: ${movie.director}`);
      console.log(`Release Year: ${movie.releaseYear}`);
      console.log(`Genre: ${movie.genre}`);
      console.log('---------------------');
    });
  }
  
  export function fetchMoviesFromAPI(apiUrl) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const movies = readMovieData();
        const newMovies = data.Search.map((movie) => ({
          title: movie.Title,
          director: movie.Director,
          releaseYear: movie.Year,
          genre: movie.Genre,
        }));
        const updatedMovies = [...movies, ...newMovies];
        writeMovieData(updatedMovies);
        console.log('Movies fetched from the API and added to the catalog successfully.');
      })
      .catch((error) => {
        console.error('Error fetching movies from the API:', error);
      });
  }
  
  
 
