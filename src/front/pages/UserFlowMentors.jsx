import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserFlowMentors = () => {
    const [mentors, setMentors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMentors = () => {
        fetch(`${backendUrl}/api/mentors`)
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    console.error("Mentors fetch failed:", response.status, text);
                    throw new Error("Error fetching mentors");
                }
                return response.json();
            })
            .then((data) => {
                setMentors(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getMentors();
    }, [backendUrl]);

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Mentors</h1>
                <Link to="/user-dashboard" className="btn btn-outline-secondary">
                    Back to dashboard
                </Link>
            </div>

            {mentors.length === 0 ? (
                <p className="text-muted">No mentors have been created yet.</p>
            ) : (
                <div className="list-group">
                    {mentors.map((mentor) => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={mentor.id}>
                            <div>
                                <h5 className="mb-1">{mentor.mentorname}</h5>
                                <p className="mb-1">{mentor.email}</p>
                            </div>
                            <Link to={`/user-chat/${mentor.id}`} className="btn btn-primary btn-sm">
                                Chat
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
