import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MentorUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const mentorId = localStorage.getItem("mentor_id");

    useEffect(() => {
        const mentorToken = localStorage.getItem("mentor_token");

        fetch(`${backendUrl}/api/mentors/users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${mentorToken}`,
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Error geting mentor users");
                }
                return data;
            })
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);

            })
            .catch((error) => {
                console.error(error);
                setError(error.message);

            })
            .finally(() => {
                setLoading(false);
            });

    }, [backendUrl]);

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading users...</p>
            </div>
        );
    }
    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Users who contacted me</h1>
                <Link
                    to={`/mentors/dashboard/${mentorId}`}
                    className="btn btn-outline-secondary"
                >
                    Back to Dashboard
                </Link>
            </div>
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!error && users.length === 0 ? (
                <p className="text-muted">
                    No users have contacted you yet.
                </p>
            ) : (
                <div className="list-group">
                    {users.map((user) => (
                        <div
                            key={user.chat_id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <h5 className="mb-1">
                                    User #{user.id}
                                </h5>

                                <p className="mb-0 text-muted">
                                    {user.email}
                                </p>
                            </div>

                            <Link
                                to={`/mentors/chats/${user.chat_id}`}
                                className="btn btn-primary"
                            >
                                Chat
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}