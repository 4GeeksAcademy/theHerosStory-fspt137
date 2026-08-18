import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MentorPageLayout } from "../components/MentorPageLayout";

export const EditMentorService = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { service_id } = useParams();

    useEffect(() => {

        const mentorToken = localStorage.getItem("mentor_token");

        fetch(`${backendUrl}/api/mentors/services/${service_id}`, {

            method: "GET",
            headers: {
                Authorization: `Bearer ${mentorToken}`
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Service not found");
                }

                return data;
            })

            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false)
            });
    }, [backendUrl, service_id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const mentorToken = localStorage.getItem("mentor_token");

        const serviceData = {
            title,
            description,
            price: Number(price),
        };

        fetch(`${backendUrl}/api/mentors/services/${service_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${mentorToken}`
            },
            body: JSON.stringify(serviceData)
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error("Error updating service");
                }
                return data;
            })
            .then(() => {
                navigate("/mentors/services");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading service...</p>
            </div>
        );
    }

    return (
        <MentorPageLayout>

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
                        min="0"
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn text-white"
                    style={{backgroundColor: "#ff1949"}}>
                        Save changes
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