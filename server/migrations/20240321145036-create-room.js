"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("rooms", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			roomName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			costPerHour: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("rooms");
	},
};
