import React, { useEffect, useRef, useState } from "react";
import { Link, matchPath } from "react-router-dom";

export const UserFlowMentors = () => {
    const [mentors, setMentors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("user_token");
    const userId = localStorage.getItem("user_id");
    const mapContainerRef = useRef(null);

    const getMentors = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/mentors/nearby`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.msg || "Error fetching mentors");
            }

            const data = await response.json();
            setMentors(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getMentors();
    }, [backendUrl]);

    useEffect(() => {
        const loadMap = async () => {
            if (
                !window.google ||
                !mapContainerRef.current ||
                mentors.length === 0
            ) {
                return;
            }
            const { Map: GoogleMap } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            const firstMentor = mentors[0];

            const map = new GoogleMap(mapContainerRef.current, {
                center: {
                    lat: Number(firstMentor.latitude),
                    lng: Number(firstMentor.longitude)
                },
                zoom: 11,
                mapId: "DEMO_MAP_ID"
            });

            mentors.forEach((mentor) => {
                if (mentor.latitude && mentor.longitude) {
                    new AdvancedMarkerElement({
                        map: map,
                        position: {
                            lat: Number(mentor.latitude),
                            lng: Number(mentor.longitude)
                        },
                        title: mentor.mentorname
                    });
                }
            });
        };

        loadMap();

    }, [mentors])

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Mentors near you</h1>
                <Link to={`/user-dashboard/${userId}`} className="btn btn-outline-secondary">
                    Back to dashboard
                </Link>
            </div>

            {mentors.length === 0 ? (
                <p className="text-muted">No mentors found near your location.</p>
            ) : (
                <>
                    <div
                        ref={mapContainerRef}
                        style={{
                            width: "100%",
                            height: "400px",
                            marginBottom: "25px"
                        }}
                    ></div>

                    <div className="list-group">
                        {mentors.map((mentor) => (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={mentor.id}>
                                <div>
                                    <h5 className="mb-1">{mentor.mentorname}</h5>
                                    <p className="mb-1">{mentor.email}</p>
                                    <p className="mb-1">{mentor.address}</p>
                                    <small className="text-muted" > {mentor.distance} km away</small>
                                </div>
                                <Link to={`/user-chat/${mentor.id}`} className="btn btn-primary btn-sm">
                                    Chat
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
