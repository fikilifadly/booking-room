"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("rooms", "id", {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		});

		await queryInterface.sequelize.query(`
      ALTER TABLE rooms AUTO_INCREMENT = 4;
    `);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("rooms");
	},
};
