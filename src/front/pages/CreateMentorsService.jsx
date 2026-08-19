import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MentorPageLayout } from "../components/MentorPageLayout";

export const CreateMentorsService = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const mentorToken = localStorage.getItem("mentor_token");

        const serviceData = {
            title,
            description,
            price: Number(price),
        };

        setError("");

        fetch(`${backendUrl}/api/mentors/services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mentorToken}`
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
                navigate("/mentors/services");
            })
            .catch((error) => {
                console.error("Error creating service", error);
                setError(error.message);
            });
    };

    return (
        <MentorPageLayout>

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
                    <button type="submit" className="btn text-white"
                style={{ backgroundColor: "#ff1949"}}>
                        Create service
                    </button>

                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/mentors/services")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
                    </MentorPageLayout>
    );
};