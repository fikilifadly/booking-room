import { useEffect } from "react";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../stores/clientSlice";

const clientField = [
	["name", "text"],
	["email", "email"],
	["phone", "text"],
	["credit", "number"],
];

const Client = () => {
	const { clients, loading } = useSelector((state) => state.client);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	// set add button handler

	// set edit button handler

	// set edit button submit

	// set delete button handler

	console.log(clients, loading, "==========");
	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Clients</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white">Add</button>
			</div>
			<Table fields={clientField} data={clients} loading={loading} title={"client"} />
		</div>
	);
};

export default Client;
