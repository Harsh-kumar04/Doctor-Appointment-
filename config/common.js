import bcrypt from "bcryptjs";
import Validator from "validatorjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import db from "../database/models/index.js";

const doctor = db.Doctor;

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

export const generateToken = (doctor) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  const payload = {
    id: doctor.id,
    email: doctor.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "25m" });
};

export const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const sendOtp = async (toEmail, otp) => {
  const config = {
    service: "gmail", // use service instead of host/port
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  try {
    console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL);
    console.log("SMTP_PASS length:", process.env.SMTP_PASS);
    console.log("config:", config);

    await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
      html: `<p>Your OTP code is <b>${otp}</b></p>`,
    });

    console.log("OTP email sent successfully");
  } catch (err) {
    console.error("Error sending OTP email:", err.message);
    throw new Error("Failed to send OTP email");
  }
};

export function generateAccessCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let part1 = "";
  for (let i = 0; i < 3; i++) {
    part1 += letters[Math.floor(Math.random() * letters.length)];
  }

  let part2 = "";
  for (let i = 0; i < 4; i++) {
    part2 += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return part1 + part2; // Example: ABC1234
}
