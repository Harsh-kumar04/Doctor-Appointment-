import express from "express";
import { enc, login, logout, signup } from "../controller/auth_controller.js";

const routes = express.Router();

routes.post("/encrypt", enc);
routes.post("/singup", signup);
routes.post("/login", login);
routes.get("/logout", logout);

export default routes;
