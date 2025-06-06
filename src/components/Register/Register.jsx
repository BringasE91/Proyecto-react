import { useState } from "react";
import { client } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";

function Register(){


    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
        options: { emailRedirectTo: 'https://redesigned-acorn-jj54j444xqg635pw-3000.app.github.dev/find-movies',}
        });

        if (error) {
            console.error("Error al registrar:", error.message);
            alert("Error al registrar: " + error.message);
        }
        else {
            console.log("Registro exitoso:", data);
            alert("Registro exitoso. Por favor, verifica tu correo electrónico.");
            navigate("/login"); // Redirigir a la página de inicio de sesión
            // Aquí podrías redirigir al usuario a otra página o realizar otras acciones
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control"   
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit"  className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Register;
