import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MentorRegister = () => {
    const [mentorname, setMentorname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        fetch(`${backendUrl}/api/mentors`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                mentorname,
                email,
                password
            })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Error creating mentor");
                }

                return data;
            })
            .then((data) => {
                console.log("Mentor created:", data);
                navigate("/mentors/login");
            })

            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h1 className="mb-4 text-center">Mentor Register</h1>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="mentorname" className="form-label">
                                Mentor name
                            </label>

                            <input
                                id="mentorname"
                                type="text"
                                className="form-control"
                                value={mentorname}
                                onChange={(event) => setMentorname(event.target.value)}
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
                                required
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

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "register"}
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link to="/mentors/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}
