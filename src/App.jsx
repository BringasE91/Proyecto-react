import './App.css';
import Header from './components/Header/Header';
import Searchbar from './components/Searchbar/Searchbar';
import MovieCard from './components/MovieCard/MovieCard';
import {searchMovies} from './services/searchService';
import { useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);

  const handleSearch = async  (searchTerm) => {
    try {
      const results = await searchMovies(searchTerm);
      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); 
    }
  
  }
  return (
    <div className="App">
      <Header/>
      <div className='container d-flex gap-3 flex-column p-3'>
        <Searchbar 
        onSearch={handleSearch} />
        <div className='row gx-3 gy-3'>
          {movies
          .filter(movie => movie.poster_path)
          .map((movie) => (
            <div className='col-6 col-md-4 col-lg-3' key={movie.id}> 
              <MovieCard 
              movie={movie} />  
            </div>
          ))}
          {movies.length === 0 && <li>No results found</li>}
        </div>
      </div>
      
    </div>
  );
}

export default App;
