import { Model, DataTypes } from "sequelize";
import { sequelizeTransactions } from "../database/db.js";

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    name: {
      type: DataTypes.STRING(325),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["debit", "credit"],
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    postingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeTransactions,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default Transaction;
