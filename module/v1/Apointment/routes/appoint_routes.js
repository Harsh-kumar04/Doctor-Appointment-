import express from "express";
import { addAPP } from "../controller/appoint_control.js";

const appoiroutes = express.Router();

appoiroutes.post("/add", addAPP);

export default appoiroutes;
