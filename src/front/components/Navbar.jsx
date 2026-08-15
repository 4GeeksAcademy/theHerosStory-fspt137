import { Link } from "react-router-dom";

export const Navbar = () => {
	const mentorId = localStorage.getItem("mentor_id");
	const userId = localStorage.getItem("user_id");
	const dashboardPath = mentorId ? `/mentors/dashboard/${mentorId}` : "/mentors/login";

	return (
	<nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
		<div className="container-fluid px-md-5">
			
			{/* Título a la izquierda: Grande, tipografía limpia, compacta y sin logo */}
			<Link to="/" className="navbar-brand fw-black fs-2 text-dark m-0" style={{ letterSpacing: "-1.5px", fontFamily: "'Inter', sans-serif" }}>
				The Hero's Story
			</Link>

			{/* Enlaces de navegación alineados a la derecha de forma equidistante */}
			<div className="d-flex align-items-center gap-4 ms-auto">
				
				{/* Enlaces simples */}
				<Link to="/about-us" className="nav-link fw-semibold text-secondary hover-dark fs-6">
					About us
				</Link>
				
				<Link to="/team" className="nav-link fw-semibold text-secondary hover-dark fs-6">
					Team
				</Link>

				{/* Dropdown de Bootstrap para los Logins */}
				<div className="dropdown">
					<button 
						className="btn dropdown-toggle fw-semibold text-secondary fs-6 border-0 bg-transparent p-0 d-flex align-items-center gap-1"
						type="button" 
						id="loginDropdown" 
						data-bs-toggle="dropdown" 
						aria-expanded="false"
					>
						Login As
					</button>
					<ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 mt-2" aria-labelledby="loginDropdown">
						<li>
							<Link to="/login-user" className="dropdown-menu-item text-dark text-decoration-none d-block px-4 py-2 hover-bg-light">
								User
							</Link>
						</li>
						<li>
							<Link to="/mentors/login" className="dropdown-menu-item text-dark text-decoration-none d-block px-4 py-2 hover-bg-light">
								Mentor
							</Link>
						</li>
						<li>
							<Link to="/admin-login" className="dropdown-menu-item text-dark text-decoration-none d-block px-4 py-2 hover-bg-light">
								Admin
							</Link>
						</li>
					</ul>
				</div>

			</div>
		</div>
	</nav>
);

};