import readline from "readline";
import { displayMovieCatalog, addMovie, updateMovie, deleteMovie, searchMovies, filterMovies, fetchMoviesFromAPI } from'./movieManager.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function displayMenu() {
    console.log('=== Movie Catalog Menu ===');
    console.log('1. Display Movie Catalog');
    console.log('2. Add New Movie');
    console.log('3. Update Movie Details');
    console.log('4. Delete Movie');
    console.log('5. Search Movies');
    console.log('6. Filter Movies');
    console.log('7. Fetch Movies from API');
    console.log('8. Exit');
  }

  function handleMenuChoice(choice) {
    switch (choice) {
      case '1':
        displayMovieCatalog();
        break;
      case '2':
        rl.question('Title: ', (title) => {
          rl.question('Director: ', (director) => {
            rl.question('Release Year: ', (releaseYear) => {
              rl.question('Genre: ', (genre) => {
                addMovie(title, director, releaseYear, genre);
                displayMenu();
                promptUser();
              });
            });
          });
        });
        break;
      case '3':
        rl.question('Enter the title of the movie to update: ', (title) => {
         updateMovie(title);
          displayMenu();
          promptUser();
        });
        break;
      case '4':
        rl.question('Enter the title of the movie to delete: ', (title) => {
          deleteMovie(title);
          displayMenu();
          promptUser();
        });
        break;
      case '5':
        rl.question('Enter the search query: ', (query) => {
          searchMovies(query);
          displayMenu();
          promptUser();
        });
        break;
      case '6':
        rl.question('Enter the filter criteria (genre or release year): ', (criteria) => {
          filterMovies(criteria);
          displayMenu();
          promptUser();
        });
        break;
      case '7':
        rl.question('Enter the API URL to fetch movies from: ', (apiUrl) => {
          fetchMoviesFromAPI(apiUrl);
          displayMenu();
          promptUser();
        });
        break;
      case '8':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        displayMenu();
        promptUser();
        break;
    }
  }
  
  function promptUser() {
    rl.question('Enter your choice: ', (choice) => {
      handleMenuChoice(choice);
    });
  }
  
  displayMenu();
  promptUser();
