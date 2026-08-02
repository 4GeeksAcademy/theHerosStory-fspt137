import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Services = () => {
    const [services, setServices] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getServices = () => {
        fetch(`${backendUrl}/api/services`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching services");
                }
                return response.json();
            })
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getServices();
    }, []);

    const deleteService = (serviceId) => {
        fetch(`${backendUrl}/api/services/${serviceId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error deleting service");
                }
                getServices();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Mentor Services</h1>
                <Link to="/services/new" className="btn btn-primary">
                    Create a new service
                </Link>
            </div>

            {services.length === 0 ? (
                <p className="text-muted">
                    You have not created any services yet.
                </p>
            ) : (
                <div className="list-group">
                    {services.map((service) => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={service.id}>
                            <div>
                                <h5 className="mb-1">{service.title}</h5>
                                <p className="mb-1">
                                    {service.description}
                                </p>
                                <span className="badge text-bg-secondary">
                                    {service.price}
                                </span>
                            </div>

                            <div className="d-flex gap-2">
                                <Link
                                    to={`/services/edit/${service.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteService(service.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};