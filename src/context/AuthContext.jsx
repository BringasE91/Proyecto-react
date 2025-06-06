import { createContext, useState, useContext, useEffect } from 'react';
import { client } from '../services/supabaseClient';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar sesión actual
        const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        const { error } = await client.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};