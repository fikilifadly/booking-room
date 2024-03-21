"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("clients", {
			fields: ["id"],
			type: "primary key",
			name: "clients_pkey",
		});

		await queryInterface.addIndex("clients", ["email"], {
			name: "clients_email_unique",
			unique: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("clients", "clients_pkey");
		await queryInterface.removeIndex("clients", "clients_email_unique");
	},
};
