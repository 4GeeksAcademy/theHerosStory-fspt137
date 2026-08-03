import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CreateAdministrator = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSaving(true);

        fetch(`${backendUrl}/api/administrators`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error creating administrator");
                }

                return data;
            })
            .then((data) => {
                console.log("Administrator created:", data)
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
        <div className="container py-5">
            <h1>Create administrator</h1>

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
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    >
                    </input>
                </div>


                <div className="d-flex gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Create administrator"}
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
    );
};