import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MentorPageLayout } from "../components/MentorPageLayout";

export const MentorServices = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMentorServices = () => {
        const mentorToken = localStorage.getItem("mentor_token");
        setError("");
        setLoading(true);

        fetch(`${backendUrl}/api/mentors/services`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${mentorToken}`
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        data.msg || "Error getting mentor services"
                    );
                }
                return data;
            })
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getMentorServices();
    }, []);

    const deleteService = (serviceId) => {
        const mentorToken = localStorage.getItem("mentor_token");

        fetch(`${backendUrl}/api/mentors/services/${serviceId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${mentorToken}`
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        data.msg || "Error deleting services"
                    );
                }
                return data;
            })
            .then(() => {
                getMentorServices();
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>My Services</h1>
            </div>

            <div className="d-flex gap-2">
                <Link
                    to={`/mentors/dashboard/${localStorage.getItem("mentor_id")}`}
                    className="btn btn-outline-secondary"
                    >
                    Back to Dashboard
                </Link>


                <Link
                    to="/mentors/services/new"
                    className="btn text-white"
                    style={{ backgroundColor: "#ff1949"}}
                    >
                    Create a new service
                </Link>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!error && services.length === 0 ? (
                <p className="text-muted">
                    You have not created any services yet.
                </p>
            ) : (
                <div className="list-group">
                    {services.map((service) => (
                        <div
                        key={service.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <h5 className="mb-1">
                                    {service.title}
                                </h5>

                                <p className="mb-1">
                                    {service.description}
                                </p>

                                <span className="badge text-bg-secondary">
                                    {service.price}
                                </span>
                            </div>

                            <div className="d-flex gap-2">
                                <Link
                                    to={`/mentors/services/edit/${service.id}`}
                                    className="btn btn-sm"
                                    style={{ 
                                        color: "#ff1949",
                                        border: "1px solid #ff1949"                                    
                                    }}
                                    >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deleteService(service.id)
                                    }
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </MentorPageLayout>
    );
};
