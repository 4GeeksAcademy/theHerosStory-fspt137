import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MentorLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function sendData(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        fetch(backendUrl + '/api/mentors/login', requestOptions)
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Usuario o contraseña incorrectos");
                }

                dispatch({ type: 'set_mentor_auth', payload: true });

                if (data && data.access_mentor_token && data.mentor_id) {
                    localStorage.setItem("mentor_token", data.access_mentor_token);
                    localStorage.setItem("mentor_id", data.mentor_id);
                    navigate(`/mentors/dashboard/${data.mentor_id}`);
                }

                return data;
            })
            .catch((error) => {
                console.error("Error en la petición:", error);
                alert(error.message || "No se pudo iniciar sesión");
            });
    }

    return (
        <div>
            <form onSubmit={sendData}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">LogIn</button>
            </form>
        </div>
    );
};