import db from "../../../../database/models/index.js";
import {
  generateAccessCode,
  sendApiResponse,
} from "../../../../config/common.js";

const AccessCode = db.AccessCode;

export const code = async (req, res) => {
  try {
    const { count } = req.body;

    if (!count || isNaN(count) || count <= 0)
      return sendApiResponse(res, 400, "Count is required and must be > 0");

    const codes = [];
    for (let i = 0; i < count; i++) {
      codes.push({ code: generateAccessCode() });
    }

    const createdCodes = await AccessCode.bulkCreate(codes);

    return sendApiResponse(res, 200, "Access codes created", createdCodes);
  } catch (err) {
    return sendApiResponse(res, 500, err.message);
  }
};
