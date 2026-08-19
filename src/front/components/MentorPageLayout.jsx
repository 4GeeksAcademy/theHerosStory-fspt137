import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const MentorPageLayout = ({ children }) => {
    const navigate = useNavigate();

    const mentorId = localStorage.getItem("mentor_id");
    const mentorName = localStorage.getItem("mentor_name");
    const mentorEmail = localStorage.getItem("mentor_email");

    const handleLogout = () => {
        localStorage.removeItem("mentor_token");
        localStorage.removeItem("mentor_id");
        localStorage.removeItem("mentor_email");

        navigate("/mentors/login");

    };

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
                            to={`/mentors/dashboard/${mentorId}`}
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
                            onClick={handleLogout}
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
                                    { mentorEmail || "My Account"}
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
                                            onClick={handleLogout}
                                        >
                                            🚪 Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};