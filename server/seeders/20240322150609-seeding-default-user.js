"use strict";

const { hashPass } = require("../lib");
const user = require("../data/user.json").map((el) => {
	el.password = hashPass("123456");
	return el;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("user", user, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("user", null, {});
	},
};
