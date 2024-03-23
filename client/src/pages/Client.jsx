import { useEffect } from "react";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../stores/clientSlice";
import Modal from "../components/Modal";
import { showModalHandler } from "../utils";

const clientFields = [
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

	const modalSUbmitHandler = () => {};
	// set edit button handler

	// set edit button submit

	// set delete button handler

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Clients</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={showModalHandler}>
					Add
				</button>
			</div>
			<Table fields={clientFields} data={clients} loading={loading} title={"client"} />
			<Modal title="Client Form">
				<form className="flex flex-col" onSubmit={() => console.log("submit")}>
					{clientFields.map((el, i) => {
						return (
							<div className="py-2" key={i}>
								<label htmlFor={el[0]}>{el[0]}</label>
								<input type={el[1]} placeholder={`Enter ${el[0]}`} className="mt-1 input input-bordered input-warning w-full " name={el} />
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full">Submit</button>
				</form>
			</Modal>
		</div>
	);
};

export default Client;
