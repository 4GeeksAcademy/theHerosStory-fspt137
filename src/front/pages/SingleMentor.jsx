// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export const SingleMentor = props => {
    // Access the global state using the custom hook.
    const { store } = useGlobalReducer()

    // Retrieve the 'theId' URL parameter using useParams hook.
    const { mentorId } = useParams()

    const [mentor, setMentor] = useState({})
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    function getMentor() {

        fetch(backendUrl + '/api/mentors/' + mentorId)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setMentor(data))
            .catch((error) => {
                console.error("Error loading mentor:", error);
            });
    }

    useEffect(() => {
        getMentor()
    }, [mentorId])

    return (
        <div className="container text-center">
            {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
            <h1 className="display-4">Mentor: {mentorId}</h1>
            <h1 className="display-4">Name: {mentor.mentorname}</h1>
            <h1 className="display-4">Email: {mentor.email}</h1>
            <h1 className="display-4">Category: {mentor.category}</h1>
            <h1 className="display-4">Tag: {mentor.tag}</h1>

            <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

            {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
            <Link to="/mentors">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back to mentors
                </span>
            </Link>
        </div>
    );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleMentor.propTypes = {
    // Although 'match' prop is defined here, it is not used in the component.
    // Consider removing or using it as needed.
    match: PropTypes.object
};
