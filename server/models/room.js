"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Room.init(
		{
			roomName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Room name is required",
					},
					notEmpty: {
						msg: "Room name is required",
					},
				},
			},
			costPerHour: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Cost per Hour is required",
					},
					notEmpty: {
						msg: "Cost per Hour is required",
					},
				},
			},
		},
		{
			sequelize,
			tableName: "rooms",
			modelName: "Room",
		}
	);
	return Room;
};
