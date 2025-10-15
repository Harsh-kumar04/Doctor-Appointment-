import { checkvalidation, sendApiResponse } from "../../../../config/common.js";
import Codes from "../../../../config/status_code.js";
import { Encrypt_decrypt } from "../../../../middleware/middleware.js";
import { validation } from "../../validationrule.js";
import { docter } from "../models/doc_model.js";
import db from "../../../../database/models/index.js";
const Category = db.Category;

export const sendOtp = async (req, res) => {
  try {
    const encryptedData = req.body.data;
    if (!encryptedData)
      return sendApiResponse(res, Codes.VALIDATION_ERROR, "No data to decrypt");

    let decryptedData;
    try {
      decryptedData = JSON.parse(Encrypt_decrypt.decrypt(encryptedData));
    } catch {
      return sendApiResponse(res, Codes.ERROR, "Invalid encrypted data");
    }

    const valid = checkvalidation(decryptedData, validation.docter_signup);
    if (!valid.status)
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error);

    return docter.sendotp(decryptedData, res);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        "Email and OTP required"
      );

    return docter.verifyOtp(email, otp, res);
  } catch (err) {
    return sendApiResponse(res, Codes.ERROR, err.message);
  }
};

export const signup = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return sendApiResponse(res, 401, "Token missing or invalid");
    }

    const { data: encryptedData } = req.body;
    if (!encryptedData) return sendApiResponse(res, 400, "No data to decrypt");

    let decryptedData;
    try {
      decryptedData = JSON.parse(Encrypt_decrypt.decrypt(encryptedData));
    } catch {
      return sendApiResponse(res, 400, "Invalid encrypted data");
    }

    const valid = checkvalidation(decryptedData, validation.docter_reg);
    if (!valid.status) return sendApiResponse(res, 400, valid.error);

    const mainSpeciality = await Category.findByPk(
      decryptedData.main_speciality
    );
    if (!mainSpeciality)
      return sendApiResponse(res, 400, "Main speciality ID not valid");

    if (
      decryptedData.multiple_speciality &&
      Array.isArray(decryptedData.multiple_speciality)
    ) {
      const found = await Category.findAll({
        where: { id: decryptedData.multiple_speciality },
      });
      if (found.length !== decryptedData.multiple_speciality.length)
        return sendApiResponse(res, 400, "Some speciality IDs are invalid");
    }

    // Pass both decryptedData and userEmail to the model
    return docter.signup(decryptedData, req.user.email, res);
  } catch (err) {
    return sendApiResponse(res, 500, err.message);
  }
};
export const login = (req, res) => {
  try {
    const { data: encryptedData } = req.body;
    if (!encryptedData)
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        "No data to decrypt",
        null
      );

    let decryptedData;
    try {
      decryptedData = JSON.parse(Encrypt_decrypt.decrypt(encryptedData));
    } catch (err) {
      return sendApiResponse(res, Codes.ERROR, "Invalid encrypted data", null);
    }

    // Add validation check
    const valid = checkvalidation(decryptedData, validation.docter_login);
    if (!valid.status) {
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }

    return docter.login(decryptedData, res);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
