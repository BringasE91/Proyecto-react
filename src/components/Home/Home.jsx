import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Bienvenido a Movie App</h1>
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <p className="lead">
                        Encuentra y guarda tus películas favoritas
                    </p>
                    <div className="mt-4">
                        <Link to="/find-movies" className="btn btn-primary mx-2">
                            Buscar Películas
                        </Link>
                        <Link to="/my-movies" className="btn btn-outline-primary mx-2">
                            Mis Películas
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;