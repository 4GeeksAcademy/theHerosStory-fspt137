import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditUser = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // Necesaria para el PUT del backend
    const [loading, setLoading] = useState(true);

    // 1. Cargar datos con la URL correcta (/api/users/id)
    useEffect(() => {
        const getUserData = async () => {
            try {
                const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);
                if (!resp.ok) throw new Error("No se pudo obtener el usuario");
                const data = await resp.json();
                
                setEmail(data.email || "");
                setUsername(data.username || "");
                setPassword(data.password || ""); // Guardamos la contraseña actual
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar usuario:", error);
                setLoading(false);
            }
        };
        getUserData();
    }, [id]);

    // 2. Guardar cambios con PUT y la URL correcta (/api/users/id)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
                method: "PUT", // El backend exige PUT obligatoriamente
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password // Se envía 
                })
            });
            if (!resp.ok) throw new Error("Error al actualizar el usuario");
            
            navigate("/users"); 
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="w-50 mx-auto card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Editar Usuario #{id}</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico (Email)</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-warning">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
