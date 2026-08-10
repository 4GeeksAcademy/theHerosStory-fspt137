import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const UserFlowBook = () => {
    const { store } = useGlobalReducer();
    const { serviceId } = useParams();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const userId = store.user?.id || "1"; 

    const getService = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}/api/services/${serviceId}`);
            if (!response.ok) {
                throw new Error("Error fetching service details");
            }
            const data = await response.json();
            setService(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getService();
    }, [serviceId, backendUrl]);

    const handleConfirm = async () => {
        try {
            setUpdating(true);
            const response = await fetch(`${backendUrl}/api/services/${serviceId}/reserve`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Could not complete reservation");
            }

            const updatedService = await response.json();
            setService(updatedService); 
        } catch (error) {
            console.error("Error reserving:", error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="container text-center py-5">
                <p>Loading service details...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="container text-center py-5">
                <p className="text-danger">Service not found.</p>
                <Link to="/user-services" className="btn btn-secondary">
                    Back to services
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5 text-center">
            <h1 className="display-4 mb-3">{service.title}</h1>
            <p className="lead fs-4 text-muted mb-4">{service.description}</p>
            
            <div className="mb-4">
                <span className="badge bg-success p-3 fs-5">
                    Price: ${service.price}
                </span>
            </div>

            {service.is_reserved && (
                <div className="alert alert-success my-3 fs-5 fw-bold" role="alert">
                    Reserved by user: {userId}
                </div>
            )}

            <hr className="my-4" />

            <div className="d-flex justify-content-center gap-3">
                <Link to="/user-services" className="btn btn-outline-secondary btn-lg">
                    Back to services
                </Link>
                <button 
                    className={`btn btn-lg ${service.is_reserved ? "btn-success" : "btn-primary"}`} 
                    onClick={handleConfirm}
                    disabled={service.is_reserved || updating}
                >
                    {updating ? "Saving..." : service.is_reserved ? "✓ Reserved" : "Confirm Appointment"}
                </button>
            </div>
        </div>
    );
};
