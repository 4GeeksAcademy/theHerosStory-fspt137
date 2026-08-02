import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Administrators = () => {
    const [administrators, setAdministrators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAdministrators = () => {
        setLoading(true);

        fetch(`${backendUrl}/api/administrators`)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.msg || "Error fetching administrators"
                    );
                }
                return data;
            })
            .then((data) => {
                setAdministrators(data);
                setError("");
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
        getAdministrators();
    }, []);

    const deleteAdministrator = (adminId) => {
        fetch(`${backendUrl}/api/administrators/${adminId}`, {
            method: "DELETE"
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Error deleting administrator");
                };
                return data;
            })
            .then(() => {
                getAdministrators();
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };
    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Administrators</h1>

                <Link
                    to="/administrators/new" className="btn btn-primary"
                >
                    Create Administrator
                </Link>
            </div>

            {loading && (
                <p className="text-muted">Loading administrators...</p>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!loading && !error && administrators.length === 0 && (
                <p className="text-muted">
                    There are no administrators yet.
                </p>
            )}

            {!loading && !error && administrators.length > 0 && (
                <div className="list-group">
                    {administrators.map((administrator) => (
                        <div
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={administrator.id}
                        >
                            <div>
                                <h5 className="mb-1">
                                    {administrator.name}
                                </h5>
                                <p className="mb-0">
                                    {administrator.email}
                                </p>
                            </div>

                            <div className="d-flex gap-2">
                                <Link
                                    to={`/administrators/${administrator.id}/edit`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteAdministrator(administrator.id)}
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