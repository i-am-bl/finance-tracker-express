import { Model, DataTypes } from "sequelize";
import { sequelizeTransactions } from "../database/db.js";

class Account extends Model {}

/*
 * Account is comparable to an expense of deposit account.
 */

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    no: { type: DataTypes.STRING(325), allowNull: true },
    startOn: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endOn: { type: DataTypes.DATEONLY, allowNull: true },
  },
  {
    sequelize: sequelizeTransactions,
    modelName: "Account",
    tableName: "accounts",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default Account;
