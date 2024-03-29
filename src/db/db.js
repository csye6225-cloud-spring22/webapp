
import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config()

const sq = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

export { sq };
