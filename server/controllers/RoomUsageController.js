const { timeFormatChecker } = require("../lib");
const { Client, Room, RoomUsage } = require("../models");

module.exports = class RoomUsageController {
	static async getAllRoomUsage(req, res, next) {
		try {
			const roomUsage = await RoomUsage.findAll();
			res.status(200).json(roomUsage);
		} catch (error) {
			next(error);
		}
	}

	static async addRoomUsage(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "User Id, Room Id and Date is required", status: 400 };
			}

			const { clientId, roomId, startTime, endTime, bookingDate, quotaUsed } = req.body;

			const client = await Client.findByPk(clientId);
			if (!client) throw { name: "Client not found", status: 404 };
			const room = await Room.findByPk(roomId);
			if (!room) throw { name: "Room not found", status: 404 };

			const usedRoom = await RoomUsage.findOne({
				where: {
					roomId,
				},
			});
			if (usedRoom) throw { name: "Room already taken", status: 400 };

			timeFormatChecker(startTime);
			timeFormatChecker(endTime);

			if (startTime > endTime) throw { name: "Invalid time", status: 400 };
			if (bookingDate < new Date()) throw { name: "Invalid date", status: 400 };

			const roomUsage = await RoomUsage.create({ clientId, roomId, startTime, endTime, bookingDate, quotaUsed });
			res.status(201).json(roomUsage);
		} catch (error) {
			next(error);
		}
	}

	static async editRoomUsage(req, res, next) {
		try {
			console.log("===========");
			const { id } = req.params;
			const roomUsage = await RoomUsage.findByPk(id);

			if (!roomUsage) throw { name: "Room usage not found", status: 404 };
			console.log("masp");
			if (!req.body) throw { name: "Bad Request", status: 400 };
			const { clientId, roomId, startTime, endTime, bookingDate, quotaUsed } = req.body;

			if (!clientId && !roomId && !startTime && !endTime && !bookingDate && !quotaUsed) {
				console.log("masp");
				throw { name: "Bad Request", status: 400 };
			}

			if (startTime && endTime) {
				console.log("masp");
				timeFormatChecker(startTime);
				timeFormatChecker(endTime);
				if (startTime > endTime) throw { name: "Invalid time", status: 400 };
			}
			if (startTime && !endTime) {
				console.log("masp 2");
				timeFormatChecker(startTime);
				if (startTime > roomUsage.endTime) throw { name: "Invalid time", status: 400 };
			}

			if (!startTime && endTime) {
				timeFormatChecker(endTime);
				if (roomUsage.startTime > endTime) throw { name: "Invalid time", status: 400 };
			}

			if (bookingDate) {
				if (bookingDate < new Date()) throw { name: "Invalid date", status: 400 };
			}

			console.log("masuk");
			if (roomId) {
				const usedRoom = await RoomUsage.findOne({
					where: {
						roomId,
					},
				});

				if (usedRoom && usedRoom.clientId !== clientId) throw { name: "Room already taken", status: 400 };
			}

			const newRoomUsage = {
				...roomUsage,
				...Object.entries(req.body).filter(([key, value]) => key in roomUsage && value !== undefined), // Filter by key existence and defined value
			};

			await roomUsage.update(newRoomUsage, {
				where: {
					id,
				},
			});
			res.status(200).json({ message: `Roomusage ${roomUsage.id} has been updated` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteRoomUsage(req, res, next) {
		try {
			const { id } = req.params;
			const roomUsage = await RoomUsage.findByPk(id);
			if (!roomUsage) throw { name: "Room usage not found", status: 404 };
			await RoomUsage.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({ message: `Room usage: ${roomUsage.clientId} has been deleted` });
		} catch (error) {
			next(error);
		}
	}
};
