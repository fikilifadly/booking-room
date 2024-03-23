import { NavLink } from "react-router-dom";
const Sidebar = () => {
	const isActive = ({ isActive }) => (isActive ? "flex gap-3 py-2 px-3 items-center bg-green-500 rounded-lg text-white" : "flex gap-3 py-2 px-3 items-center");

	return (
		<div className="sticky top-0 md:block w-full md:w-[25%] flex flex-col">
			<nav className="p-5 flex-grow flex flex-col justify-between gap-3 bg-[#101828]">
				<div className="flex items-center">
					<h1 className="text-3xl text-green-500">Room Bookings</h1>
				</div>
				<ul className={`text-white flex-grow flex flex-col gap-1`}>
					<li>
						<NavLink to="/" className={isActive}>
							<span className="text-md">Homepage</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/clients" className={isActive}>
							<span className="text-md">Clients</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/rooms" className={isActive}>
							<span className="text-md">Rooms</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/roomusage" className={isActive}>
							<span className="text-md">Users</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/user" className={isActive}>
							<span className="text-md">Users</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
