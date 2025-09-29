import express from "express";
import dotenv from "dotenv";
import router from "./module/v1/auth/routes/auth_routes.js";
import db from "./database/models/index.js";
import getroutes from "./module/v1/profile/routes/profile_routes.js";
import favroutes from "./module/v1/favourite/routes/fav_routes.js";
import appoiroutes from "./module/v1/Apointment/routes/appoint_routes.js";

const { sequelize } = db;
dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", router);
app.use("/get", getroutes);
app.use("/fav", favroutes);
app.use("/appoint", appoiroutes);

app.get("/", (req, res) => res.send("server is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
sequelize
  .sync()
  .then(() => {
    console.log("All tables are synced!");
  })
  .catch((err) => {
    console.error(" Sync error:", err);
  });
// await sequelize.sync({ force: true });
