import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserFlowDashboard = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userEmail = localStorage.getItem("user_email");

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
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">

                <aside className="col-md-2 col-lg-2 bg-white min-vh-100 border-end p-0">
                    <div className="p-4 text-white"
                        style={{ backgroundColor: "#ff1949" }}>
                        <h4 className="fw-bold mb-1">
                            The Hero's Story
                        </h4>
                        <small className="text-white">
                            User Dashboard
                        </small>
                    </div>

                    <nav className="d-flex flex-column px-3 py-4 gap-2">

                        <Link
                            to={`/user-dashboard/${userId}`}
                            className="btn text-start"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            to={`/habits/user/${userId}`}
                            className="btn text-start"
                        >
                            ✅ Habits
                        </Link>

                        <Link
                            to="/user-quests"
                            className="btn text-start"
                        >
                            🎯 Quests
                        </Link>

                        <Link
                            to="/user-mentors"
                            className="btn text-start"
                        >
                            👥 Mentors
                        </Link>

                        <Link
                            to="/user-services"
                            className="btn text-start"
                        >
                            🛠️ Services
                        </Link>

                        <Link
                            to="/survey-search-mentor"
                            className="btn text-start"
                        >
                            🔎 Find my mentor
                        </Link>

                        <Link
                            to="/user/profile"
                            className="btn text-start"
                        >
                            👤 My Profile
                        </Link>

                        <hr className="border-secondary" />

                        <button
                            onClick={handleLogout}
                            className="btn btn-outline-danger text-start"
                        >
                            🚪 Log Out
                        </button>

                    </nav>
                </aside>

                <main className="col-md-9 col-lg-10 ps-0">

                    <div className="text-white px-4 py-4 d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#ff1949" }}>


                        <div>
                            <h2 className="fw-bold mb-1">
                                Welcome back 👋
                            </h2>

                            <p className="mb-0">
                                Continue building your Hero's Story.
                            </p>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <div className="text-white">
                                <span> {localStorage.getItem("user_email") || "My Account"} </span>
                            </div>

                            <div className="dropdown">
                                <button
                                    className="btn user-menu-button "
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    👤
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end shadow">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/user/profile"
                                        >
                                            👤 Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                        >
                                            🚪 Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="px-4 py-4">

                        <div className="row g-4 mb-5">

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to={`/habits/user/${userId}`}
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                ✅
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Habits
                                            </h5>

                                            <p className="card-text text-muted">
                                                Track and improve your daily habits.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/user-quests"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                🎯
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Quests
                                            </h5>

                                            <p className="card-text text-muted">
                                                Review and continue your personal quests.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/user-mentors"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                👥
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Mentors
                                            </h5>

                                            <p className="card-text text-muted">
                                                Discover mentors near your location.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/match-mentor"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">
                                            <div className="fs-2 mb-3">
                                                🔎
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Find my mentor
                                            </h5>
                                            <p className="card-text text-muted">
                                                Find mentor that match your goals.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>

                        <div className="row g-4" >
                            <div className="col-12 col-xl-8">
                                <div className="card border-0 shadow-sm h-100" >
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="fs-2 me-3">
                                                🧙‍♂️
                                            </div>
                                            <div>
                                                <h4 className="mb-1">
                                                    IA Mentor Recommendation
                                                </h4>

                                                <small className="text-muted">
                                                    Personalized guidance for your journey
                                                </small>
                                            </div>

                                        </div>

                                        <p className="text-muted">
                                            Do you struggle to stick to your Habits or complete your Quests? Tell us what's going on and get Personalized advice.
                                        </p>

                                        <form onSubmit={handleEnviarIA}>
                                            <div className="mb-3">
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    placeholder="E.g., Lately, I've been feeling tired and unmotivated. I'm noticing that I'm not taking care of my routine or my diet."
                                                    value={mensaje}
                                                    onChange={(e) => setMensaje(e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn text-white"
                                                style={{ backgroundColor: "#ff1949" }}
                                                disabled={loading}
                                            >
                                                {loading ? "Thinking..." : "Get Recomendation"}
                                            </button>
                                        </form>
                                        {respuestaIA && (
                                            <div className="alert alert-light border mt-4">

                                                <h6 className="fw-bold">
                                                    ✨ Recommendation for your journey:</h6>
                                                <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
                                                    {respuestaIA}
                                                </p>

                                            </div>
                                        )}

                                    </div>

                                </div>
                            </div>

                            <div className="col-12 col-xl-4">
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold">
                                            Your Journey
                                        </h5>
                                        <p className="text-muted">
                                            Keep progressing through habits, quests and mentoring.
                                        </p>

                                        <Link
                                            to="/user-services"
                                            className="btn w-100"
                                            style={{
                                                color: "#ff1949",
                                                border: "1px solid #ff1949"
                                            }}
                                        >
                                            Explore Services
                                        </Link>
                                    </div>

                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold">
                                            Need a mentor?
                                        </h5>

                                        <p className="text-muted">
                                            Answer a few questions and we'll help you find mentors that fit your goals.
                                        </p>

                                        <Link
                                            to="/survey-search-mentor"
                                            className="btn text-white w-100"
                                            style={{ backgroundColor: "#ff1949" }}
                                        >
                                            Find my mentor
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
