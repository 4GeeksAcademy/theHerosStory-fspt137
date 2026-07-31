import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Users = props => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getUsers = async () => {
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users");
            if (!resp.ok) throw new Error("Error al obtener los usuarios");
            const data = await resp.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`, {
                method: "DELETE"
            });
            if (!resp.ok) throw new Error("Error al eliminar el usuario");
            
            // Actualizamos la lista localmente después de borrar
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Lista de Usuarios</h1>
                <Link to="/add-user" className="btn btn-success">
                    Crear Nuevo Usuario
                </Link>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <div className="col-md-4 mb-3" key={user.id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Usuario #{user.id}</h5>
                                        <p className="card-text">
                                            <strong>Email:</strong> {user.email}
                                        </p>
                                        <p className="card-text">
                                            <strong>Activo:</strong> {user.is_active ? "Sí" : "No"}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/edit-user/${user.id}`} className="btn btn-warning btn-sm">
                                                Editar
                                            </Link>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteUser(user.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-info text-center" role="alert">
                                No hay usuarios registrados todavía.
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};