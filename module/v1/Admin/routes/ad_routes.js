import express from "express";
import { code } from "../controller/ad_controller.js";

const admin = express.Router();

admin.post("/code", code);

export default admin;
