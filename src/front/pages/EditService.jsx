import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditService = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [mentorId, setMentorId] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { service_id } = useParams();

    useEffect(() => {
        fetch(`${backendUrl}/api/services/${service_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Service not found");
                }
                return response.json();
            })
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
                setMentorId(data.mentor_id || "");
                setCurrentImage(data.image_url || "");
            })
            .catch((error) => {
                console.error(error);
            });
    }, [backendUrl, service_id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const serviceData = {
            title,
            description,
            price: Number(price),
            mentor_id: mentorId ? Number(mentorId) : null
        };

        try {
            // 1. Actualizar los datos del servicio
            const response = await fetch(`${backendUrl}/api/services/${service_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(serviceData)
            });

            if (!response.ok) {
                throw new Error("Error updating service");
            }

            // 2. Si se seleccionó una imagen, subirla mediante FormData
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);

                const imageResponse = await fetch(`${backendUrl}/api/services/${service_id}/image`, {
                    method: "PUT",
                    body: formData
                });

                if (!imageResponse.ok) {
                    throw new Error("Error uploading service image");
                }
            }

            // 3. Redirección final
            navigate("/services");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Edit Service</h1>

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
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mentor ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={mentorId}
                        onChange={(event) => setMentorId(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Service Image</label>
                    {currentImage && (
                        <div className="mb-2">
                            <img 
                                src={currentImage} 
                                alt="Current service" 
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

                <button type="submit" className="btn btn-primary">
                    Save changes
                </button>
            </form>
        </div>
    );
};