import Table from "../components/Table";
import { useSelector } from "react-redux";

const clientField = [
	["name", "text"],
	["email", "email"],
	["phone", "text"],
	["credit", "number"],
];

const Client = () => {
	const { clients } = useSelector((state) => state.client);
	return (
		<>
			<div>Client</div>
			<Table fields={clientField} data={clients} title={"client"} />
		</>
	);
};

export default Client;
