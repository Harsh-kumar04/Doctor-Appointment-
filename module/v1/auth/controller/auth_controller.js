import { Encrypt_decrypt } from "../../../../middleware/middleware.js";
import Codes from "../../../../config/status_code.js";
import en from "../../../../document/v1/languages/en.js";
import { validation } from "../../validationrule.js";
import { checkvalidation, sendApiResponse } from "../../../../config/common.js";
import { authmodel } from "../models/auth_models.js";

export const enc = async (req, res) => {
  try {
    const data = req.body;
    const stringData = JSON.stringify(data);

    const encryptedData = Encrypt_decrypt.encrypt(stringData);
    res.status(Codes.SUCCESS).json({
      message: "FULL OBJECT ENCRYPTED",
      data: encryptedData,
    });
  } catch (err) {
    res.status(Codes.INTERNAL_ERROR).json({
      message: en.data_not_found_for_decryption,
      err,
    });
  }
};

export const signup = (req, res) => {
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

    const valid = checkvalidation(decryptedData, validation.singupvalidation);
    if (!valid.status) {
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }

    return authmodel.signup(decryptedData, res);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
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

    // Validation
    const valid =
      decryptedData.login_type === "n"
        ? checkvalidation(decryptedData, validation.loginvalidation.n)
        : checkvalidation(decryptedData, validation.loginvalidation.s);

    if (!valid.status) {
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }

    return authmodel.login(decryptedData, res);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
export const logout = (req, res) => {
  return authmodel.logout(req, res);
};