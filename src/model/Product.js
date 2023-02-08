import { DataTypes } from "sequelize";
import { sq } from "../db/db.js";

const Product = sq.define("product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique : true,
    noUpdate : true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    unique : {
        arg : true,
        msg : "Provided SKU is not available. Enter new one",
    },
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    validate:{
        min : 0,
        max :100
    }
  },
  date_added: {
    type: DataTypes.DATE,
  },
  date_last_updated:{
    type: DataTypes.DATE,
    },
//   owner_user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
  },
{
    timestamps: false,
  });

const syncP = () => {
  sq
    .sync()
    .then(() => {
      console.log("Product Table Creation Successful");
    })
    .catch((err) => {
      console.error("Error creating table: " + err);
    });
};
//adding a comment
export { syncP, Product};