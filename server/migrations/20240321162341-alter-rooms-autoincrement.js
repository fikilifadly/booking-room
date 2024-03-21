"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("rooms", "id", {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			autoIncrement: 4,
			primaryKey: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("rooms", "id", {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		});
	},
};
