"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('CREATE SEQUENCE IF NOT EXISTS "roomUsage_id_seq" RESTART WITH 1 INCREMENT BY 2;');

		await queryInterface.addIndex("roomUsage", ["id"], {
			defaultValue: {
				raw: "nextval('roomUsage_id_seq'::regclass)",
			},
		});

		await queryInterface.addIndex("roomUsage", ["roomId"], {
			name: "roomUsage_roomId",
			refferences: {
				model: {
					tableName: "room",
				},
				key: "id",
			},
		});

		await queryInterface.addIndex("roomUsage", ["clientId"], {
			name: "roomUsage_userId",
			refferences: {
				model: {
					tableName: "user",
				},
				key: "id",
			},
		});

		await queryInterface.addConstraint("roomUsage", {
			fields: ["id"],
			type: "primary key",
			name: "roomUsage_pkey",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.query('DROP SEQUENCE IF EXISTS "roomUsage_id_seq" CASCADE;');
		await queryInterface.removeConstraint("roomUsage", "roomUsage_pkey");
	},
};
