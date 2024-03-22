"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('CREATE SEQUENCE IF NOT EXISTS "user_id_seq" RESTART WITH 1 INCREMENT BY 2;');

		await queryInterface.addIndex("user", ["id"], {
			defaultValue: {
				raw: "nextval('user_id_seq'::regclass)",
			},
		});

		await queryInterface.addConstraint("user", {
			fields: ["id"],
			type: "primary key",
			name: "user_pkey",
		});

		await queryInterface.addIndex("user", ["email"], {
			name: "user_email_unique",
			unique: true,
		});

		await queryInterface.addColumn("user", "password", {
			type: Sequelize.STRING(255),
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('DROP SEQUENCE IF EXISTS "user_id_seq" CASCADE;');
		await queryInterface.removeConstraint("user", "user_pkey");
		await queryInterface.removeIndex("user", "user_email_unique");
	},
};
