import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
    // 1. Añadimos los estados para guardar lo que escribe el usuario
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 2. Enviamos la petición POST al backend
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    username: username, // Enviamos el usuario
                    password: password, // Enviamos la contraseña
                    is_active: true     // Campo típico
                })
            });
            
            if (!resp.ok) throw new Error("Error al crear usuario en el servidor");
            
            // Si todo sale bien, volvemos automáticamente a la lista de usuarios
            navigate("/users"); 
        } catch (error) {
            console.error("Error capturado:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="w-50 mx-auto card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Crear Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    
                    {/* CAMPO: Nombre de Usuario */}
                    <div className="mb-3">
                        <label className="form-label">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                            required 
                            placeholder="Ej. juanito123"
                        />
                    </div>

                    {/* CAMPO: Email */}
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico (Email)</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            placeholder="ejemplo@correo.com"
                        />
                    </div>

                    {/* CAMPO: Contraseña */}
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-success">
                            Guardar Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
