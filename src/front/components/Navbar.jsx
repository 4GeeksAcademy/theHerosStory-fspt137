import { Link } from "react-router-dom";

export const Navbar = () => {

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
					<Link to="/habits">
						<button className="btn btn-primary">Habits</button>
					</Link>
					<Link to="/mentors/login">
                        <button className="btn btn-primary">Mentor Log In</button>
                    </Link>
				</div>
			</div>
		</nav>
	);
};