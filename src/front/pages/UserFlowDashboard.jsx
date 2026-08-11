import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserFlowDashboard = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");
        navigate("/login-user");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1 className="text-success">User's private dashboard</h1>
                <p className="lead">¡Bienvenido! Te has logueado con éxito.</p>
                <Link to={`/habits/user/${userId}`}>
                    <button className="btn btn-primary">Habits</button>
                </Link>
                <Link to="/user-quests">
                    <button className="btn btn-primary">Quests</button>
                </Link>
                <Link to="/user-mentors">
                    <button className="btn btn-primary">Mentors</button>
                </Link>
                <Link to="/user-services">
                    <button className="btn btn-primary">Services</button>
                </Link>

                <Link to="/user/profile" className="btn btn-primary">
                    My profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="btn btn-danger mt-3 w-25"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};