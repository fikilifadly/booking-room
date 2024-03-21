"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("user", "id", {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		});

		await queryInterface.sequelize.query(`
      ALTER TABLE user AUTO_INCREMENT = 2;
    `);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user");
	},
};
