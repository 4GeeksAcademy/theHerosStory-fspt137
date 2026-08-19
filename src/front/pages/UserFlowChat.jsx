import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socket";
import { UserPageLayout } from "../components/UserPageLayout";

export const UserFlowChat = () => {
    const { mentorId } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [chatId, setChatId] = useState(null);
    const [mentorName, setMentorName] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const getMessages = () => {
        if (!chatId || !backendUrl) return;

        fetch(`${backendUrl}/api/chats/${chatId}/messages`)
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    console.error("Chat messages fetch failed:", response.status, text);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                if (data?.messages) {
                    setMessages(data.messages);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        const ensureChat = async () => {
            if (!backendUrl || !userId || !mentorId) return;

            try {
                const response = await fetch(`${backendUrl}/api/chats`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id: Number(userId), mentor_id: Number(mentorId) })
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.msg || "Could not create chat");
                }

                const nextChatId = data.chat?.id || data.chat_id;
                if (nextChatId) {
                    setChatId(nextChatId);
                }

                if (data.chat?.mentor_id) {
                    const mentorResponse = await fetch(`${backendUrl}/api/mentors/${data.chat.mentor_id}`);
                    const mentorData = await mentorResponse.json();
                    if (mentorResponse.ok) {
                        setMentorName(mentorData.mentorname || "Mentor");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        ensureChat();
    }, [backendUrl, mentorId, userId]);

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

    const handleSend = (event) => {
        event.preventDefault();
        if (!content.trim() || !chatId) return;

        fetch(`${backendUrl}/api/chats/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: Number(chatId),
                sender: "user",
                content: content.trim()
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setContent("");

                const creado = data.message || data;

                socket.emit("send_message", creado);
            })
            .catch((error) => console.error(error));
    };

    return (
        <UserPageLayout>

        <div className="container py-5" style={{ maxWidth: "700px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Chat with {mentorName || "Mentor"}</h1>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={getMessages}
                        title="Refresh messages"
                        >
                        Refresh
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/user-mentors")}>
                        Back
                    </button>
                </div>
            </div>

            <div className="border rounded p-3 mb-3 bg-light" style={{ height: "350px", overflowY: "auto" }}>
                {messages.length === 0 ? (
                    <p className="text-muted">Start the conversation.</p>
                ) : (
                    messages.map((message) => (
                        <div
                        key={message.id}
                        className={message.sender === "user" ? "text-end mb-3" : "text-start mb-3"}
                        >
                            <div>
                                <strong>
                                    {message.sender === "user" ? "You" : mentorName || "Mentor"}
                                </strong>
                            </div>
                            <span
                                className={
                                    message.sender === "user"
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

            <form onSubmit={handleSend}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write a message..."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                        />
                    <button type="submit" className="btn text-white"
                    style={{ backgroundColor: "#ff1949"} }>Send</button>
                </div>
            </form>
        </div>
        </UserPageLayout>
    );
};
