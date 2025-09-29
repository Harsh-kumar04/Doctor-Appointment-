import { Sequelize } from "sequelize";
import process from "process";
import UserModel from "./user.js";
import CategoryModel from "./Category.js";
import FavouriteDoctor from "./FavouriteDoctor.js";
import doctorModel from "./doctor.js";
import AppointmentModel from "./Appointment.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load config.json manually
const configFile = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/config.json"), "utf8")
);

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ✅ Initialize models
db.User = UserModel(sequelize);
db.Category = CategoryModel(sequelize);
db.Favourite = FavouriteDoctor(sequelize);
db.doctor = doctorModel(sequelize);
db.Appointment = AppointmentModel(sequelize);
export default db;
