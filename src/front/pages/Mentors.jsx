import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { AdminPageLayout } from "../components/AdminPageLayout";

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

	function getMentors() {

		fetch(backendUrl + '/api/mentors')
			.then((response) => response.json())
			.then((data) => setMentors(data))
	}

	useEffect(() => {
		getMentors()
	}, [])

	function deleteMentor(mentor_id) {

		const requestOptions = {
			method: "DELETE"
		}
		fetch(backendUrl + '/api/mentors/' + mentor_id, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				getMentors()
			})
	}

	return (
		<AdminPageLayout>

			<div className="container py-5">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h1>Mentors</h1>

					<Link to="/new_mentor">
						<button className="btn text-white"
							style={{ backgroundColor: "#ff1949" }}
						>
							Create Mentor</button>
					</Link>
				</div>
				{mentors.length === 0 ? (
					<p className="text-muted">
						No mentors have been created yet.
					</p>
				) : (
					<div className="row g-4">
						{mentors.map((mentor) => (
							<div
								className="col-12 col-md-6"
								key={mentor.id}
							>
								<div className="card h-100 shadow-sm"
									style={{
										border: "none",
										borderLeft: "4px solid #ff1949"
									}}
								>
									<div className="card-body p-4">
										<h4 className="fw-bold mb-2">
											{mentor.mentorname}
										</h4>

										<p className="text-muted mb-4">
											{mentor.email}
										</p>

										<div className="d-flex gap-2">

											<Link to={"/edit_mentor/" + mentor.id}
												className="btn btn-sm"
												style={{
													color: "#ff1949",
													border: "1px solid #ff1949"
												}}
											>
												Edit Mentor
											</Link>
											<button
												type="button"
												onClick={() => deleteMentor(mentor.id)}
												className="btn btn-outline-danger btn-sm">
												Delete Mentor
											</button>
										</div>

									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</AdminPageLayout>
	);
};