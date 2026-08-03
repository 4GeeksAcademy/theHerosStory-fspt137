import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const DashboardShelter = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
       
        localStorage.removeItem("shelterToken");
        navigate("/login-user");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1 className="text-success">Dashboard Privado del Refugio</h1>
                <p className="lead">¡Bienvenido! Has entrado a la zona segura y privada de los refugios.</p>
                <hr />
                <p>Aquí es donde irán todas las herramientas de gestión del refugio (crear quests, ver solicitudes, etc.).</p>
                
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