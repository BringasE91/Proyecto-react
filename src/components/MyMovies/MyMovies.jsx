import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { client } from '../../services/supabaseClient';
import MovieCard from '../MovieCard/MovieCard';
import { Link } from 'react-router-dom';

function MyMovies() {
    const { user } = useAuth();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserMovies = async () => {
            try {
                const { data, error } = await client
                    .from('user_movies')
                    .select('*')
                    .eq('user_id', user.id);

                if (error) throw error;
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Error al cargar tus películas');
            } finally {
                setLoading(false);
            }
        };

        fetchUserMovies();
    }, [user.id]);

    const handleDeleteMovie = async (movieId) => {
        if (!confirm('¿Estás seguro de eliminar esta película?')) return;

        try {
            const { error } = await client
                .from('user_movies')
                .delete()
                .match({ user_id: user.id, movie_id: movieId });

            if (error) throw error;

            // Actualizar la lista local
            setMovies(movies.filter(movie => movie.movie_id !== movieId));
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Error al eliminar la película');
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Mis Películas</h2>
            
            {movies.length === 0 ? (
                <div className="alert alert-info">
                    No tienes películas guardadas. 
                   <Link to="/find-movies" className="alert-link ms-2">
                       ¡Encuentra algunas!
                    </Link>
                </div>
            ) : (
                <div className="row gx-3 gy-3">
                    {movies.map((movie) => (
                        <div className="col-6 col-md-4 col-lg-3" key={movie.movie_id}>
                            <div className="card h-100">
                                <MovieCard movie={movie} />
                                <div className="card-footer bg-transparent border-top-0">
                                    <button
                                        className="btn btn-danger btn-sm w-100"
                                        onClick={() => handleDeleteMovie(movie.movie_id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyMovies;