import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Guarda el token que te devuelva tu backend
                localStorage.setItem("user_token", data.access_token);
                localStorage.setItem("user_id", data.user.id); 
                console.log(data)
                navigate("/user-dashboard");
            } else {
                alert("Error al iniciar sesión. Comprueba tus datos.");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Hubo un error al conectar con el servidor.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión (Login)</h2>
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};