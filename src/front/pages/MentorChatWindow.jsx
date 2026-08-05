import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const MentorChatWindow = () => {
    const { chatId } = useParams();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [messages, setErrorMessages] = useState([]);
    const [content, setContent] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMessages = () => {
        const mentorToken = localStorage.getItem("mentor_token");
        setError("");

        fetch(`${backendUrl}/api/mentors/chats/${chatId}/messages`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${mentorToken}`
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Error getting chat messages");
                }

                return data;
            })
            .then((data) => {
                setMessages(data.messages || []);

            })
            .catch((error) => {
                console.error(error);
                setError(error.message);

            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getMessages();
    }, [chaId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!content.trim()) {
            return;
        }
        const mentorToken = localStorage.getItem("mentor_token");

        setError("");

        fetch(`${backendUrl}/api/mentors/chats/${chatId}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "applications/json",
                Authorization: `Bearer ${mentorToken}`
            },
            body: JSON.stringify({
                content: content.trim()
            })
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Error sending message");
                }
                return data;
            })
            .then((data) => {
                setContent("");
                getMessages();
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };
    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading conversation...</p>
            </div>
        );
    }

    return (
        <div className="container py-5"
            style={{ maxWidth: "700px" }}
        >
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Chat #{chatId}</h1>
                <Link
                    to={`/mentors/users`}
                    className="btn btn-outline-secondary"
                >
                    Back to Users
                </Link>
            </div>
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div
                className="border rounded p-3 mb-3 bg-light"
                style={{
                    height: "350px",
                    overflowY: "auto"
                }}
            >

                {messages.length === 0 ? (
                    <p className="text-muted">
                        There are no messages yet.
                    </p>
                ) : (

                    messages.map((messages) => (
                        <div
                            key={messages.id}
                            className={
                                message.sender === "mentor"
                                    ? "text-end mb-3"
                                    : "text-start mb-3"
                            }
                        >


                        </div>


                    );
}