import { config } from "dotenv";
import { sequelizeTransactions } from "./db.js";
import models from "../models/index.js";

config();

const env = process.env.ENV;

export async function syncModels() {
  if (env == "development") {
    try {
      await sequelizeTransactions.authenticate();
      console.log("Connection was made to database instance: transactions");

      await sequelizeTransactions.sync({ force: false, alter: false });
      console.log("Models were successfully synced.");
    } catch (error) {
      console.log("Models sync was unsuccessful.", error);
    }
  }
}
