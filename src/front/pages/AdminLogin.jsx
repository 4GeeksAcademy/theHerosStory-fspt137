import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        fetch(`${backendUrl}/api/admin/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error logging in");
                }

                return data;
            })
            .then((data) => {
                localStorage.setItem("adminToken", data.token);

                dispatch({
                    type: "admin_login",
                    payload: data.administrator
                });

                navigate("/admin-dashboard");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="row shadow-lg rounded-4 bg-white overflow-hidden p-0 w-100" style={{ maxWidth: "900px", minHeight: "500px" }}>
                
                {/* 1. Izquierda: Formulario y Textos */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="fw-bold text-dark">Administrator Login</h3>
                        <p className="text-muted small">Introduce tus credenciales de administrador.</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger text-center py-2" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-secondary small fw-semibold">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control px-3 py-2"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="admin@email.com"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label text-secondary small fw-semibold">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="form-control px-3 py-2"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="d-grid mb-3">
                            <button
                                type="submit"
                                className="btn py-2 fw-bold text-white shadow-sm"
                                style={{ backgroundColor: "#fa4251", border: "none" }}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>

                
                <div className="col-md-6 d-none d-md-block p-0 bg-light">
                    <img 
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" 
                        alt="Admin login background" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "450px" }}
                    />
                </div>

            </div>
        </div>
    );
};