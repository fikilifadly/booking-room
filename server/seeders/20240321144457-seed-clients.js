"use strict";

const clients = require("../data/user.json").map((el) => {
	if (!el.role) el.role = "Staff";

	el.createdAt = new Date();
	el.updatedAt = new Date();
	el.password = hashPass(el.password);

	return el;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		if (!el.role) el.role = "Staff";

		el.createdAt = new Date();
		el.updatedAt = new Date();
		el.password = hashPass(el.password);

		return el;

		await queryInterface.bulkInsert("Users", user, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
