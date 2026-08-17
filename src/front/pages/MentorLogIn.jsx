import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MentorLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function sendData(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        fetch(backendUrl + '/api/mentors/login', requestOptions)
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Usuario o contraseña incorrectos");
                }

                dispatch({ type: 'set_mentor_auth', payload: true });

                if (data && data.access_mentor_token && data.mentor_id) {
                    localStorage.setItem("mentor_token", data.access_mentor_token);
                    localStorage.setItem("mentor_id", data.mentor_id);
                    navigate(`/mentors/dashboard/${data.mentor_id}`);
                }

                return data;
            })
            .catch((error) => {
                console.error("Error en la petición:", error);
                alert(error.message || "No se pudo iniciar sesión");
            });
    }

    return (
        <div className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="row shadow-lg rounded-4 bg-white overflow-hidden p-0 w-100" style={{ maxWidth: "900px", minHeight: "500px" }}>
                
                {/* 1. Izquierda: Formulario y Textos */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="fw-bold text-dark">Mentor Login</h3>
                        <p className="text-muted small">Introduce tus credenciales de mentor.</p>
                    </div>

                    <form onSubmit={sendData}>
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
                                placeholder="mentor@email.com"
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

                        <div className="d-grid gap-2">
                            <button 
                                type="submit" 
                                className="btn py-2 fw-bold text-white shadow-sm"
                                style={{ backgroundColor: "#fa4251", border: "none" }}
                            >
                                Login
                            </button>
                            <Link to="/mentors/register" className="btn btn-outline-secondary py-2">
                                Register
                            </Link>
                        </div>
                    </form>
                </div>

                
                <div className="col-md-6 d-none d-md-block p-0 bg-light">
                    <img 
                        src="https://redmentoring.es/wp-content/uploads/2025/01/Depositphotos_119376370_S.jpg" 
                        alt="Mentor login background" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "450px" }}
                    />
                </div>

            </div>
        </div>
    );
};