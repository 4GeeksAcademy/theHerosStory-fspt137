import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MentorServices = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
}