import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const MentorLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { store, dispatch } = useGlobalReducer(); 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function sendData(e) {
        e.preventDefault();
        console.log('send data', email, password);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        fetch(backendUrl + '/api/mentors/login', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    dispatch({ type: 'set_auth', payload: true });
                } else {
                    console.error("Error en las credenciales");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.access_token) {
                    localStorage.setItem("token", data.access_token);
                }
                console.log(data);
            })
            .catch(error => console.error("Error en la petición:", error));
    }

    return (
        <form onSubmit={sendData}>
            
            {store.auth ? "Logged In go to MentorDashboard" : "Not logged In show form" }

            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            <button type="submit">LogIn</button>
        </form>
    );
};