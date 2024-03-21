"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("rooms", {
			fields: ["id"],
			type: "primary key",
			name: "rooms_pkey",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("rooms", "rooms_pkey");
	},
};
