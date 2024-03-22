"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('CREATE SEQUENCE IF NOT EXISTS "rooms_id_seq" RESTART WITH 1 INCREMENT BY 4;');

		await queryInterface.addIndex("rooms", ["id"], {
			defaultValue: {
				raw: "nextval('rooms_id_seq'::regclass)",
			},
		});

		await queryInterface.addConstraint("rooms", {
			fields: ["id"],
			primaryKey: true,
			type: "primary key",
			name: "rooms_pkey",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('DROP SEQUENCE IF EXISTS "rooms_id_seq" CASCADE;');
		await queryInterface.sequelize.query("DROP CONSTRAINT IF EXISTS rooms_pkey CASCADE;");
	},
};
