import Searchbar from '../Searchbar/Searchbar';
import MovieCard from '../MovieCard/MovieCard';
import {searchMovies} from '../../services/searchService';
import {useState} from 'react'; 



function FindMovies() {

    const [movies, setMovies] = useState([]);
    
    const handleSearch = async (searchTerm) => {
    try {
      const results = await searchMovies(searchTerm);
      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); 
    }
    };

    return ( 

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
    );
}

export default FindMovies;