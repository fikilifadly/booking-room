"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, sequelize) {
		await queryInterface.sequelize.query('CREATE SEQUENCE IF NOT EXISTS "clients_id_seq" RESTART WITH 1 INCREMENT BY 3;');

		await queryInterface.addIndex("clients", ["id"], {
			defaultValue: {
				raw: "nextval('client_id_seq'::regclass)",
			},
		});

		await queryInterface.addConstraint("clients", {
			fields: ["id"],
			primaryKey: true,
			type: "primary key",
			name: "clients_pkey",
		});

		await queryInterface.addIndex("clients", ["email"], {
			unique: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('DROP SEQUENCE IF EXISTS "clients_id_seq" CASCADE;');
		await queryInterface.sequelize.query("ALTER TABLE clients DROP CONSTRAINT clients_pkey;");
	},
};
