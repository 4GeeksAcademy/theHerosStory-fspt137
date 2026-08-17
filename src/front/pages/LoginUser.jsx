import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Credenciales inválidas");
            }

            localStorage.setItem("user_token", data.access_token);
            navigate(`/user-dashboard/${data.user_id}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="row shadow-lg rounded-4 bg-white overflow-hidden p-0 w-100" style={{ maxWidth: "900px", minHeight: "500px" }}>
                
                {/* 1. Izquierda: Formulario y Texto (como en Colorlib) */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="fw-bold text-dark">Login to The Hero's Story</h3>
                        <p className="text-muted small">Introduce tus datos para continuar con tu cuenta.</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger text-center py-2" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-secondary small fw-semibold">Username</label>
                            <input 
                                type="email" 
                                className="form-control px-3 py-2" 
                                placeholder="user@email.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-secondary small fw-semibold">Password</label>
                            <input 
                                type="password" 
                                className="form-control px-3 py-2" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="d-grid mb-3">
                            <button 
                                type="submit" 
                                className="btn btn-warning py-2 fw-bold text-white shadow-sm"
                                style={{ backgroundColor: "#fa4251", border: "none" }}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-muted small mb-0">
                            ¿No tienes cuenta?{" "}
                            <Link to="/user-register" className="text-decoration-none fw-bold text-danger">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>

                
                <div className="col-md-6 d-none d-md-block p-0 bg-light">
                    <img 
                        src="https://economipedia.com/wp-content/uploads/usuario.jpg" 
                        alt="Login template background" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "450px" }}
                    />
                </div>

            </div>
        </div>
    );
};