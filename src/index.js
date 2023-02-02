import { app } from "./app.js";
import { sq } from "./db/db.js";
import { sync } from "./model/User.js";

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

  app.listen(PORT, () => {
    console.log(`Running on the PORT: ${PORT}`);
  });
};

start();