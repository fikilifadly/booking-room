const { signToken, comparePass } = require("../lib");
const { User } = require("../models");

module.exports = class UserController {
	static async register(req, res, next) {
		try {
			if (!req.body) {
				throw { name: "Name, Email and Password is required", status: 400 };
			}

			const { email } = req.body;

			await User.create(req.body);

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

			console.log("masuk");
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
};
