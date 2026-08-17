import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserPageLayout } from "../components/UserPageLayout";

export const UserFlowHabits = () => {
    const [habits, setHabits] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { user_id } = useParams();
    const effectiveUserId = user_id || localStorage.getItem("user_id");

    const getHabits = () => {
        fetch(`${backendUrl}/api/habits`)
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    console.error("Habit fetch failed:", response.status, text);
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
    }, [backendUrl]);

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
        <UserPageLayout>
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>My Habits</h1>
                <Link to="/habits/new" className="btn text-white"
                style={{ backgroundColor: "#ff1949" }}>
                    Create a new habit
                </Link>
            </div>

            {habits.filter((habit) => String(habit.user_id) === String(effectiveUserId)).length === 0 ? (
                <p className="text-muted">
                    You have not created any habits yet.
                </p>
            ) : (
                <div className="list-group">
                    {habits
                        .filter((habit) => String(habit.user_id) === String(effectiveUserId))
                        .map((habit) => (
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
    </UserPageLayout>
    );
};