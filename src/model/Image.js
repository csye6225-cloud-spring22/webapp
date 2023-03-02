import { DataTypes } from "sequelize";
import { sq } from "../db/db.js";

const Image = sq.define("image", {
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique : true,
    noUpdate : true
  },

  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  s3_bucket_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_created: {
    type: DataTypes.DATE,
  },
  },
{
    timestamps: false,
  });

const syncI = () => {
  sq
    .sync()
    .then(() => {
      console.log("Image Table Creation Successful");
    })
    .catch((err) => {
      console.error("Error creating table: " + err);
    });
};

export { syncI, Image};