import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UserPageLayout } from "../components/UserPageLayout";

export const EditQuest = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [imageFile, setImageFile] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { quest_id } = useParams();
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        fetch(`${backendUrl}/api/quests/${quest_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Quest not found");
                }
                return response.json();
            })
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
                setCurrentImage(data.image_url || "");
            })
            .catch((error) => {
                console.error(error);
            });
    }, [backendUrl, quest_id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const questData = {
            title,
            description,
            status
        };

        try {
            // 1. Actualizamos los datos de texto de la quest
            const response = await fetch(`${backendUrl}/api/quests/${quest_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(questData)
            });

            if (!response.ok) {
                throw new Error("Error update quest");
            }

            // 2. Si el usuario ha seleccionado una imagen, la subimos
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);

                const imageResponse = await fetch(`${backendUrl}/api/quests/${quest_id}/image`, {
                    method: "PUT",
                    body: formData
                });

                if (!imageResponse.ok) {
                    throw new Error("Error uploading quest image");
                }
            }

            // 3. Redirección final
            if (userId) {
                navigate("/user-quests");
            } else {
                navigate("/login-user");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserPageLayout>

            <div className="container py-5">
                <h1 className="mb-4">Edit Quests</h1>

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

                    <div className="mb-3">
                        <label className="form-label">Quest Image</label>
                        {currentImage && (
                            <div className="mb-2">
                                <img
                                    src={currentImage}
                                    alt="Current quest"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    className="rounded shadow-sm"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            className="form-control"
                            onChange={(event) => setImageFile(event.target.files[0])}
                        />
                    </div>

                    <button type="submit" className="btn text-white"
                        style={{ backgroundColor: "#ff1949" }}>
                        Save changes
                    </button>
                </form>
            </div>
        </UserPageLayout>
    );
};