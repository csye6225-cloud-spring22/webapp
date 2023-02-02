import { DataTypes } from "sequelize";
import { sq } from "../db/db.js";

const User = sq.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_created: {
    type: DataTypes.DATE,
  },
  account_updated:{
    type: DataTypes.DATE,

  }
  },
{
    timestamps: false,
  });

const sync = () => {
  sq
    .sync()
    .then(() => {
      console.log("User Table Creation Successful");
    })
    .catch((err) => {
      console.error("Error creating table: " + err);
    });
};
//adding a comment
export { sync, User };