import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const QuestTracking = () => {
    const [trackings, setTrackings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getQuestTrackings = () => {
        fetch(`${backendUrl}/api/quest-trackings`)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.msg || "Error fetching quests"
                    );
                }
                return data;
            })
            .then((data) => {
                setTrackings(data);
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
        getQuestTrackings();
    }, []);

    const deleteQuestTracking = (trackingsId) => {
        fetch(`${backendUrl}/api/quest-trackings/${trackingsId}`, {
            method: "DELETE"
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Error deleting quest tracking");

                }
                return data;
            })
            .then(() => {
                getQuestTrackings();
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Quest trackings</h1>
                <Link to="/quest-trackings/new" className="btn btn-primary">
                    Create a new tracking
                </Link>
            </div>
            {loading && (
                <p className="text-muted">
                    Loding quest trackings...
                </p>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!loading && !error && trackings.length === 0 ? (
                <p className="text-muted">
                    You have not created any quest trackings yet.
                </p>
            ) : (
                !loading &&
                !error && (
                    <div className="list-group">
                        {trackings.map((tracking) => (
                            <div className="list-group-item d-flex justify-content-between align-items-center"
                                key={tracking.id}
                            >
                                <div>
                                    <h5 className="mb-1">
                                        Tracking #{tracking.id}
                                    </h5>

                                    <p className="mb-1">
                                        <strong>Quest:</strong>{" "}
                                        {tracking.quest_id}
                                    </p>

                                    <p className="mb-1">
                                        <strong>Date:</strong>{" "}
                                        {tracking.date}
                                    </p>

                                    <p className="mb-1">
                                        {tracking.comment}
                                    </p>

                                    <span className="badge text-bg-secondary">
                                        {tracking.status}
                                    </span>
                                </div>

                                <div className="d-flex gap-2">
                                    <Link to={`/quest-trackings/${tracking.id}/edit`}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteQuestTracking(tracking.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>

    );
};