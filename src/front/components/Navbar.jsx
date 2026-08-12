import { Link } from "react-router-dom";

export const Navbar = () => {
	const mentorId = localStorage.getItem("mentor_id");
	const userId = localStorage.getItem("user_id");
	const dashboardPath = mentorId ? `/mentors/dashboard/${mentorId}` : "/mentors/login";

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/users">
						<button className="btn btn-primary">Users</button>
					</Link>
					<Link to="/mentors">
						<button className="btn btn-primary">Mentors</button>
					</Link>
					<Link to="/quests">
						<button className="btn btn-primary">Quests</button>
					</Link>
					<Link to="/quest-trackings">
						<button className="btn btn-primary">Quest tracking</button>
					</Link>
					<Link to={userId ? `/habits/user/${userId}` : "/login-user"}>
    					<button className="btn btn-primary">Habits</button>
					</Link>
					<Link to="/services">
						<button className="btn btn-primary">Services</button>
					</Link>
					<Link to="/mentors/login">
						<button className="btn btn-primary">Mentor Log In</button>
					</Link>
					<Link to={dashboardPath}>
						<button className="btn btn-primary">Mentor Dashboard</button>
					</Link>
					<Link to="/administrators">
						<button className="btn btn-primary">Administrator</button>
					</Link>
					<Link to="/admin-login">
						<button className="btn btn-primary">Admin login</button>
					</Link>
					<Link to="/admin-dashboard">
						<button className="btn btn-primary">Admin Dashboar</button>
					</Link>
					<Link to="/login-user">
						<button className="btn btn-success ms-2">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};