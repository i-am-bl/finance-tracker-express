import { Model, DataTypes } from "sequelize";
import { sequelizeTransactions } from "../database/db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(325),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(325),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeTransactions,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default User;
