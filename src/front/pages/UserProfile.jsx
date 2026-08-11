import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserProfile = () => {
    const navigate = useNavigate();
    const autocompleteContainerRef = useRef(null);
    const mapContainerRef = useRef(null);

    const token = localStorage.getItem("user_token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        latitude: "",
        longitude: ""

    });

    const [status, setStatus] = useState({
        message: "",
        error: ""
    });


    useEffect(() => {
        const loadUserProfile = async () => {
            if (!backendUrl) {
                setStatus({ message: "", error: "VITE_BACKEND_URL not set" });
                return;
            }
            if (!token) {
                setStatus({
                    message: "",
                    error: "No user sesssion found"
                });
                navigate("/user/login");
                return;
            }

            try {
                const response = await fetch(backendUrl + "/api/user/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();

                setFormData({
                    username: data.username || "",
                    email: data.email || "",
                    password: "",
                    address: data.address || "",
                    latitude: data.latitude ?? "",
                    longitude: data.longitude ?? ""
                });
            } catch (error) {
                console.error(error);

                setStatus({
                    message: "",
                    error: "Error connecting to backend"
                });
            }
        };

        loadUserProfile();
    }, [backendUrl, token, navigate]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "", error: "" });

        console.log("Sending profile data:", formData);
        if (!token) {
            navigate("/user/login");
            return;
        }


        try {
            const response = await fetch(backendUrl + "/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus({ message: "", error: data.msg || data.error || "Failed to update userr" });
                return;
            }

            setStatus({
                message: "User profile updated: ",
                error: ""
            });

        } catch (error) {
            console.error(error);

            setStatus({
                message: "",
                error: "Error connecting to backend"
            });
        }
    };

    useEffect(() => {
        const loadGoogleMaps = async () => {

            if (!window.google) {

                const script = document.createElement("script");

                script.src =
                    `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;

                script.async = true;

                document.head.appendChild(script);

                await new Promise((resolve) => {
                    script.onload = resolve;
                });
            }

            const { PlaceAutocompleteElement } = await google.maps.importLibrary("places");

            const autocomplete = new PlaceAutocompleteElement();

            autocomplete.placeholder = "Enter location";

            autocomplete.addEventListener("gmp-select", async (event) => {
                const placePrediction = event.placePrediction;
                const place = placePrediction.toPlace();
                await place.fetchFields({
                    fields: ["formattedAddress", "location"],
                });
                setFormData((prev) => ({
                    ...prev,
                    address: place.formattedAddress || "",
                    latitude: place.location?.lat() ?? "",
                    longitude: place.location?.lng() ?? ""
                }));
            });
            if (autocompleteContainerRef.current) {
                autocompleteContainerRef.current.innerHTML = "";
                autocompleteContainerRef.current.appendChild(autocomplete);
            }
        };
        loadGoogleMaps();

    }, []);

    useEffect(() => {
        const loadMap = async () => {
            if (
                !window.google ||
                !mapContainerRef.current ||
                !formData.latitude ||
                !formData.longitude
            ) {
                return;
            }
            const { Map: GoogleMap } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const position = {
                lat: Number(formData.latitude),
                lng: Number(formData.longitude)
            };

            const map = new GoogleMap(mapContainerRef.current, {
                center: position,
                zoom: 15,
                mapId: "DEMO_MAP_ID"
            });
            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                gmpDraggable: true,
                title: "Drag marker to adjust location"
            });

            marker.addListener("dragend", () => {
                const newPosition = marker.position;

                setFormData((prev) => ({
                    ...prev,
                    latitude: newPosition.lat,
                    longitude: newPosition.lng
                }));
            });
        };
        loadMap();
    }, [formData.address]);

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4">User Profile</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input className="form-control" type="text" name="mentorname" value={formData.username} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address:</label>
                                    <div ref={autocompleteContainerRef}></div>
                                    {formData.address && (
                                        <div className="mt-2">
                                            <strong>Selected address:</strong> {formData.address}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                   
                                    <input className="form-control" type="hidden" step="any" name="latitude" value={formData.latitude} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    
                                    <input className="form-control" type="hidden" step="any" name="longitude" value={formData.longitude} onChange={handleChange} />
                                </div>
                                {formData.latitude && formData.longitude && (
                                    <div
                                        ref={mapContainerRef}
                                        style={{
                                            width: "100%",
                                            height: "300px",
                                            marginTop: "15px",
                                            marginBottom: "15px"
                                        }}
                                    >
                                    </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">Save change</button>
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(`/user-dashboard/${localStorage.getItem("user_id")}`)}>Back to Dashboard</button>
                                </div>
                            </form>

                            {status.message && <div className="alert alert-success mt-3 mb-0">{status.message}</div>}
                            {status.error && <div className="alert alert-danger mt-3 mb-0">{status.error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
