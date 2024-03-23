const { Room } = require("../models");

module.exports = class RoomController {
	static async addRoom(req, res, next) {
		try {
			console.log(Room);
			if (!req.body) {
				throw { name: "Room Name and Cost is required", status: 400 };
			}

			const { roomName, costPerHour } = req.body;

			const room = await Room.create({
				roomName,
				costPerHour,
			});
			res.status(201).json({ message: "Room has been created" });
		} catch (error) {
			next(error);
		}
	}

	static async editRoom(req, res, next) {
		try {
			const { id } = req.params;
			const room = await Room.findByPk(id);

			if (!room) throw { name: "Room not found", status: 404 };
			if (!req.body) throw { name: "Bad Request", status: 400 };
			const { roomName, costPerHour } = req.body;

			if (!roomName && !costPerHour) throw { name: "Bad Request", status: 400 };

			let newRoom = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => key in room && value !== undefined && value !== null && value !== ""));

			await room.update(newRoom);
			await room.save();
			res.status(200).json({ message: `Room: ${room.roomName} has been updated` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteRoom(req, res, next) {
		try {
			const { id } = req.params;
			const room = await Room.findByPk(id);
			if (!room) throw { name: "Room not found", status: 404 };
			const data = await Room.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({ message: `Room: ${room.roomName} has been deleted` });
		} catch (error) {
			next(error);
		}
	}

	static async getAllRoom(req, res, next) {
		try {
			const data = await Room.findAll({ order: [["id", "ASC"]] });
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async getRoomById(req, res, next) {
		try {
			const { id } = req.params;
			const room = await Room.findByPk(id);
			if (!room) throw { name: "Room not found", status: 404 };
			res.status(200).json(room);
		} catch (error) {
			next(error);
		}
	}
};
