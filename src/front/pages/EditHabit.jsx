import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export const EditHabit = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { habit_id } = useParams();
    const userId = localStorage.getItem("user_id");


    useEffect(() => {
        fetch(`${backendUrl}/api/habits/${habit_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Habit not found")
                }
                return response.json();
            })
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [backendUrl, habit_id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const habitData = {
            title,
            description,
            status
        };


        fetch(`${backendUrl}/api/habits/${habit_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(habitData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error update habit");
                }
                return response.json();
            })
            .then(() => {
                if (userId) {
                    navigate(`/habits/user/${userId}`);
                } else {
                    navigate("/login-user");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Edit Habits</h1>

            <form onSubmit={handleSubmit} className="card p-4">

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Save changes
                </button>
            </form>
        </div>
    );
};