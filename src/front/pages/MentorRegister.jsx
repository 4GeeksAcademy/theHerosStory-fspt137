import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MentorRegister = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    
    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        fetch(`${backendUrl}/api/mentors`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                mentorname,
                email,
                password,
                   
            })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error creating mentor");
                }

                return data;
            })
            .then((data) => {
                console.log("Mentor created:", data);
                navigate("/mentors/login");
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
                
                {/* 1. Izquierda: Formulario de Registro de Mentor */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="fw-bold text-dark">Register Mentor</h3>
                        <p className="text-muted small">Crea una cuenta como mentor para comenzar.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-secondary small fw-semibold">Username</label>
                            <input 
                                type="text" 
                                className="form-control px-3 py-2" 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                                required 
                                placeholder="MentorUser"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary small fw-semibold">Correo Electrónico (Email)</label>
                            <input 
                                type="email" 
                                className="form-control px-3 py-2" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required 
                                placeholder="mentor@mail.com"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-secondary small fw-semibold">Password</label>
                            <input 
                                type="password" 
                                className="form-control px-3 py-2" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                required 
                                placeholder="xxxxxxxxx"
                            />
                        </div>

                         
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>
                </div>

                {/* 2. Derecha: La Imagen al lado */}
                <div className="col-md-6 d-none d-md-block p-0 bg-light">
                    <img 
                        src="https://img.magnific.com/foto-gratis/equipo-trabajando-juntos-proyecto_23-2149325425.jpg?semt=ais_hybrid&w=740&q=80" 
                        alt="Register Mentor background" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "450px" }}
                    />
                </div>

            </div>
        </div>
    );
};