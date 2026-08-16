import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const logout = () => {
        localStorage.removeItem("adminToken");

        dispatch({
            type: "admin_logout"
        });
        navigate("/admin-login");
    };
    return (
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">

                <aside className="col-md-3 col-lg-2 bg-white min-vh-100 border-end p-0">
                    <div className="p-4 text-white"
                        style={{ backgroundColor: "#ff1949" }}>
                        <h4 className="fw-bold mb-1">
                            The Hero's Story
                        </h4>

                    </div>

                    <nav className="d-flex flex-column px-3 py-4 gap-2">

                        <Link
                            to="/admin/dashboard"
                            className="btn text-start"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            to="/administrators"
                            className="btn text-start"
                        >
                            🛡️ Administrators
                        </Link>

                        <Link
                            to="/users"
                            className="btn text-start"
                        >
                            👤 Users
                        </Link>


                        <Link
                            to="/mentors"
                            className="btn text-start"
                        >
                            👥 Mentors
                        </Link>

                        <Link
                            to="/quests"
                            className="btn text-start"
                        >
                            🎯 Quests
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

                <main className="col-md-9 col-lg-10">

                    <div className="text-white px-3 py-3 d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#ff1949" }}>


                        <div>
                            <h2 className="fw-bold mb-1">
                                Administrator Dashboard
                            </h2>

                            <p className="mb-0">
                                Manager users, mentors and platform content.
                            </p>
                        </div>

                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="fs-5">
                                    👤
                                </span>

                                <span>
                                    {store.administrator?.name || "Administrator"}
                                </span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end shadow">
                                <li>
                                    <span className="dropdown-item-text fw-semibold">
                                        {store.administrator?.name || "Administrator"}
                                    </span>
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
                    <div className="px-4 py-4">

                        <div className="row g-4 mb-5">

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/administrators"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                🛡️
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Administrators
                                            </h5>

                                            <p className="card-text text-muted">
                                                Manager administrator accounts and permissions.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/users"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                👤
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Users
                                            </h5>

                                            <p className="card-text text-muted">
                                                Review and manager registered users.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/mentors"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">

                                            <div className="fs-2 mb-3">
                                                👥
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Mentors
                                            </h5>

                                            <p className="card-text text-muted">
                                                Manage mentor profiles and activity.
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-xl-3">
                                <Link
                                    to="/quests"
                                    className="text-decoration-none"
                                >
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body p-4">
                                            <div className="fs-2 mb-3">
                                                🎯
                                            </div>

                                            <h5 className="card-title text-dark">
                                                Quests
                                            </h5>
                                            <p className="card-text text-muted">
                                                Review and manage available quests.
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
                                                📊
                                            </div>
                                            <div>
                                                <h4 className="mb-1">
                                                    Plataform Management
                                                </h4>

                                                <small className="text-muted">
                                                    Control the main areas of the platform
                                                </small>
                                            </div>

                                        </div>

                                        <p className="text-muted">
                                            Form this dashboard you can manage users, mentors, administrators and quests.
                                        </p>

                                        <Link
                                            to="/mentor/profile"
                                            className="btn text-white"
                                            style={{ backgroundColor: "#ff1949" }}
                                        >
                                            Manage Users
                                        </Link>

                                    </div>
                                </div>

                            </div>

                            <div className="col-12 col-xl-4">
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold">
                                            Mentor Management
                                        </h5>
                                        <p className="text-muted">
                                            Review mentor profiles and platform participation.
                                        </p>

                                        <Link
                                            to="/mentors"
                                            className="btn w-100"
                                            style={{
                                                color: "#ff1949",
                                                border: "1px solid #ff1949"
                                            }}
                                        >
                                            View Mentors
                                        </Link>
                                    </div>

                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold">
                                            Quests
                                        </h5>

                                        <p className="text-muted">
                                            Manage the quests available to users.
                                        </p>

                                        <Link
                                            to="/quests"
                                            className="btn text-white w-100"
                                            style={{ backgroundColor: "#ff1949" }}
                                        >
                                            Manage Quests
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