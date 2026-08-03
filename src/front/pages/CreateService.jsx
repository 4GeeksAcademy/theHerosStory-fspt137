import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateService = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [mentorId, setMentorId] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const serviceData = {
            title,
            description,
            price: Number(price),
            mentor_id: mentorId ? Number(mentorId) : null
        };

        fetch(`${backendUrl}/api/services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Error creating service");
                }

                return data;
            })
            .then(() => {
                navigate("/services");
            })
            .catch((error) => {
                console.error("Error completo", error.message);
            });
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Create a new service</h1>

            <form onSubmit={handleSubmit} className="card p-4">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mentor ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={mentorId}
                        onChange={(event) => setMentorId(event.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create service
                </button>
            </form>
        </div>
    );
};