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
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">

                <aside className="col-md-2 col-lg-2 bg-white min-vh-100 border-end p-0">
                    <div className="p-4 text-white"
                        style={{ backgroundColor: "#ff1949" }}>
                        <h4 className="fw-bold mb-1">
                            The Hero's Story
                        </h4>
                        <small className="text-white">
                            Mentor Dashboard
                        </small>
                    </div>

                    <nav className="d-flex flex-column px-3 py-4 gap-2">

                        <Link
                            to={`/mentors/dashboard/${mentor_id}`}
                            className="btn text-start"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            to="/mentor/profile"
                            className="btn text-start"
                        >
                            👤 My Profile
                        </Link>

                        <Link
                            to="/mentors/services"
                            className="btn text-start"
                        >
                            🛠️ My Services
                        </Link>

                        <Link
                            to="/mentors/users"
                            className="btn text-start"
                        >
                            💬 Contact Users
                        </Link>

                        <button
                            type="button"
                            onClick={logout}
                            className="btn btn-outline-danger text-start"
                        >
                            🚪 Log Out
                        </button>

                    </nav>
                </aside>

                <main className="col-md-9 col-lg-10 ps-0">

                    <div className="text-white px-4 py-4 d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#ff1949" }}>


                        <div>
                            <h2 className="fw-bold mb-1">
                                Welcome back 👋
                            </h2>

                            <p className="mb-0">
                                Manager your services and support your users.
                            </p>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <div className="text-white">

                            <span>
                                {mentorData?.mentorname || mentorData?.email || "My Account"}
                            </span>
                            </div>


                        <div className="dropdown">
                            <button
                                className="btn user-menu-button"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                >
                                <span className="fs-5">
                                    👤
                                </span>

                            </button>

                            <ul className="dropdown-menu dropdown-menu-end shadow">
                                <li>
                                    <Link
                                        className="dropdown-item py-2"
                                        to="/mentor/profile"
                                        >
                                        👤 Profile
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button
                                        className="dropdown-item py-2 text-danger"
                                        onClick={logout}
                                        >
                                        🚪 Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                        </div>

                    </div>
                    <div className="px-4 py-4">

                        <div className="row g-4 mb-5">

                            <div className="col-12 col-sm-6 col-xl-4">
                                <Link
                                    to="/mentors/services"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 shadow-sm"
                                    style={{ border: "none", borderLeft: "4px solid #ff1949"}}>
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                🛠️
                                            </div>

                                            <h5 className="card-title text-dark">
                                                My Services
                                            </h5>

                                            <p className="card-text text-muted">
                                                Review and manager your current services.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-4">
                                <Link
                                    to="/mentors/services/new"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 shadow-sm"
                                    style={{ border: "none", borderLeft: "4px solid #ff1949"}}>
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                ➕
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Create Service
                                            </h5>

                                            <p className="card-text text-muted">
                                                Add a new service for your users.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>
                            
                            <div className="col-12 col-sm-6 col-xl-4">
                                <Link
                                    to="/mentors/users"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 shadow-sm"
                                    style={{ border: "none", borderLeft: "4px solid #ff1949"}}>
                                        <div className="card-body p-4">
                                            <div className="fs-2 mb-3">
                                                💬
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Contact Users
                                            </h5>
                                            <p className="card-text text-muted">
                                                Stay connected with your users.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>

                        <div className="row g-4" >
                            <div className="col-12 col-xl-8">
                                <div className="card border-0 shadow-sm h-100" >
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="fs-2 me-3">
                                                🧭
                                            </div>
                                            <div>
                                                <h4 className="mb-1">
                                                    Mentor workspace
                                                </h4>

                                                <small className="text-muted">
                                                    Manager your activity from one place
                                                </small>
                                            </div>

                                        </div>

                                        <p className="text-muted">
                                            Keep your profile update, manager your services and respond tu users who need your guiandance.
                                        </p>

                                        <Link
                                            to="/mentor/profile"
                                            className="btn text-white"
                                            style={{ backgroundColor: "#ff1949" }}
                                        >
                                            Update My Profile
                                        </Link>

                                    </div>
                                </div>

                            </div>

                            <div className="col-12 col-xl-4">
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold">
                                            Your Services
                                        </h5>
                                        <p className="text-muted">
                                            Create or update the services you offer.
                                        </p>

                                        <Link
                                            to="/mentors/services"
                                            className="btn w-100"
                                            style={{
                                                color: "#ff1949",
                                                border: "1px solid #ff1949"
                                            }}
                                        >
                                            Manage Services
                                        </Link>
                                    </div>

                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold">
                                            New Service
                                        </h5>

                                        <p className="text-muted">
                                            Add another service to your mentor profile.
                                        </p>

                                        <Link
                                            to="/mentors/services/new"
                                            className="btn text-white w-100"
                                            style={{ backgroundColor: "#ff1949" }}
                                        >
                                            Create Service
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};