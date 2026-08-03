import React, { useState, useContext } from "react";
// import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LoginUser = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await actions.login(email, password);
        
        if (success) {
            navigate("/dashboard-shelter"); 
        } else {
            alert("Error al iniciar sesión. Comprueba tus datos.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión (Refugio)</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
};