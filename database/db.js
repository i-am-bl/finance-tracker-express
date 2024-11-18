import { Sequelize } from "sequelize";
import { config } from "dotenv";
import cnst from "../constants/constants.js";

config();

const usrnm = process.env.DB_USRNM;
const pwd = process.env.DB_PWD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const connectionString = `mysql://${usrnm}:${pwd}@${host}:${port}`;

const sequelizeDB = new Sequelize(connectionString, {
  dialect: "mysql",
});

const sequelizeTransactions = new Sequelize(cnst.DB_TRANSACTIONS, usrnm, pwd, {
  host: host,
  dialect: "mysql",
  port: port,
});

async function initTransactionSchema() {
  try {
    await sequelizeDB.query(
      `create database if not exists ${cnst.DB_TRANSACTIONS}`
    );
    console.log(
      `Database ${cnst.DB_TRANSACTIONS} was successfully created or already exists.`
    );
  } catch (error) {
    console.log("A connection could not be made.", error);
  }
}

async function initTransactionTables() {
  try {
    await sequelizeTransactions.authenticate();
    console.log(`Connection was successfully made to ${cnst.DB_TRANSACTIONS}`);
  } catch (error) {
    console.log("A connection could not be made.", error);
  }
}

async function initDb() {
  await initTransactionSchema();
  await initTransactionTables();
}

await initDb();

export { sequelizeTransactions };
