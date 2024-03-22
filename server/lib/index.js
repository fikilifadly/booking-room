const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPass = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

const comparePass = (plainPass, hashedPass) => {
	return bcrypt.compareSync(plainPass, hashedPass);
};

const signToken = (payload) => {
	return jwt.sign(payload, process.env.SECRET);
};

const verifyToken = (token) => {
	return jwt.verify(token, process.env.SECRET);
};

const timeFormatChecker = (time) => {
	if (typeof time !== "string") {
		throw { name: "Invalid time", status: 400 };
	}

	let hours;
	let minutes;
	if (time.indexOf(":") > -1) {
		[hours, minutes] = time.split(":");
	} else {
		throw { name: "Invalid time", status: 400 };
	}
	hours = Number(hours);
	minutes = Number(minutes);
	console.log(hours, minutes);
	if (hours >= 0 && minutes >= 0) {
		if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
			console.log("disini");
			throw { name: "Invalid time", status: 400 };
		}
	} else {
		console.log("disini2");
		throw { name: "Invalid time", status: 400 };
	}

	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}`;
};

module.exports = { hashPass, comparePass, signToken, verifyToken, timeFormatChecker };
