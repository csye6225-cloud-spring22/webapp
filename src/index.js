import { app } from "./app.js";
import { sq } from "./db/db.js";
import { sync, User } from "./model/User.js";
import { Product, syncP } from "./model/Product.js";
import { syncI, Image } from "./model/Image.js";
import {winston, logger} from "./winston/winston-log.js";

const PORT = "8000" || process.env.PORT;

const start = async () => {
  sq
    .authenticate()
    .then(() => {
      console.log("Connection to the Database is success");
    })
    .catch((err) => {
      console.error("Unable to Connec to the Database ");
    });

  sync({alter :true});
  syncP({alter :true});
  syncI({alter :true});
  Product.belongsTo(User,{
    foreignKey : "owner_user_id",
    as:"user",
  });
  Image.belongsTo(Product,{
    foreignKey : "product_id",
    as:"product",
  });
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  app.listen(PORT, () => {
    console.log(`Running on the PORT: ${PORT}`);
  });
};

start();