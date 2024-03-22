const { signToken, comparePass } = require("../lib");
const { User } = require("../models");

module.exports = class UserController {
	static async register(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Name, Email and Password is required", status: 400 };
			}

			const { name, email, password } = req.body;

			await User.create({ name, email, password });

			const latsUser = await User.findOne({
				attributes: {
					exclude: ["id", "password"],
				},
				where: {
					email,
				},
			});

			res.status(201).json(latsUser);
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Email and Password is required", status: 400 };
			}
			const { email, password } = req.body;

			if (!email) throw { name: "Email is required", status: 400 };
			if (!password) throw { name: "Password is required", status: 400 };

			const data = await User.findOne({
				where: {
					email,
				},
			});

			console.log(data);
			if (!data) throw { name: "Invalid email/password", status: 401 };

			const matchPass = comparePass(password, data.password);
			if (!matchPass) throw { name: "Invalid email/password", status: 401 };

			const access_token = signToken({ id: data.id });

			res.status(200).json({ access_token });
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const { id } = req.params;

			const user = await User.findOne({
				where: {
					id,
				},
			});

			if (!user) throw { name: "User not found", status: 404 };

			const data = await User.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({ message: `User: ${user.name} has been deleted` });
		} catch (error) {
			next(error);
		}
	}

	static async edit(req, res, next) {
		try {
			const { id } = req.params;
			const user = await User.findOne({
				where: {
					id,
				},
			});
			if (!user) throw { name: "User not found", status: 404 };

			if (!req.body) throw { name: "Bad Request", status: 400 };
			const { name, email, password } = req.body;
			if (!name && !email && !password) throw { name: "Bad Request", status: 400 };

			const newUser = {
				...user,
				...Object.entries(req.body).filter(([key, value]) => key in user && value !== undefined), // Filter by key existence and defined value
			};

			await User.update(newUser, {
				where: {
					id,
				},
			});
			res.status(200).json({ message: `User: ${user.name} has been updated` });
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const users = await User.findAll({
				attributes: {
					exclude: ["password"],
				},
			});
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}
};
