import express from "express";
import session from "express-session";
import config from "./config.js";
import { router } from "./routers/auth.routes.js";
import morgan from "morgan";
import cors from "cors";
import { connectorDB } from "./db/database.js";
const app = express();

connectorDB();
app.use(express.json());
app.use(
  session({
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(morgan("dev"));
app.use(cors());

app.use(router);

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
