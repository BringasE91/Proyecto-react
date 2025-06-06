import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Mientras verifica la autenticación, puedes mostrar un loading
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si no hay usuario autenticado, redirige a login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si hay usuario, renderiza el contenido protegido
    return children;
}

export default ProtectedRoute;