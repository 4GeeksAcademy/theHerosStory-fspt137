import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export const ChatWindow = () => {
    const { chatId } = useParams()
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState("")
    const [sender, setSender] = useState("user") 
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getMessages() {
        if (!backendUrl) return
        fetch(`${backendUrl}/api/chats/${chatId}/messages`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.messages) setMessages(data.messages)
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getMessages()
    }, [chatId])

    const handleSend = (e) => {
        e.preventDefault()
        if (!content.trim()) return

        fetch(backendUrl + "/api/chats/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: parseInt(chatId),
                sender: sender,
                content: content
            })
        })
        .then((res) => res.json())
        .then(() => {
            setContent("")
            getMessages() 
        })
        .catch((err) => console.error(err))
    }

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Chat #{chatId}</h1>
                <Link to="/chats" className="btn btn-secondary btn-sm">Back</Link>
            </div>

            <div className="border p-3 mb-3 bg-light" style={{ height: "300px", overflowY: "auto" }}>
                {messages.map((msg) => (
                    <p key={msg.id} className={msg.sender === "user" ? "text-start text-primary" : "text-end text-success"}>
                        <strong>{msg.sender === "user" ? "Alumno: " : "Mentor: "}</strong>
                        {msg.content}
                    </p>
                ))}
            </div>

            <form onSubmit={handleSend}>
                <div className="mb-2">
                    <label className="me-3">Send as:</label>
                    <input type="radio" name="role" checked={sender === "user"} onChange={() => setSender("user")} /> User
                    <input type="radio" name="role" className="ms-3" checked={sender === "mentor"} onChange={() => setSender("mentor")} /> Mentor
                </div>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Write..." value={content} onChange={(e) => setContent(e.target.value)} required />
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    )
}