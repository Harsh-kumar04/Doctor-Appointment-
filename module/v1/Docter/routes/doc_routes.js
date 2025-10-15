import express from "express";
import {
  login,
  sendOtp,
  signup,
  verifyOtp,
} from "../controller/doc_controller.js";
import { verifyToken } from "../../../../middleware/middleware.js";

const docter = express.Router();

docter.post("/singup", sendOtp);
docter.post("/otp", verifyOtp);
docter.post("/Profile", verifyToken, signup);
docter.post("/login", login);

export default docter;
