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
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Administrator Dashboard
                    {store.administrator?.name && ` - ${store.administrator.name}`}
                </h1>

                <button
                    className="btn btn-outline-danger"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

            <div className="d-flex gap-3 flex-wrap">
                <Link
                    to="/administrators"
                    className="btn btn-primary"
                >
                    Administrators
                </Link>

                <Link
                    to="/users"
                    className="btn btn-primary"
                >
                    Users
                </Link>

                <Link
                    to="/mentors"
                    className="btn btn-primary"
                >
                    Mentors
                </Link>

                <Link
                    to="/quests"
                    className="btn btn-primary"
                >
                    Quests
                </Link>
            </div>
        </div>
    );
};