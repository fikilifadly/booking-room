"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("clients", "id", {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
		});
		await queryInterface.sequelize.query("ALTER SEQUENCE clients_id_seq RESTART WITH 3;");
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("clients", "id", {
			type: Sequelize.INTEGER,
			allowNull: false,
		});
	},
};
