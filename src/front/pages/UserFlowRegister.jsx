import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserFlowRegister = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    username: username, 
                    password: password, 
                    is_active: true   
                })
            });
            
            if (!resp.ok) throw new Error("Error creating user in server");
            
            navigate("/users"); 
        } catch (error) {
            console.error("Error capturado:", error);
        }
    };

    return (
        <div className="container my-5 flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="row shadow-lg rounded-4 bg-white overflow-hidden p-0 w-100" style={{ maxWidth: "900px", minHeight: "500px" }}>
                
                {/* 1. Izquierda: Formulario de Registro */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="fw-bold text-dark">Register New User</h3>
                        <p className="text-muted small">Crea una cuenta para comenzar.</p>
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
                                placeholder="'John24'"
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
                                placeholder="example@mail.com"
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

                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary w-50 py-2" 
                                onClick={() => navigate("/users")}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn w-50 py-2 fw-bold text-white shadow-sm"
                                style={{ backgroundColor: "#fa4251", border: "none" }}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>

                {/* 2. Derecha: La Imagen al lado */}
                <div className="col-md-6 d-none d-md-block p-0 bg-light">
                    <img 
                        src="https://economipedia.com/wp-content/uploads/usuario.jpg" 
                        alt="Register background" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "450px" }}
                    />
                </div>

            </div>
        </div>
    );
};