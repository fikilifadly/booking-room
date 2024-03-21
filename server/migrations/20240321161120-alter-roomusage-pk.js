"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("roomUsage", {
			fields: ["id"],
			type: "primary key",
			name: "roomUsage_pkey",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("roomUsage", "roomUsage_pkey");
	},
};
