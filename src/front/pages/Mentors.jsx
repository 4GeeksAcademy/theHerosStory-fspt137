import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Mentors = () => {

	const { store, dispatch } = useGlobalReducer()
    const [mentors, setMentors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

	const loadMessage = async () => {
		try {
			
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

    function getMentors(){

    	fetch(backendUrl + '/api/mentors')
      	.then((response)=>response.json())
      	.then((data)=>setMentors(data))
    }

	useEffect(() => {
		getMentors()
	}, [])

	function deleteMentor(mentor_id){

		const requestOptions = {
			method: "DELETE"
		}
      	fetch(backendUrl + '/api/mentors/' + mentor_id,requestOptions)
      	.then((response)=>response.json())
      	.then((data)=>{
			console.log(data)
			getMentors()
		})
    }

	return (
		<div className="text-center mt-5">
            <h1 className="display-4">Mentors</h1>
			<Link to="/new_mentor">
				<button className="btn btn-success">Create Mentor</button>
			</Link>
            {mentors.map((mentor)=>
            <p key={mentor.id}>
                Name: {mentor.mentorname} Email: {mentor.email}
				<Link to={"/mentors/" + mentor.id}>
					<button className="btn btn-primary">See Mentor</button>
				</Link>
				<Link to={"/edit_mentor/" + mentor.id}>
					<button className="btn btn-primary">Edit Mentor</button>
				</Link>
				<Link>
					<button onClick={()=>deleteMentor(mentor.id)} className="btn btn-danger">Delete Mentor</button>
				</Link>
            </p>
            )}
	    </div>
	)
}