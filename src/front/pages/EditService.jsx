import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditService = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [mentorId, setMentorId] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { service_id } = useParams();

    useEffect(() => {
        fetch(`${backendUrl}/api/services/${service_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Service not found");
                }
                return response.json();
            })
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
                setMentorId(data.mentor_id || "");
            })
            .catch((error) => {
                console.error(error);
            });
    }, [backendUrl, service_id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const serviceData = {
            title,
            description,
            price: Number(price),
            mentor_id: mentorId ? Number(mentorId) : null
        };

        fetch(`${backendUrl}/api/services/${service_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error updating service");
                }
                return response.json();
            })
            .then(() => {
                navigate("/services");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Edit Service</h1>

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
                    Save changes
                </button>
            </form>
        </div>
    );
};