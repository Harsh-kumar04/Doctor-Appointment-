import express from "express";
import { addBasic, address, getcity } from "../controller/cli_controller.js";

const clinic = express.Router();
clinic.post("/add", addBasic);
clinic.post("/address", address);
clinic.post("/getcity", getcity);

export default clinic;
