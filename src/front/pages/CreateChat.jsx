import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateChat = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ user_id: "", mentor_id: ""})
    const [status, setStatus] = useState({ message: "", error: "" })
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "", error: "" })

        if (!backendUrl) {
            setStatus({ message: "", error: "VITE_BACKEND_URL not set" })
            return
        }

        const response = await fetch(backendUrl + "/api/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: parseInt(formData.user_id),
                mentor_id: parseInt(formData.mentor_id),
            }),
        });

        const data = await response.json()

        if (!response.ok) {
            setStatus({ message: "", error: data.msg || "Failed to create chat" })
            return
        }

        setStatus({ message: "Chat created. ID: " + data.chat_id, error: "" })
        setFormData({ user_id: "", mentor_id: "" })
        setTimeout(() => navigate("/mentors"), 1000)
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4">New Chat Connection</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">User ID (User ID):</label>
                                    <input 
                                        className="form-control" 
                                        type="number" 
                                        name="user_id" 
                                        value={formData.user_id} 
                                        onChange={handleChange} 
                                        placeholder="Ej: 1"
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mentor ID (Mentor ID):</label>
                                    <input 
                                        className="form-control" 
                                        type="number" 
                                        name="mentor_id" 
                                        value={formData.mentor_id} 
                                        onChange={handleChange} 
                                        placeholder="Ej: 3"
                                        required 
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">Establecer Canal</button>
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/mentors")}>Cancelar</button>
                                </div>
                            </form>

                            {status.message && <div className="alert alert-success mt-3 mb-0">{status.message}</div>}
                            {status.error && <div className="alert alert-danger mt-3 mb-0">{status.error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}