import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const ChatsInbox = () => {
    const { store, dispatch } = useGlobalReducer()
    const [chats, setChats] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getChats() {
        if (!backendUrl) return
        fetch(backendUrl + "/api/chats")
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.error) {
                    setChats(responseJson.data)
                }
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        getChats()
    }, [])

    return (
        <div className="page mt-4">
            <div className="container-lg">
                <div className="row">
                    <div className="col-12">
                        <h1>Chats</h1>
                        <div className="row row-cols-1 row-cols-md-2 g-3">
                            {chats.map((chat) => (
                                <div key={chat.id} className="col">
                                    <Link
                                        className="card card-body text-decoration-none"
                                        to={"/chats/" + chat.id}
                                    >
                                        <h2>{chat.title || "Chat" + chat.id}</h2>
                                        <p>{chat.lastMessage || "Sin mensaje reciente"}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}