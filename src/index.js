import { app } from "./app.js";
import { sq } from "./db/db.js";
import { sync, User } from "./model/User.js";
import { Product, syncP } from "./model/Product.js";

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

  sync();
  syncP();
  Product.belongsTo(User,{
    foreignKey : "owner_user_id",
    as:"user",
  });

  app.listen(PORT, () => {
    console.log(`Running on the PORT: ${PORT}`);
  });
};

start();