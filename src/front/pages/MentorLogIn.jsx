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
                    dispatch({ type: 'set_mentor_auth', payload: true });
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
        <div>
            {store.mentorAuth ? (
                <h2>Logged In go to MentorDashboard</h2>
            ) : (
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
            )}
        </div>
    );
};
