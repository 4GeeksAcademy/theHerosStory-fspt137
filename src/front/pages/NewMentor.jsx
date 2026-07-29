import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewMentor = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ mentorname: "", email: "", password: "" })
    const [status, setStatus] = useState({ message: "", error: "" })
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "", error: "" })

        if (!backendUrl) {
            setStatus({ message: "", error: "VITE_BACKEND_URL not set" })
            return
        }

        const response = await fetch(backendUrl + "/api/mentors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json()

        if (!response.ok) {
            setStatus({ message: "", error: data.msg || "Failed to create mentor" })
            return
        }

        setStatus({ message: "Mentor created: " + data.mentorname, error: "" })
        setFormData({ mentorname: "", email: "", password: "" })
        setTimeout(() => navigate("/mentors"), 800)
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div>
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4">New Mentor</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre:</label>
                                    <input className="form-control" type="text" name="mentorname" value={formData.mentorname} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña:</label>
                                    <input className="form-control" type="text" name="password" value={formData.password} onChange={handleChange} required autoComplete="off" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">Crear</button>
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