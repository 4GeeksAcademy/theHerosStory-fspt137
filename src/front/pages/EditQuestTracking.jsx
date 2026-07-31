import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditQuestTracking = () => {
    const { tracking_id } = useParams();

    const [questId, setQuestId] = useState("");
    const [date, setDate] = useState("");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("pending");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${backendUrl}/api/quest-trackings/${tracking_id}`)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error loading quest tracking");
                }
                return data;
            })
            .then((data) => {
                setQuestId(data.quest_id);
                setDate(data.date);
                setComment(data.comment);
                setStatus(data.status);
                setError("");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [backendUrl, tracking_id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSaving(true);

        fetch(`${backendUrl}/api/quest-trackings/${tracking_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                quest_id: Number(questId),
                date,
                comment,
                status
            })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error updating quest tracking");
                }

                return data;
            })
            .then(() => {
                navigate("/quest-trackings")
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setSaving(false);
            });
    };

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading quest tracking...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-4">Edit quest tracking</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="questId" className="form-label">
                        Quest ID
                    </label>

                    <input
                        id="questId"
                        type="number"
                        className="form-control"
                        value={questId}
                        onChange={(event) => setQuestId(event.target.value)}
                    >
                    </input>
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                        Date
                    </label>

                    <input
                        id="date"
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    >
                    </input>
                </div>

                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                        Comment
                    </label>

                    <input
                        id="comment"
                        className="form-control"
                        rows="4"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        required
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>

                    <select
                        id="status"
                        className="form-label"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="d-flex gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>

                    <Link
                        to="quest-trackings"
                        className="btn btn-outline-secondary"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};