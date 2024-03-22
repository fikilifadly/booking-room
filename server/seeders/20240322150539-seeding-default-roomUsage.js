"use strict";

const roomUsages = require("../data/roomUsages.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("roomUsage", roomUsages, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("roomUsage", null, {});
	},
};
