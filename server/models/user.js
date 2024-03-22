"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../lib");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Name is required",
					},
					notEmpty: {
						msg: "Name is required",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Email already exists",
				},
				validate: {
					notNull: {
						msg: "Email is required",
					},
					notEmpty: {
						msg: "Email is required",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password is required",
					},
					notEmpty: {
						msg: "Password is required",
					},
				},
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "user",
			modelName: "User",
			timestamps: false,
		}
	);

	User.beforeValidate(async (user) => {
		user.createdAt = new Date();
	});

	User.beforeCreate(async (user) => {
		user.password = hashPass(user.password);
	});

	return User;
};
