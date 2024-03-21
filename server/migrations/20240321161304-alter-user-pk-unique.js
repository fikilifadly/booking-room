"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("user", {
			fields: ["id"],
			type: "primary key",
			name: "user_pkey",
		});

		await queryInterface.addIndex("user", ["email"], {
			name: "user_email_unique",
			unique: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("user", "user_pkey");
		await queryInterface.removeIndex("user", "user_email_unique");
	},
};
