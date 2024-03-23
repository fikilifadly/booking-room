import { useSelector } from "react-redux";
import Cards from "../components/Cards";
import { toast } from "react-toastify";

const Home = () => {
	const { clients } = useSelector((state) => state.client);
	const { rooms } = useSelector((state) => state.room);
	const { roomUsages } = useSelector((state) => state.roomUsage);
	const { users, currentUser } = useSelector((state) => state.user);

	console.log(clients);
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-3xl">Welcome Back, {currentUser ? currentUser.name : "Admin"}</h2>
				<p className="text-gray-500">Track, manage and forecast your platform information here</p>
			</div>

			<Cards
				data={[
					{ title: "Clients", total: clients?.length },
					{ title: "Rooms", total: rooms.length },
					{ title: "Users", total: users.length },
					{ title: "Room Usage", total: roomUsages.length },
				]}
			></Cards>
			<button onClick={() => toast("hello")}>test</button>
		</div>
	);
};

export default Home;
