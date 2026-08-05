import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserFlowQuests = () => {
    const [quests, setQuests] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const userId = localStorage.getItem("user_id");

    const getQuests = () => {
        fetch(`${backendUrl}/api/quests`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching quests");
                }
                return response.json();
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
    }, [backendUrl]);

    const deleteQuest = (questId) => {
        fetch(`${backendUrl}/api/quests/${questId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error deleting quest");
                }
                getQuests();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const userQuests = quests.filter((quest) => String(quest.user_id) === String(userId));

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>My Quests</h1>
                <Link to="/quests/new" className="btn btn-primary">
                    Create a new quest
                </Link>
            </div>

            {userQuests.length === 0 ? (
                <p className="text-muted">
                    You have not created any quests yet.
                </p>
            ) : (
                <div className="list-group">
                    {userQuests.map((quest) => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={quest.id}>
                            <div>
                                <h5 className="mb-1">{quest.title}</h5>
                                <p className="mb-1">{quest.description}</p>
                                <span className="badge text-bg-secondary">{quest.status}</span>
                            </div>

                            <div className="d-flex gap-2">
                                <Link
                                    to={`/quests/edit/${quest.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteQuest(quest.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};