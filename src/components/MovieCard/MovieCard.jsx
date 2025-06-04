import './MovieCard.css';

function MovieCard({ movie }) {

    if (!movie.poster_path){
        return null;
    }
    
    return (
        <div className="card card-size">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top"
            />
            <div className="card-body">
                <h2 className='card-title text-truncate h5'>
                    {movie.title}
                </h2>
    
                <p className='text-truncate'>
                    Fecha de estreno: {movie.release_date}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;