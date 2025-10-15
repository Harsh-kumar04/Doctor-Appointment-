import { sendApiResponse } from "../../../../config/common.js";
import jwt from "jsonwebtoken";
import { Encrypt_decrypt } from "../../../../middleware/middleware.js";
import { appoint } from "../model/appoint_model.js";

export const addAPP = (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return sendApiResponse(res, 401, "No token provided", null);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { data } = req.body;
    const decryptedData = JSON.parse(Encrypt_decrypt.decrypt(data));

    return appoint
      .add(decryptedData, userId)
      .then((result) => sendApiResponse(res, 200, "Appointment booked", result))
      .catch((err) => sendApiResponse(res, 400, err.message, null));
  } catch (err) {
    return sendApiResponse(res, 500, err.message, null);
  }
};
  


