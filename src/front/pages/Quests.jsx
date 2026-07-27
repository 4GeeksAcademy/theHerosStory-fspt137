import React, { useEffect, useState, link } from "react"

export const Quests = () {
    const [quests, setQuests] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    cons getQuests = () => {
        fetch(`${backendUrl}/api/quests`)
            .then((respnse) => {
                if (!respnse.ok) {
                    throw new Error("Error fetching quests");
                }
                return respnse.json();
            })
            .then((data) => {
                setQuests(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getQuests();
    }, []);




} 