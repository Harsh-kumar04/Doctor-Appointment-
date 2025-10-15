import jwt from "jsonwebtoken";
import { Encrypt_decrypt } from "../../../../middleware/middleware.js";
import { validation } from "../../validationrule.js";
import { checkvalidation, sendApiResponse } from "../../../../config/common.js";
import Codes from "../../../../config/status_code.js";
import { clinc } from "../models/cli_model.js";
import db from "../../../../database/models/index.js";

const docter = db.Doctor;

export const addBasic = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token)
      return sendApiResponse(res, Codes.UNAUTHORIZED, "No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;
    console.log(decoded, user_id);

    const { data } = req.body;
    const decryptedData = JSON.parse(Encrypt_decrypt.decrypt(data));
    console.log(decryptedData);
    const valid = checkvalidation(decryptedData, validation.add_basic_clinic);
    if (!valid.status)
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error);

    return await clinc.addBasic(decryptedData, user_id, res);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message);
  }
};
export const getcity = (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token)
      return sendApiResponse(res, Codes.UNAUTHORIZED, "No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;
    console.log(decoded, user_id);

    const { data } = req.body;
    const decryptedData = JSON.parse(Encrypt_decrypt.decrypt(data));
    console.log(decryptedData);
    const valid = checkvalidation(decryptedData, validation.state);
    if (!valid.status)
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error);

    return clinc.state(decryptedData,  res);
  } catch (error) {}
};
export const address = (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token)
      return sendApiResponse(res, Codes.UNAUTHORIZED, "No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;
    console.log(decoded, user_id);

    const { data } = req.body;
    const decryptedData = JSON.parse(Encrypt_decrypt.decrypt(data));
    console.log(decryptedData);
    const valid = checkvalidation(decryptedData, validation.address);
    if (!valid.status)
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error);

    return clinc.address(decryptedData, user_id, res);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message);
  }
};
