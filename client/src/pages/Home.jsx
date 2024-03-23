import { useSelector, useDispatch } from "react-redux";
import Cards from "../components/Cards";
import { useEffect } from "react";
import { fetchClients } from "../stores/clientSlice";
import { fetchUsers } from "../stores/userSlice";
import { fetchRooms } from "../stores/roomSlice";
import { fetchRoomUsages } from "../stores/roomUsage";

const Home = () => {
	const { clients, loading: clientLoading } = useSelector((state) => state.client);
	const { rooms, loading: roomLoading } = useSelector((state) => state.room);
	const { roomUsages, loading: roomUsageLoading } = useSelector((state) => state.roomUsage);
	const { users, currentUser, loading: userLoading } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchClients());
		dispatch(fetchUsers());
		dispatch(fetchRooms());
		dispatch(fetchRoomUsages());
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-3xl">Welcome Back, {currentUser ? currentUser.name : "Admin"}</h2>
				<p className="text-gray-500">Track, manage your information here</p>
			</div>

			<Cards
				data={[
					{ title: "Clients", total: clients?.length, loading: clientLoading },
					{ title: "Rooms", total: rooms?.length, loading: roomLoading },
					{ title: "Users", total: users?.length, loading: userLoading },
					{ title: "Room Usage", total: roomUsages?.length, loading: roomUsageLoading },
				]}
			></Cards>
		</div>
	);
};

export default Home;
