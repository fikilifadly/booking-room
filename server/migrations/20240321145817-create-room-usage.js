"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("RoomUsages", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			clientId: {
				references: {
					model: "clients",
					key: "id",
				},
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			roomId: {
				references: {
					model: "rooms",
					key: "id",
				},
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			startTime: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			endTime: {
				allowNull: false,
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("RoomUsages");
	},
};
