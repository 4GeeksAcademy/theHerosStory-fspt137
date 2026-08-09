import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Services = () => {
    const [services, setServices] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [selectedService, setselectedService] = useState(null);
    const mapRef = useRef(null);

    const getServices = () => {
        fetch(`${backendUrl}/api/services`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching services");
                }
                return response.json();
            })
            .then((data) => {
                setServices(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getServices();
    }, []);

    const deleteService = (serviceId) => {
        fetch(`${backendUrl}/api/services/${serviceId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error deleting service");
                }
                getServices();
            })
            .catch((error) => {
                console.error(error);
            });
    };

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

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Mentor Services</h1>
                <Link to="/services/new" className="btn btn-primary">
                    Create a new service
                </Link>
            </div>

            {services.length === 0 ? (
                <p className="text-muted">
                    You have not created any services yet.
                </p>
            ) : (
                <div className="list-group">
                    {services.map((service) => (

                        <div className="list-group-item d-flex justify-content-between align-items-center" key={service.id}>
                            <div>
                                <h5 className="mb-1">{service.title}</h5>
                                <p className="mb-1">
                                    {service.description}
                                </p>
                                <span className="badge text-bg-secondary">
                                    {service.price}
                                </span>
                            </div>

                            <p className="mb-1 mt-2">
                                <strong>Mentor:</strong>{service.mentor?.mentorname}
                            </p>
                            {service.mentor?.address && (
                                <p className="mb-1">
                                    📍 {service.mentor.address}
                                </p>
                            )}

                            <div className="d-flex gap-2">
                                <Link
                                    to={`/services/edit/${service.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Edit
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteService(service.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sn"
                                    onClick={() => setselectedService(service)}
                                >
                                    View location
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedService && (
                <div className="mt-4">
                    <h4>
                        Location - {selectedService.mentor?.mentorname}
                    </h4>
                    <p>
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
            )}
        </div>
    );
};