import { checkvalidation, sendApiResponse } from "../../../../config/common.js";
import Codes from "../../../../config/status_code.js";
import { Encrypt_decrypt } from "../../../../middleware/middleware.js";
import { validation } from "../../validationrule.js";
import { fav } from "../models/fav_model.js";
import jwt from "jsonwebtoken";


export const addfav = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return sendApiResponse(
        res,
        Codes.UNAUTHORIZED,
        "No token provided",
        null
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    const { data } = req.body;
    const decryptedData = JSON.parse(Encrypt_decrypt.decrypt(data));

    // Combine doctor_id with user_id from token
    const favData = { user_id, doctor_id: decryptedData.doctor_id };

    // Validation
    const valid = checkvalidation(favData, validation.favvalidation);
    if (!valid.status) {
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }

    const result = await fav.add(favData);

    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Doctor added to favourites",
      result
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};



export const removefav = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return sendApiResponse(
        res,
        Codes.UNAUTHORIZED,
        "No token provided",
        null
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    const { data } = req.body;
    const decryptedData = JSON.parse(Encrypt_decrypt.decrypt(data));

    // Combine user_id from token with doctor_id from request
    const favData = { user_id, doctor_id: decryptedData.doctor_id };

    // Validation
    const valid = checkvalidation(favData, validation.favvalidation);
    if (!valid.status) {
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }

    const result = await fav.remove(favData);

    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Doctor removed from favourites",
      result
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
