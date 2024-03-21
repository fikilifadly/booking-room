"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("roomUsage", "id", {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			autoIncrement: 2,
			primaryKey: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("roomUsage", "id", {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		});
	},
};
