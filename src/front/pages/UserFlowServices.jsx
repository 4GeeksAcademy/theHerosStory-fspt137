import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserPageLayout } from "../components/UserPageLayout";

export const UserFlowServices = () => {
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [selectedService, setselectedService] = useState(null);
    const mapRef = useRef(null);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        const getServices = async () => {
            try {
                setLoading(true);

                const servicesResponse = await fetch(`${backendUrl}/api/services`);
                if (!servicesResponse.ok) {
                    throw new Error("Error fetching services");
                }
                const services = await servicesResponse.json();
                setAllServices(services);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, [backendUrl]);

    useEffect(() => {
        const loadMap = async () => {
            if (
                !selectedService ||
                !selectedService.mentor?.latitude ||
                !selectedService.mentor?.longitude ||
                !mapRef.current

            ) {
                return;
            }

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

            const { Map: GoogleMap } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const position = {
                lat: Number(selectedService.mentor.latitude),
                lng: Number(selectedService.mentor.longitude)
            };

            const map = new GoogleMap(mapRef.current, {
                center: position,
                zoom: 15,
                mapId: "DEMO_MAP_ID"
            });
            new AdvancedMarkerElement({
                map: map,
                position: position,
                title: selectedService.mentor.mentorname
            });
        };

        loadMap();
    }, [selectedService]);

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading services...</p>
            </div>
        );
    }

    return (
        <UserPageLayout>

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Services</h1>
                    <Link to={`/user-dashboard/${userId}`} className="btn btn-outline-secondary">
                        Back to dashboard
                    </Link>
                </div>

                {allServices.length === 0 ? (
                    <p className="text-muted">No services have been created yet.</p>
                ) : (
                    <div className="row g-4">
                        {allServices.map((service) => (
                            <div className="col-12 col-lg-6" key={service.id}>
                                <div className="card h-100 shadow-sm"
                                    style={{ border: "none", borderLeft: "4px solid #ff1949" }}
                                >
                                    <div className="card-body p-4">
                                        <h4 className="fw-bold mb-2">{service.title}</h4>
                                        <p className="text-muted mb-3">{service.description}</p>

                                        <p className="mb-2">
                                            <strong>Mentor:</strong>
                                            {service.mentor?.mentorname}
                                        </p>

                                        {service.mentor?.address && (
                                            <p className="mb-1">
                                                📍 {service.mentor.address}
                                            </p>
                                        )}
                                        <span className="badge fs-6"
                                            style={{
                                                backgroundColor: "#ff1949"
                                            }}>
                                            ${service.price}
                                        </span>

                                        <div className="d-flex gap-2">
                                            <Link to={`/user-book/${service.id}`} className="btn text-white text-nowrap" style={{
                                                backgroundColor: "#ff1949"
                                            }}>
                                                Book Appointment
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary "
                                                onClick={() => setselectedService(service)}
                                            >
                                                View location
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedService && (
                    <div className="mt-5">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">

                                <h4>
                                    Location - {selectedService.mentor?.mentorname}
                                </h4>
                                <p className="text-muted">
                                    📍 {selectedService.mentor?.address}
                                </p>
                                <div
                                    ref={mapRef}
                                    style={{
                                        width: "100%",
                                        height: "300px"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserPageLayout>
    );
};
