import { useEffect } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { removeModalHandler, showModalHandler } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { createUser, deleteUser, editUser, fetchUsers, getUserById, setNullCurrentUser } from "../stores/userSlice";

const userFields = [
	["name", "text"],
	["email", "email"],
	["password", "password"],
];
const User = () => {
	const { users, loading, currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [name, email, password] = e.target;

		const data = {
			name: name.value,
			email: email.value,
			password: password.value,
		};

		if (!currentUser) {
			dispatch(createUser(data)).then((res) => {
				if (res.payload.data) {
					removeModalHandler();
					dispatch(fetchUsers());
				}
			});
		} else {
			console.log("masuk");
			console.log(currentUser.id, "========");
			dispatch(editUser({ ...data, id: currentUser.id })).then((res) => {
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchUsers());
				}
			});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentUser());
		showModalHandler();
	};

	const getUserByIdHandler = (id) => {
		dispatch(getUserById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteUser(currentUser.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(fetchUsers());
			}
		});
	};

	return (
		<>
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<h2 className="text-4xl font-bold text-green-600">Users</h2>
					<button className="btn bg-green-700 px-10 py-2 text-white" onClick={() => addHandler()}>
						Add
					</button>
				</div>
				<Table fields={userFields} data={users} loading={loading} title={"client"} idModal={"deleteUser"} getDataByIdHandler={getUserByIdHandler} />
				<Modal title="User Form">
					<form className="flex flex-col" onSubmit={submitModalHandler}>
						{userFields.map((el, i) => {
							return (
								<div className="py-2" key={i}>
									<label htmlFor={el[0]}>{el[0]}</label>
									<input type={el[1]} placeholder={`Enter ${el[0]}`} defaultValue={currentUser?.[el[0]]} className="mt-1 input input-bordered input-warning w-full " name={el} />
								</div>
							);
						})}
						<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Submit"}
						</button>
					</form>
				</Modal>
				<Modal id="deleteUser">
					<div className="flex flex-col gap-5">
						<p className="block">Are you sure want to delete {currentUser?.name}?</p>
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
		</>
	);
};

export default User;
