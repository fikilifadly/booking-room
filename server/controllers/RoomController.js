const room = require("../models/room");

module.exports = class RoomController {
	static async addRoom(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Room Name and Cost is required", status: 400 };
			}

			const { roomName, costPerHour } = req.body;

			const room = await room.create({
				roomName,
				costPerHour,
			});
			res.status(201).json(room);
		} catch (error) {
			next(error);
		}
	}

	static async editRoom(req, res, next) {
		try {
			const { id } = req.params;
			console.log("masuk");
			const room = await room.findByPk(id);

			if (!room) throw { name: "Room not found", status: 404 };
			if (!req.body) throw { name: "Bad Request", status: 400 };

			const { roomName, costPerHour } = req.body;
			await room.update(
				{
					roomName,
					costPerHour,
				},
				{
					where: {
						id,
					},
				}
			);
			res.status(200).json(room);
		} catch (error) {
			next(error);
		}
	}

	static async deleteRoom(req, res, next) {
		try {
			const { id } = req.params;
			const room = await room.findByPk(id);
			if (!room) throw { name: "Room not found", status: 404 };
			const data = await room.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({ message: `Room: ${data.roomName} has been deleted` });
		} catch (error) {
			next(error);
		}
	}

	static async getAllRoom(req, res, next) {
		try {
			const data = await room.findAll();
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
};
