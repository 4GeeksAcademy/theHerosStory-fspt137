import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const ChatsInbox = () => {
    const { store, dispatch } = useGlobalReducer()
    const [chats, setChats] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getChats() {
        if (!backendUrl) return
        
        // CORRECCIÓN: Consumimos el endpoint raíz en plural sin parámetros extraños
        fetch(backendUrl + "/api/chats")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setChats(data)
                } else {
                    setChats([])
                }
            })
            .catch((error) => {
                console.error("Error getting chats:", error)
                setChats([])
            })
    }

    // Se ejecuta una única vez al montar la bandeja de entrada
    useEffect(() => {
        getChats()
    }, [])

    return (
        <div className="page mt-4">
            <div className="container-lg">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="h2">Global Inbox</h1>
                            <Link to="/mentors" className="btn btn-outline-secondary btn-sm">
                                Back to Mnetors
                            </Link>
                        </div>

                        <div className="row row-cols-1 row-cols-md-2 g-3">
                            {chats && chats.length === 0 ? (
                                <div className="col-12 text-center text-muted py-4">
                                    No chats yet.
                                </div>
                            ) : (
                                chats && chats.map((chat) => (
                                    <div key={chat.id} className="col">
                                        <Link
                                            className="card card-body text-decoration-none shadow-sm h-100 style-clickable"
                                            to={"/chats/" + chat.id} 
                                        >
                                            <h2 className="h5 text-primary">ChatRoom {chat.id}</h2>
                                            <p className="text-muted mb-1 small">
                                                <strong>Alumno (User) ID:</strong> {chat.user_id}
                                            </p>
                                            <p className="text-muted mb-0 small">
                                                <strong>Mentor ID:</strong> {chat.mentor_id}
                                            </p>
                                            <small className="text-muted d-block mt-2">
                                                Iniciated: {new Date(chat.created_at).toLocaleDateString()}
                                            </small>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}