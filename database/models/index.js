import { Sequelize } from "sequelize";
import process from "process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import UserModel from "./user.js";
import CategoryModel from "./Category.js";
import FavouriteDoctorModel from "./FavouriteDoctor.js";
import DoctorModel from "./doctor.js";
import AppointmentModel from "./Appointment.js";
import AccessCodeModel from "./Admin.js";
import ClinicModel from "./clinc.js";
import StateModel from "./state.js";
import CityModel from "./city.js";
import PincodeModel from "./pincode.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load config.json manually
const configFile = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/config.json"), "utf8")
);

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// ✅ Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// ✅ Initialize models
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = UserModel(sequelize);
db.Category = CategoryModel(sequelize);
db.FavouriteDoctor = FavouriteDoctorModel(sequelize);
db.Doctor = DoctorModel(sequelize);
db.Appointment = AppointmentModel(sequelize);
db.AccessCode = AccessCodeModel(sequelize);
db.Clinic = ClinicModel(sequelize);
db.State = StateModel(sequelize);
db.City = CityModel(sequelize);
db.Pincode = PincodeModel(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
