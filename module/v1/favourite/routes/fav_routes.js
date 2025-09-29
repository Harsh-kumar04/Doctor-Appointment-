import express from "express";
import { addfav, removefav } from "../controller/fav_controller.js";

const favroutes = express.Router();

favroutes.post("/addfav", addfav);
favroutes.post("/remove", removefav);

export default favroutes;
