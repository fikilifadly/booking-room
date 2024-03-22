"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("roomUsage", {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			clientId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			roomId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			startTime: {
				allowNull: false,
				type: Sequelize.STRING(150),
			},
			endTime: {
				allowNull: false,
				type: Sequelize.STRING(150),
			},
			bookingDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			quotaUsed: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("roomUsage");
	},
};
