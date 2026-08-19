import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminPageLayout } from "../components/AdminPageLayout";
export const EditAdministrator = () => {
    const { admin_id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${backendUrl}/api/administrators/${admin_id}`)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.msg || "Error fetching administrators"
                    );
                }
                return data;
            })
            .then((data) => {
                setName(data.name);
                setEmail(data.email);
                setError("");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    }, [backendUrl, admin_id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");
        setSaving(true);

        const administratorData = {
            name,
            email
        };

        if (password.trim() !== "") {
            administratorData.password = password;
        }

        fetch(`${backendUrl}/api/administrators/${admin_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(administratorData)
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.msg || "Error updating administrators"
                    );
                }
                return data;
            })

            .then((data) => {
                console.log("Administrator update:", data)
                navigate("/administrators");
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setSaving(false);
            });
    };

    return (
        <AdminPageLayout>

        <div className="container py-5">
            <h1>Edit administrator</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                        >
                    </input>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        >
                    </input>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        New Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Leave blank to keep current password"
                        >
                    </input>
                </div>


                <div className="d-flex gap-2">
                    <button
                        type="submit"
                        className="btn text-white"
                        style={ { backgroundColor: "#ff1949"}}
                        disabled={saving}
                        >
                        {saving ? "Saving..." : "Saving change"}
                    </button>

                    <Link
                        to="/administrators"
                        className="btn btn-outline-secondary"
                        >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
                        </AdminPageLayout>
    );
};