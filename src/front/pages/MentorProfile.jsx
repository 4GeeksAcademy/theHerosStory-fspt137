import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MentorPageLayout } from "../components/MentorPageLayout";


export const MentorProfile = () => {
    const navigate = useNavigate();
    const autocompleteContainerRef = useRef(null);
    const mapContainerRef = useRef(null);

    const token = localStorage.getItem("mentor_token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [formData, setFormData] = useState({
        mentorname: "",
        email: "",
        password: "",
        address: "",
        latitude: "",
        longitude: "",
        categoty: "",
        tag: ""

    });

    const [status, setStatus] = useState({
        message: "",
        error: ""
    });


    useEffect(() => {
        const loadMentorProfile = async () => {
            if (!backendUrl) {
                setStatus({ message: "", error: "VITE_BACKEND_URL not set" });
                return;
            }
            if (!token) {
                setStatus({
                    message: "",
                    error: "No mentor sesssion found"
                });
                navigate("/mentor/login");
                return;
            }

            try {
                const response = await fetch(backendUrl + "/api/mentor/profile", {
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
                    mentorname: data.mentorname || "",
                    email: data.email || "",
                    password: "",
                    address: data.address || "",
                    latitude: data.latitude ?? "",
                    longitude: data.longitude ?? "",
                    categoty: data.category || "",
                    tag: data.tag || ""
                });
            } catch (error) {
                console.error(error);

                setStatus({
                    message: "",
                    error: "Error connecting to backend"
                });
            }
        };

        loadMentorProfile();
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
            navigate("/mentor/login");
            return;
        }


        try {
            const response = await fetch(backendUrl + "/api/mentor/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus({ message: "", error: data.msg || data.error || "Failed to update mentor" });
                return;
            }

            setStatus({
                message: "Mentor profile updated: ",
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
        <MentorPageLayout>

        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4">Mentor Profile</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input className="form-control" type="text" name="mentorname" value={formData.mentorname} onChange={handleChange} required />
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
                                <div className="mb-3">
                                    <label className="form-select">Category:</label>

                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.categoty}
                                        onChange={handleChange}
                                        >
                                        <option value="">Select category</option>
                                        <option value="career">Career growth</option>
                                        <option value="personal-development">Personal development</option>
                                        <option value="productivity">Productivity</option>
                                        <option value="finance">Finance</option>
                                        <option value="habits">Habits</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Speciality:</label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="tag"
                                        value={formData.tag}
                                        onChange={handleChange}
                                        ></input>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn text-white"
                                    type="submit"
                                    style={{ backgroundColor: "#ff1949"}}
                                    >Save change</button>
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(`/mentors/dashboard/${localStorage.getItem("mentor_id")}`)}>Back to Dashboard</button>
                                </div>
                            </form>

                            {status.message && <div className="alert alert-success mt-3 mb-0">{status.message}</div>}
                            {status.error && <div className="alert alert-danger mt-3 mb-0">{status.error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                        </MentorPageLayout>
    );
};
