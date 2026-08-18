import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { UserPageLayout } from "../components/UserPageLayout";

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
        <UserPageLayout>

            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">

                        <div
                            className="card shadow-sm"
                            style={{
                                border: "none",
                                borderLeft: "4px solid #ff1949"
                            }}
                        >
                            <div className="card-body p-5">
                                <h1 className="fw-bold mb-3">{service.title}</h1>
                                <p className="text-muted fs-5 mb-4">{service.description}</p>

                                <div className="mb-4">
                                    <span className="badge fs-5"
                                        style={{ backgroundColor: "#ff1949" }}>
                                        Price: ${service.price}
                                    </span>
                                </div>

                                {service.is_reserved && (
                                    <div className="alert alert-success" role="alert">
                                        ✓ Appointment reserved
                                    </div>
                                )}
                                <hr className="my-4" />

                                <div className="d-flex gap-3 flex-wrap">

                                    <Link to="/user-services" className="btn btn-outline-secondary">
                                        Back to services
                                    </Link>

                                    <button
                                        className="btn text-white"
                                        style={{
                                            backgroundColor: service.is_reserved
                                                ? "#198754"
                                                : "#ff1949"
                                        }}
                                        onClick={handleConfirm}
                                        disabled={service.is_reserved || updating}
                                    >
                                        {updating ? "Saving..." : service.is_reserved ? "✓ Reserved" : "Confirm Appointment"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </UserPageLayout>
    );
};
