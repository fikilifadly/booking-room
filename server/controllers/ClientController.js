const { Client } = require("../models");

module.exports = class ClientController {
	static async getAllClients(req, res, next) {
		try {
			const data = await Client.findAll({ order: [["id", "ASC"]] });
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async getClientById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Client.findByPk(id);
			if (!data) throw { name: "Client not found", status: 404 };
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async addClient(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Bad Request", status: 400 };
			}

			const { name, email, phone, credit } = req.body;

			const client = await Client.create({ name, email, phone, credit });
			res.status(201).json({
				message: `${client.name} has been added`,
			});
		} catch (error) {
			next(error);
		}
	}

	static async editClient(req, res, next) {
		try {
			const { id } = req.params;
			const client = await Client.findByPk(id);

			if (!client) throw { name: "Client not found", status: 404 };
			if (!req.body) throw { name: "Bad Request", status: 400 };
			const { name, email, phone, credit } = req.body;

			if (!name && !email && !phone && !credit) throw { name: "Bad Request", status: 400 };

			let newClient = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => key in client && value !== undefined && value !== null && value !== ""));

			await client.update(newClient);
			await client.save();
			res.status(200).json({ message: `${client.name} has been updated` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteClient(req, res, next) {
		try {
			const { id } = req.params;
			const client = await Client.findByPk(id);
			if (!client) throw { name: "Client not found", status: 404 };
			await Client.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({ message: `${client.name} has been deleted` });
		} catch (error) {
			next(error);
		}
	}
};
