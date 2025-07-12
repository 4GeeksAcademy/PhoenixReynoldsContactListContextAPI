import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1"> <i className="fa fa-house text-dark ms-2 me-1" /> </span>
				</Link>
				<div className="ml-auto">
					<Link to="/AddContact" className="btn btn-success"> Add a contact <i className="fa fa-plus text-light ms-2 me-1" /> </Link>
					{/* return to home page AFTER making sure contact data is recieved by backend */}
				</div>
			</div>
		</nav>
	);
};