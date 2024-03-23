import { useEffect } from "react";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { createClient, deleteClient, fetchClients, getClientById, setNullCurrentClient, updateClient } from "../stores/clientSlice";
import Modal from "../components/Modal";
import { removeModalHandler, showModalHandler } from "../utils";

const clientFields = [
	["name", "text"],
	["email", "email"],
	["phone", "number"],
	["credit", "number"],
];

const Client = () => {
	const { clients, loading, currentClient } = useSelector((state) => state.client);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [name, email, phone, credit] = e.target;

		const data = {
			name: name.value,
			email: email.value,
			phone: phone.value,
			credit: credit.value,
		};

		if (!currentClient) {
			dispatch(createClient(data)).then((res) => {
				console.log(res.payload, "=======");
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchClients());
				}
			});
		} else {
			dispatch(updateClient({ ...data, id: currentClient.id })).then((res) => {
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchClients());
				}
			});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentClient());
		showModalHandler();
	};

	const getClientByIdHandler = (id) => {
		dispatch(getClientById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteClient(currentClient.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(fetchClients());
			}
		});
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Clients</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add
				</button>
			</div>
			<Table fields={clientFields} data={clients} loading={loading} title={"client"} idModal="deleteClient" getDataByIdHandler={getClientByIdHandler} />
			<Modal title="Client Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					{clientFields.map((el, i) => {
						return (
							<div className="py-2" key={i}>
								<label htmlFor={el[0]}>{el[0]}</label>
								<input type={el[1]} placeholder={`Enter ${el[0]}`} defaultValue={currentClient?.[el[0]]} className="mt-1 input input-bordered input-warning w-full " name={el} />
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>
			<Modal id="deleteClient">
				<div className="flex flex-col gap-5">
					<p className="block">Are you sure want to delete {currentClient?.name}?</p>
					<div className="flex justify-end gap-2">
						<button className="btn bg-red-500 text-white" onClick={deleteHandler}>
							Yes
						</button>
						<button className="btn bg-green-500 text-white" onClick={removeModalHandler}>
							No
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Client;
