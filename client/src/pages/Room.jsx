import { useEffect } from "react";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal";
import { removeModalHandler, showModalHandler } from "../utils";
import { createRoom, deleteRoom, editRoom, fetchRooms, getRoomById, setNullCurrentRoom } from "../stores/roomSlice";

const roomFields = [
	["roomName", "text"],
	["costPerHour", "number"],
];

const Room = () => {
	const { rooms, loading, currentRoom } = useSelector((state) => state.room);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch]);

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [name, cost] = e.target;

		const data = {
			roomName: name.value,
			costPerHour: cost.value,
		};

		if (!currentRoom) {
			dispatch(createRoom(data)).then((res) => {
				console.log(res.payload, "=======");
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchRooms());
				}
			});
		} else {
			dispatch(editRoom({ ...data, id: currentRoom.id })).then((res) => {
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchRooms());
				}
			});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentRoom());
		showModalHandler();
	};

	const getRoomByIdHandler = (id) => {
		dispatch(getRoomById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteRoom(currentRoom.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(fetchRooms());
			}
		});
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Rooms</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add
				</button>
			</div>
			<Table fields={roomFields} data={rooms} loading={loading} idModal="deleteRoom" getDataByIdHandler={getRoomByIdHandler} />
			<Modal title="Room Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					{roomFields.map((el, i) => {
						return (
							<div className="py-2" key={i}>
								<label htmlFor={el[0]}>{el[0]}</label>
								<input type={el[1]} placeholder={`Enter ${el[0]}`} defaultValue={currentRoom?.[el[0]]} className="mt-1 input input-bordered input-warning w-full " name={el} />
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>
			<Modal id="deleteRoom">
				<div className="getflex flex-col gap-5">
					<p className="block">Are you sure want to delete {currentRoom?.name}?</p>
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

export default Room;
