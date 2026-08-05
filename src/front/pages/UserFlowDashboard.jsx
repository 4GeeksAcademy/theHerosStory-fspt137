import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const UserFlowDashboard = () => {
    const { mentor_id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const [mentorData, setMentorData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (hasCheckedAuth) return;

        if (!mentor_id || mentor_id === ":mentor_id") {
            setErrorMessage("No valid mentor for this view");
            return;
        }

        const token = localStorage.getItem("mentor_token");

        if (!token) {
            setErrorMessage("Log in as a mentor to see this view");
            dispatch({ type: "set_mentor_auth", payload: false });
            setHasCheckedAuth(true);
            return;
        }

        fetch(`${backendUrl}/api/mentors/dashboard/${mentor_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.msg || "Couldn't access this dashboard");
                }

                return data;
            })
            .then((data) => {
                setMentorData(data.mentor);
                dispatch({ type: "set_mentor_auth", payload: true });
                setHasCheckedAuth(true);
            })
            .catch((error) => {
                console.error("Error loading dashboard:", error);
                setErrorMessage(error.message || "Not allowed to enter");
                dispatch({ type: "set_mentor_auth", payload: false });
                setHasCheckedAuth(true);
            });
    }, [backendUrl, dispatch, hasCheckedAuth, mentor_id, navigate]);

    if (errorMessage && !mentorData) {
        return <div>{errorMessage}</div>;
    }

    return (
        <div>
            <h2>Private Dashboard</h2>
            <p>Mentor with email {mentorData?.email || "mentor@example.com"}</p>
        </div>
    );
};