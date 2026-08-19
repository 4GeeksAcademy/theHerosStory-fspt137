import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MentorPageLayout } from "../components/MentorPageLayout";
import { socket } from "../../socket";

export const MentorChatWindow = () => {
    const { chatId } = useParams();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]); 
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
        if (!chatId) return;
        
        getMessages();

        socket.emit("join_chat", { chat_id: chatId });

        socket.on("receive_message", (newMessage) => {
            if (Number(newMessage.chat_id) === Number(chatId)) {
                setMessages((prevMessages) => {
                    if (prevMessages.some(msg => msg.id === newMessage.id)) return prevMessages;
                    return [...prevMessages, newMessage];
                });
            }
        });

        return () => {
            socket.off("receive_message");
        };
    }, [chatId]);

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
                "Content-Type": "application/json", 
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
                
                const creado = data.message || data;
                
                socket.emit("send_message", creado);
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
        <MentorPageLayout>

        <div className="container py-5" style={{ maxWidth: "700px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Chat #{chatId}</h1>
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-warning btn-sm" 
                        onClick={getMessages}
                        title="Refresh messages"
                    >
                         Refresh
                    </button>
                    <Link to={`/mentors/users`} className="btn btn-outline-secondary">
                        Back to Users
                    </Link>
                </div>
            </div>
            
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="border rounded p-3 mb-3 bg-light" style={{ height: "350px", overflowY: "auto" }}>
                {messages.length === 0 ? (
                    <p className="text-muted">There are no messages yet.</p>
                ) : (
                    messages.map((message) => ( 
                        <div
                            key={message.id}
                            className={message.sender === "mentor" ? "text-end mb-3" : "text-start mb-3"}
                            >
                            <div>
                                <strong>
                                    {message.sender === "mentor" ? "Mentor" : "User"}
                                </strong>
                            </div>

                            <span
                                className={
                                    message.sender === "mentor"
                                    ? "d-inline-block bg-primary text-white rounded px-3 py-2"
                                    : "d-inline-block bg-white border rounded px-3 py-2"
                                }
                                >
                                {message.content}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                        />
                    <button type="submit" className="btn text-white"
                    style={{ backgroundColor: "#ff1949"}}>
                        Send
                    </button>
                </div>
            </form>
        </div>
                        </MentorPageLayout>
    );
};
