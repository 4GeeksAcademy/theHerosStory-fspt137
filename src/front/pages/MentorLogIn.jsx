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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h1 className="mb-4 text-center">Mentor Login</h1>

                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            >
                            </input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            >
                            </input>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                        <Link to="/mentors/register" className="btn btn-outline-secondary ms-2">
                            Register
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};