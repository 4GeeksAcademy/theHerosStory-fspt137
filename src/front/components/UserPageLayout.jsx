import React, { Children } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserPageLayout = ({ children }) => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");

        navigate("/login-user");

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
                            User Dashboard
                        </small>
                    </div>

                    <nav className="d-flex flex-column px-3 py-4 gap-2">

                        <Link
                            to={`/user-dashboard/${userId}`}
                            className="btn text-start"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            to={`/habits/user/${userId}`}
                            className="btn text-start"
                        >
                            ✅ Habits
                        </Link>

                        <Link
                            to="/user-quests"
                            className="btn text-start"
                        >
                            🎯 Quests
                        </Link>

                        <Link
                            to="/user-mentors"
                            className="btn text-start"
                        >
                            👥 Mentors
                        </Link>

                        <Link
                            to="/user-services"
                            className="btn text-start"
                        >
                            🛠️ Services
                        </Link>

                        <Link
                            to="/survey-search-mentor"
                            className="btn text-start"
                        >
                            🔎 Find my mentor
                        </Link>

                        <Link
                            to="/user/profile"
                            className="btn text-start"
                        >
                            👤 My Profile
                        </Link>

                        <hr className="border-secondary" />

                        <button
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
                                Continue building your Hero's Story.
                            </p>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <div className="text-white">
                                <span> {localStorage.getItem("user_email") || "My Account"} </span>
                            </div>

                            <div className="dropdown">
                                <button
                                    className="btn user-menu-button "
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    👤
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end shadow">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/user/profile"
                                        >
                                            👤 Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
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
}