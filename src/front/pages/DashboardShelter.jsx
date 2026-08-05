import React from "react";
import { useNavigate } from "react-router-dom";

export const DashboardShelter = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("shelterToken");
        navigate("/login-user");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1 className="text-success">Dashboard Privado del Login</h1>
                <p className="lead">¡Bienvenido! Te has logueado con éxito.</p>
                <hr />
                <p>Aquí es donde irán todas las herramientas del login (crear quests, ver solicitudes, etc.).</p>
                
                <button 
                    onClick={handleLogout}
                    className="btn btn-danger mt-3 w-25"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};