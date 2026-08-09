import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MentorPrivateDashboard = () => {
    const { mentor_id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const [mentorData, setMentorData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const token = localStorage.getItem("mentor_token");

        fetch(`${backendUrl}/api/mentors/dashboard/${mentor_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Couldn't access this dashboard");
                }

                return data;
            })
            .then((data) => {
                setMentorData(data.mentor);
                dispatch({ type: "set_mentor_auth", payload: true });

            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.message);

                dispatch({ type: "set_mentor_auth", payload: false });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("mentor_id");
        localStorage.removeItem("mentor_token");

        dispatch({
            type: "set_mentor_auth",
            payload: false
        });
        navigate("/mentors/login");
    }

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Mentor Dashboard</h1>
                    <p className="mb-0">
                        {mentorData?.email}
                    </p>
                </div>

                <div className="d-flex gap-2">
                    <Link to="/mentor/profile" className="btn btn-primary">
                        My profile
                    </Link>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/mentors/services"
                        className="btn btn-primary w-100"
                    >
                        My services
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/mentors/services/new"
                        className="btn btn-primary w-100"
                    >
                        Create services
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/mentors/appointments"
                        className="btn btn-primary w-100"
                    >
                        Requested appointments
                    </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                    <Link
                        to="/mentors/users"
                        className="btn btn-primary w-100"
                    >
                        Contact users
                    </Link>
                </div>
            </div>
        </div>
    );
};