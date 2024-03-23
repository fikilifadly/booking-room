import { useEffect } from "react";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal";
import { removeModalHandler, showModalHandler } from "../utils";
import { createRoomUsage, deleteRoomUsage, editRoomUsage, fetchRoomUsages, getRoomUsageById, setNullCurrentRoomUsage } from "../stores/roomUsage";
import { fetchRooms } from "../stores/roomSlice";
import { fetchClients } from "../stores/clientSlice";

let roomUsageFields = [
	["startTime", "time"],
	["endTime", "time"],
	["bookingDate", "date"],
	["qoutaUsed", "number"],
];

const RoomUsage = () => {
	const { rooms } = useSelector((state) => state.room);
	const { clients } = useSelector((state) => state.client);
	const { roomUsages, loading, currentRoomUsage } = useSelector((state) => state.roomUsage);
	const dispatch = useDispatch();

	const mergeRoomUsageFields = [["clientId", clients], ["roomId", rooms], ...roomUsageFields];
	console.log(mergeRoomUsageFields);
	console.log(roomUsages);

	useEffect(() => {
		dispatch(fetchRoomUsages());
		dispatch(fetchRooms());
		dispatch(fetchClients());
	}, [dispatch]);

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [clientId, roomId, startTime, endTime, bookingDate, qoutaUsed] = e.target;

		const data = {
			clientId: clientId.value,
			roomId: roomId.value,
			startTime: startTime.value,
			endTime: endTime.value,
			bookingDate: bookingDate.value,
			qoutaUsed: qoutaUsed.value,
		};

		if (!currentRoomUsage) {
			dispatch(createRoomUsage(data)).then((res) => {
				console.log(res.payload, "=======");
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchRoomUsages());
				}
			});
		} else {
			dispatch(editRoomUsage({ ...data, id: currentRoomUsage.id })).then((res) => {
				if (res.payload) {
					removeModalHandler();
					dispatch(fetchRoomUsages());
				}
			});
		}
	};

	const addHandler = () => {
		dispatch(setNullCurrentRoomUsage());
		showModalHandler();
	};

	const getRoomUsageByIdHandler = (id) => {
		dispatch(getRoomUsageById(id));
	};

	const deleteHandler = () => {
		dispatch(deleteRoomUsage(currentRoomUsage.id)).then((res) => {
			if (res.payload) {
				removeModalHandler();
				dispatch(fetchRoomUsages());
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
			<Table fields={mergeRoomUsageFields} data={roomUsages} loading={loading} idModal="deleteRoomUsage" getDataByIdHandler={getRoomUsageByIdHandler} />
			<Modal title="Room Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>
			<Modal id="deleteRoomUsage">
				<div className="getflex flex-col gap-5">
					<p className="block">Are you sure want to delete {currentRoomUsage?.name}?</p>
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

export default RoomUsage;
