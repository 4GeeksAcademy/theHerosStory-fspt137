import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Habits = () => {
    const [habits, setHabits] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getHabits = () => {
        fetch(`${backendUrl}/api/habits`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching habits");
                }
                return response.json();
            })
            .then((data) => {
                setHabits(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getHabits();
    }, []);

    const deleteHabit = (habitId) => {
        fetch(`${backendUrl}/api/habits/${habitId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error deleting habit");
                }
                getHabits();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>My Habits</h1>
                <Link to="/habits/new" className="btn btn-primary">
                    Create a new habit
                </Link>
            </div>

            {habits.length === 0 ? (
                <p className="text-muted">
                    You have not created any habits yet.
                </p>
            ) : (
                <div className="list-group">
                    {habits.map((habit) => (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={habit.id}>
                            <div>
                                <h5 className="mb-1">{habit.title}</h5>
                                <p className="mb-1">
                                    {habit.description}
                                </p>
                                <span className="badge text-bg-secondary">
                                    {habit.status}
                                </span>
                            </div>

                            <div className="d-flex gap-2">
                                <Link
                                    to={`/habits/edit/${habit.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteHabit(habit.id)}
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