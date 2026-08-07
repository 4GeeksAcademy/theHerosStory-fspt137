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
        <div className="container mt-5">
            <div className="w-50 mx-auto card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Register New User</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                            required 
                            placeholder="'John24'"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico (Email)</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            placeholder="example@mail.com"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            placeholder="xxxxxxxxx"
                        />
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
