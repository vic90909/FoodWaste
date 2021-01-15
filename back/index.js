import express from "express";
import bodyParser from "body-parser";
import db from "./dbConfig.js";
import { DB_USERNAME, DB_PASSWORD } from "./Const.js";
import db2 from "./dbConfigMySql.js";
import User from "./routes/UserRoute.js";
import Food from "./routes/FoodRoutes.js";
import Friends from "./routes/FriendsRouter.js";
import Group from "./routes/GroupRouter.js";
import GroupsUsers from "./routes/GroupsUsers.js";
import cors from "cors";
import mysql from "mysql2/promise";

const router = express.Router();

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", User);
app.use("/api", Food);
app.use("/api", Friends);
app.use("/api", Group);
app.use("/api", GroupsUsers);
app.use("/api",router);



// db.authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

let conn;

mysql
  .createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD,
  })
  .then((connection) => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS Products");
  })
  .then(() => {
    return conn.end();
  })
  .catch((err) => {
    console.warn(err.stack);
  });

router.route("/create").get(async (req, res) => {
  try {
    await db2.sync({ force: true });
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err.stack);
    res.status(500).json({ message: "server error" });
  }
});




let port = process.env.PORT || 8080;

app.listen(port);
console.log("API is runnning at " + port);
