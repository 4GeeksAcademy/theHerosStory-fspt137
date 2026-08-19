import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminPageLayout } from "../components/AdminPageLayout";

export const EditMentor = () => {
    const navigate = useNavigate();
    const { mentorId } = useParams();
    const [formData, setFormData] = useState({ mentorname: "", email: "", password: "" });
    const [status, setStatus] = useState({ message: "", error: "" });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const loadMentor = async () => {
            if (!backendUrl) {
                setStatus({ message: "", error: "VITE_BACKEND_URL not set" });
                return;
            }

            const response = await fetch(backendUrl + "/api/mentors/" + mentorId);
            const data = await response.json();

            if (!response.ok) {
                setStatus({ message: "", error: data.msg || data.error || "Failed to load mentor" });
                return;
            }

            setFormData({
                mentorname: data.mentorname || "",
                email: data.email || "",
                password: "",
            });
        };

        loadMentor();
    }, [backendUrl, mentorId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "", error: "" });

        if (!backendUrl) {
            setStatus({ message: "", error: "VITE_BACKEND_URL not set" });
            return;
        }

        const response = await fetch(backendUrl + "/api/mentors/" + mentorId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            setStatus({ message: "", error: data.msg || data.error || "Failed to update mentor" });
            return;
        }

        setStatus({ message: "Mentor updated: " + data.mentorname, error: "" });
        setTimeout(() => navigate("/mentors"), 800);
    };

    return (
        <AdminPageLayout>

        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4">Edit Mentor</h1>
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
                                    <input className="form-control" type="text" name="password" value={formData.password} onChange={handleChange} autoComplete="off" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn text-white" style={{backgroundColor: "#ff1949"}} type="submit">Actualizar</button>
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
        </AdminPageLayout>
    );
};
