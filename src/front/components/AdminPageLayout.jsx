import React, { children } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AdminPageLayout = ({ children }) => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const logout = () => {
        localStorage.removeItem("adminToken");

        dispatch({
            type: "set_admin_auth",
            payload: false
        });

        navigate("/admin-login");
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

                    </div>

                    <nav className="d-flex flex-column px-3 py-4 gap-2">

                        <Link
                            to="/admin-dashboard"
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
                                Administrator Dashboard
                            </h2>

                            <p className="mb-0">
                                Manager users, mentors and platform content.
                            </p>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <div className="text-white">
                                <span>
                                    {store.administrator?.name || "Administrator"}
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
                    </div>
                    <div className="px-4 py-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};