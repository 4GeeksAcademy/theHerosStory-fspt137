import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserFlowDashboard = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const [mensaje, setMensaje] = useState("");
    const [respuestaIA, setRespuestaIA] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
        navigate("/login-user");
    };

    // Función para enviar la consulta a tu servidor de Flask
    const handleEnviarIA = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRespuestaIA("Tu mentor de IA está analizando tu petición...");

        try {
            const response = await fetch(`${backendUrl}/api/recomendacion`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mensajeUsuario: mensaje })
            });

            const data = await response.json();

            if (data.recomendacion) {
                setRespuestaIA(data.recomendacion);
            } else {
                setRespuestaIA("Error: " + (data.error || "No se pudo obtener la recomendación."));
            }
        } catch (error) {
            console.error("Error conectando con Flask:", error);
            setRespuestaIA("No se pudo conectar con el servidor de Flask. Asegúrate de que esté encendido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            {/* Tarjeta de info del usuario original */}
            <div className="card shadow p-4 mb-4">
                <h1 className="text-success">User's private dashboard</h1>
                <p className="lead">¡Bienvenido! Te has logueado con éxito.</p>
                
                <div className="d-flex gap-2 flex-wrap mb-3">
                    <Link to={`/habits/user/${userId}`}>
                        <button className="btn btn-primary">Habits</button>
                    </Link>
                    <Link to="/user-quests">
                        <button className="btn btn-primary">Quests</button>
                    </Link>
                    <Link to="/user-mentors">
                        <button className="btn btn-primary">Mentors</button>
                    </Link>
                    <Link to="/user-services">
                        <button className="btn btn-primary">Services</button>
                    </Link>
                    <Link to="/user/profile" className="btn btn-primary">
                        My profile
                    </Link>
                </div>

                <button
                    onClick={handleLogout}
                    className="btn btn-danger mt-3 w-25"
                >
                    Log Out
                </button>
            </div>

            <div className="card shadow p-4">
                <h2 className="text-primary mb-3">🧙‍♂️ Mentor Category Recomendation</h2>
                <p className="text-muted">
                    "Do you struggle to stick to your Habits or complete your Quests? Ask the Artificial Intelligence for personalized advice."
                </p>
                
                <form onSubmit={handleEnviarIA}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="E.g., Lately, I've been feeling tired and unmotivated. I'm noticing that I'm not taking care of my routine or my diet."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-success" 
                        disabled={loading}
                    >
                        {loading ? "Thinking..." : "Get Recomendation"}
                    </button>
                </form>

                {respuestaIA && (
                    <div className="card mt-4 bg-light border-start border-primary border-4">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Recomendación para tu camino:</h5>
                            <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
                                {respuestaIA}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
