"use strict";

const rooms = require("../data/rooms.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("rooms", rooms, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("rooms", null, {});
	},
};
