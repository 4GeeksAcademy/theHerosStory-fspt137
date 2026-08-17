import React, { useEffect } from "react"
import superImageUrl from "../assets/img/banner-illustration.svg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

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

	useEffect(() => {
		loadMessage()
	}, [])

	return (
	<div className="w-100 p" style={{ backgroundColor: "#F0F4FA", minHeight: "100vh" }}>
		
		<div className="training-course-banner-area py-5 px-3 px-md-5">
			<div className="container-fluid">
				<div className="row align-items-center">
					
					<div className="col-lg-7 col-md-12">
						<div className="training-course-banner-content text-start d-flex flex-column gap-4 pe-lg-5">
							
							<h1 className="display-3 fw-black m-0 lh-sm text-dark" style={{ letterSpacing: "-1px" }}>
								Improve your <span className="text-danger fw-black">Skills and Habits</span> with discipline and dedication
							</h1>
							
							<p className="m-0 text-muted fs-6 lh-base" style={{ maxWidth: "550px", color: "#6c757d" }}>
								The Hero's Story is an innovative learning platform designed to help you connect your scattered skills, master modern technology, and confidently build your own successful future.
							</p>
							
							<div className="btn-box">
								<Link to="/user-register">
									<button className="btn btn-danger rounded-0 text-white fw-bold px-4 py-3 d-inline-flex align-items-center gap-2 border-0" style={{ backgroundColor: "#FF1744" }}>
										 Create an Account
									</button>
								</Link>
							</div>
						</div>
					</div>
					
					<div className="col-lg-5 col-md-12 text-center mt-5 mt-lg-0">
						<p className="training-course-banner-image m-0">
							<img 
								src={superImageUrl} 
								className="img-fluid w-100" 
								alt="LMS Training Illustration" 
								style={{ 
									maxWidth: "650px",
									height: "auto",    
									objectFit: "contain" 
								}} 
							/>
						</p>
					</div>

				</div>
			</div>
		</div>
	</div>
);

}; 

