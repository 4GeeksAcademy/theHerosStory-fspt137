import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminPageLayout } from "../components/AdminPageLayout";

export const EditUser = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // Necesaria para el PUT del backend
    
    // Estados nuevos para la gestión de la imagen de perfil
    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [loading, setLoading] = useState(true);

    // 1. Cargar datos con la URL correcta (/api/users/id)
    useEffect(() => {
        const getUserData = async () => {
            try {
                const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);
                if (!resp.ok) throw new Error("No se pudo obtener el usuario");
                const data = await resp.json();
                
                setEmail(data.email || "");
                setUsername(data.username || "");
                setPassword(data.password || ""); // Guardamos la contraseña actual
                setAvatarUrl(data.avatar_url || ""); // Cargamos la foto actual si existe
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar usuario:", error);
                setLoading(false);
            }
        };
        getUserData();
    }, [id]);

    // Función independiente para subir la foto de perfil al endpoint del avatar
    const handleUploadAvatar = async () => {
        if (!imageFile) return;

        const formData = new FormData();
        formData.append("file", imageFile);

        setUploading(true);
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/avatar`, {
                method: "PUT",
                body: formData
                // Nota: No se pone Content-Type, el navegador lo autogestiona con FormData
            });

            if (!resp.ok) throw new Error("Error al subir la imagen");
            const data = await resp.json();

            // Actualizamos la URL en pantalla con la que devuelve Cloudinary
            setAvatarUrl(data.user.avatar_url);
            setImageFile(null);
            alert("¡Foto de perfil actualizada con éxito!");
        } catch (error) {
            console.error("Error al subir el avatar:", error);
            alert("Hubo un error al subir la imagen.");
        } finally {
            setUploading(false);
        }
    };

    // 2. Guardar cambios de texto con PUT y la URL correcta (/api/users/id)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
                method: "PUT", // El backend exige PUT obligatoriamente
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password // Se envía 
                })
            });
            if (!resp.ok) throw new Error("Error al actualizar el usuario");
            
            navigate("/users"); 
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <AdminPageLayout>

        <div className="container mt-5">
            <div className="w-50 mx-auto card p-4 shadow-sm">
                <h2 className="mb-4 text-center">Editar Usuario #{id}</h2>

                {/* --- SECCIÓN NUEVA: AVATAR Y SUBIDA DE IMAGEN --- */}
                <div className="text-center mb-4">
                    <img 
                        src={avatarUrl || "https://res.cloudinary.com/x4zvzcsx/image/upload/f_auto,q_auto/307ce493-b254-4b2d-8ba4-d12c080d6651"} 
                        alt="Avatar actual" 
                        className="rounded-circle shadow-sm mb-3" 
                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                    <div className="mb-2">
                        <input 
                            type="file" 
                            className="form-control form-control-sm" 
                            onChange={(e) => setImageFile(e.target.files[0])} 
                            />
                    </div>
                    {imageFile && (
                        <button 
                        type="button" 
                        className="btn btn-info btn-sm text-white" 
                        onClick={handleUploadAvatar}
                        disabled={uploading}
                        >
                            {uploading ? "Subiendo..." : "Subir nueva foto"}
                        </button>
                    )}
                </div>
                {/* --------------------------------------------- */}

                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                            required 
                            />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico (Email)</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-warning">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
                            </AdminPageLayout>
    );
};