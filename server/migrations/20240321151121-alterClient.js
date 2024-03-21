"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("clients", "id", {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		});

		await queryInterface.changeColumn("clients", "email", {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		});

		await queryInterface.sequelize.query(`
      ALTER TABLE clients AUTO_INCREMENT = 3;
    `);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("clients");
	},
};
