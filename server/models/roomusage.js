"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class RoomUsage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	RoomUsage.init(
		{
			clientId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Client id is required",
					},
					notEmpty: {
						msg: "Client id is required",
					},
				},
			},
			roomId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Room id is required",
					},
					notEmpty: {
						msg: "Room id is required",
					},
				},
			},
			startTime: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Start time is required",
					},
					notEmpty: {
						msg: "Start time is required",
					},
				},
			},
			endTime: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "End time is required",
					},
					notEmpty: {
						msg: "End time is required",
					},
				},
			},
			bookingDate: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Booking date is required",
					},
					notEmpty: {
						msg: "Booking date is required",
					},
				},
			},
			quotaUsed: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Quota used is required",
					},
					notEmpty: {
						msg: "Quota used is required",
					},
				},
			},
		},
		{
			sequelize,
			tableName: "roomUsage",
			modelName: "RoomUsage",
		}
	);
	return RoomUsage;
};
