import bcrypt from "bcryptjs";
import Validator from "validatorjs";
import jwt from "jsonwebtoken";

export const checkvalidation = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    const errors = validation.errors.all();
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorKey][0];
    return { status: false, error: firstErrorMessage };
  }
  return { status: true };
};

// API response helper
export const sendApiResponse = (res, resCode, msgKey, resData = null) => {
  const responsejson = { code: resCode, message: msgKey };
  if (resData !== null) responsejson.data = resData;
  return res.status(resCode).json(responsejson);
};

// Password hashing
export const hashPassword = async (password) => {
  try {
    const hashpassword = await bcrypt.hash(password, 10);
    return hashpassword;
  } catch (error) {
    throw error; // better than returning error object
  }
};

// JWT token generator
export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d", // customize expiry
  });
};
