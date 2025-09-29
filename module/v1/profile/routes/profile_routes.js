import express from "express";
import {
  getcategory,
  getdoctor,
  getdoctorid,
  getprofile,
} from "../controller/profile_controller.js";

const getroutes = express.Router();

getroutes.get("/profile", getprofile);
getroutes.get("/category", getcategory);
getroutes.get("/doctors", getdoctor);
getroutes.get("/doctor/:id", getdoctorid);

export default getroutes;
