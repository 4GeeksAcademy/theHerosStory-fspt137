import React, { useState } from "react";
import storeReducer from "../store";

export const MentorLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function sendData(e) {
        e.preventDefault();
        console.log('send data');
        console.log(email, password);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        fetch(backendUrl + '/api/mentors/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("token", data.access_token)
                console.log(data)
            });
    };

    return (
        <form onSubmit={sendData}>
            
            {storeReducer.auth == true ? "Logged In go to MentorDashboard" : "Not logged In show form" }

            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            <button type="submit">LogIn</button>
        </form>
    );
};
