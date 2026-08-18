import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserPageLayout } from "../components/UserPageLayout";

export const CreateQuest = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const questData = {
            title,
            description,
            status,
            user_id: localStorage.getItem("user_id")
        };
   
        fetch(`${backendUrl}/api/quests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(questData)
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));
                console.log("Status:", response.status);
                console.log("Respuesta del backend", data);

                if (!response.ok) {
                    throw new Error(data.msg || data.error || "Error creating quest");
                }
                return data;
            })
            .then((data) => {
                console.log("quest creada", data);
                navigate("/user-quests");
            })
            .catch((error) => {
                console.error("Error completo", error.message);
            });
    };


    return (
        <UserPageLayout>

        <div className="container py-5">
            <h1 className="mb-4">Create a new quest</h1>

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

                <button type="submit" className="btn text-white"
                style={{ backgroundColor: "#ff1949" }}>
                    Create quest
                </button>

            </form >
        </div>
    </UserPageLayout>

    );
};