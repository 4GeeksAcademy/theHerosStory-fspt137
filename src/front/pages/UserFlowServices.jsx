import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserFlowServices = () => {
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getServices = async () => {
            try {
                setLoading(true);

                const servicesResponse = await fetch(`${backendUrl}/api/services`);
                if (!servicesResponse.ok) {
                    throw new Error("Error fetching services");
                }
                const services = await servicesResponse.json();
                setAllServices(services);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, [backendUrl]);

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading services...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Services</h1>
                <Link to="/user-dashboard" className="btn btn-outline-secondary">
                    Back to dashboard
                </Link>
            </div>

            {allServices.length === 0 ? (
                <p className="text-muted">No services have been created yet.</p>
            ) : (
                <div className="list-group">
                    {allServices.map((service) => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={service.id}>
                            <div className="flex-grow-1 me-3">
                                <h5 className="mb-1">{service.title}</h5>
                                <p className="mb-2">{service.description}</p>
                                <span className="badge text-bg-info">
                                    ${service.price}
                                </span>
                            </div>
                            <div>
                                <Link to={`/user-book/${service.id}`} className="btn btn-primary text-nowrap">
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};