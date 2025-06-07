import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Columna de navegación */}
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="mb-3">Navegación</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Inicio</Link></li>
                            <li><Link to="/find-movies" className="text-white text-decoration-none">Buscar Películas</Link></li>
                            <li><Link to="/my-movies" className="text-white text-decoration-none">Mis Películas</Link></li>
                        </ul>
                    </div>

                    {/* Columna de contacto */}
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="mb-3">Contacto</h5>
                        <ul className="list-unstyled">
                            <li><a href="mailto:info@movieapp.com" className="text-white text-decoration-none">info@movieapp.com</a></li>
                            <li><span className="text-white">Tel:  456-7890</span></li>
                        </ul>
                    </div>

                    {/* Columna de redes sociales */}
                    <div className="col-md-4">
                        <h5 className="mb-3">Síguenos</h5>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Movie App. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;