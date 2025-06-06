import Searchbar from '../Searchbar/Searchbar';
import MovieCard from '../MovieCard/MovieCard';
import {searchMovies} from '../../services/searchService';
import {useState} from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { client } from '../../services/supabaseClient';

function FindMovies() {
    const { user } = useAuth();
    const [movies, setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [saving, setSaving] = useState(false);
    
    const handleSearch = async (searchTerm) => {
        try {
            const results = await searchMovies(searchTerm);
            setMovies(results);
            setSelectedMovies([]); // Resetear selecciones en nueva búsqueda
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]); 
        }
    };

    const handleCheckboxChange = (movie) => {
        setSelectedMovies(prev => {
            const isSelected = prev.find(m => m.id === movie.id);
            if (isSelected) {
                return prev.filter(m => m.id !== movie.id);
            } else {
                return [...prev, movie];
            }
        });
    };

    const saveSelectedMovies = async () => {
        if (!user) return;
        
        setSaving(true);
        try {
            const { error } = await client
                .from('user_movies')
                .insert(
                    selectedMovies.map(movie => ({
                        user_id: user.id,
                        movie_id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path
                    }))
                );
            
            if (error) throw error;
            
            setSelectedMovies([]); // Limpiar selección después de guardar
            alert('Películas guardadas exitosamente');
        } catch (error) {
            console.error('Error saving movies:', error);
            alert('Error al guardar las películas');
        } finally {
            setSaving(false);
        }
    };

    return ( 
        <div className='container d-flex gap-3 flex-column p-3'>
            <Searchbar onSearch={handleSearch} />

            {user && selectedMovies.length > 0 && (
                <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <span>Películas seleccionadas: {selectedMovies.length}</span>
                    <button 
                        className="btn btn-primary"
                        onClick={saveSelectedMovies}
                        disabled={saving}
                    >
                        {saving ? 'Guardando...' : 'Guardar Selección'}
                    </button>
                </div>
            )}

            <div className='row gx-3 gy-3'>
                {movies
                .filter(movie => movie.poster_path)
                .map((movie) => (
                    <div className='col-6 col-md-4 col-lg-3' key={movie.id}> 
                        <div className="card h-100">
                            <MovieCard movie={movie} />
                            {user && (
                                <div className="card-footer bg-transparent border-top-0">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`movie-${movie.id}`}
                                            checked={selectedMovies.some(m => m.id === movie.id)}
                                            onChange={() => handleCheckboxChange(movie)}
                                        />
                                        <label 
                                            className="form-check-label" 
                                            htmlFor={`movie-${movie.id}`}
                                        >
                                            Agregar a mi lista
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {movies.length === 0 && (
                    <div className="col-12">
                        <p className="text-center">No se encontraron resultados</p>
                    </div>
                )}
            </div> 
        </div>
    );
}

export default FindMovies;