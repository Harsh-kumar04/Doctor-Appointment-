import db from "../../../../database/models/index.js";
import bcrypt from "bcryptjs";
import {
  sendApiResponse,
  generateOTP,
  sendOtp,
  hashPassword,
  generateToken,
} from "../../../../config/common.js";
import Codes from "../../../../config/status_code.js";

const Doctor = db.Doctor;
const AccessCode = db.AccessCode;
const sequelize = db.sequelize;

export const docter = {
  async sendotp(decryptedData, res) {
    try {
      let doctor = await Doctor.findOne({
        where: { email: decryptedData.email },
      });

      if (doctor && doctor.isVerified)
        return sendApiResponse(res, 400, "Email already registered");

      const otp = generateOTP();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

      if (!doctor) {
        doctor = await Doctor.create({
          email: decryptedData.email,
          first_name: decryptedData.first_name || null,
          last_name: decryptedData.last_name || null,
          phone: decryptedData.phone || null,
          otp,
          otp_expires_at: otpExpiry,
          isVerified: false,
        });
      } else {
        doctor.otp = otp;
        doctor.otp_expires_at = otpExpiry;
        await doctor.save();
      }

      await sendOtp(decryptedData.email, otp);

      return sendApiResponse(res, 200, "OTP sent successfully", {
        email: doctor.email,
      });
    } catch (error) {
      return sendApiResponse(res, 500, error.message);
    }
  },

  async verifyOtp(email, otp, res) {
    try {
      const doctor = await Doctor.findOne({ where: { email } });
      if (!doctor) return sendApiResponse(res, 404, "Doctor not found");

      if (doctor.otp_expires_at < new Date())
        return sendApiResponse(res, 400, "OTP expired");

      if (doctor.otp !== otp) return sendApiResponse(res, 400, "Invalid OTP");

      const token = generateToken({ email: doctor.email });
      doctor.token = token;

      doctor.isVerified = true;
      doctor.otp = null;
      doctor.otp_expires_at = null;
      doctor.token = token;
      await doctor.save();

      return sendApiResponse(res, 200, "Email verified successfully", {
        token,
        email: doctor.email,
      });
    } catch (err) {
      return sendApiResponse(res, 500, err.message);
    }
  },

  async signup(decryptedData, userEmail, res) {
    try {
      const doctor = await Doctor.findOne({ where: { email: userEmail } });

      if (!doctor)
        return sendApiResponse(res, 404, "Doctor not found or token invalid");

      if (!decryptedData.access_code)
        return sendApiResponse(res, 400, "Access code is required");

      const accessCode = await AccessCode.findOne({
        where: { code: decryptedData.access_code, isUsed: false },
      });

      if (!accessCode)
        return sendApiResponse(res, 403, "Invalid or already used access code");

      if (!Array.isArray(decryptedData.experience))
        return sendApiResponse(res, 400, "Experience must be an array");

      if (decryptedData.year_of_graduation.toString().length !== 4)
        return sendApiResponse(res, 400, "Year of graduation must be 4 digits");

      if (!decryptedData.password)
        return sendApiResponse(res, 403, "Please enter password");

      const hashedPassword = await hashPassword(decryptedData.password);

      await sequelize.transaction(async (t) => {
        const fieldsToUpdate = [
          "first_name",
          "last_name",
          "phone",
          "experience",
          "state_medical_council",
          "year_of_graduation",
          "multiple_speciality",
          "main_speciality",
        ];

        fieldsToUpdate.forEach((field) => {
          if (decryptedData[field] !== undefined)
            doctor[field] = decryptedData[field];
        });

        doctor.password = hashedPassword;

        await doctor.save({ transaction: t });

        accessCode.isUsed = true;
        accessCode.doctorId = doctor.id;
        await accessCode.save({ transaction: t });
      });

      return sendApiResponse(res, 200, "Profile updated successfully");
    } catch (err) {
      return sendApiResponse(res, 500, err.message);
    }
  },

  async login(decryptedData, res) {
    try {
      if (!decryptedData.email || !decryptedData.password) {
        return sendApiResponse(
          res,
          Codes.VALIDATION_ERROR,
          "Email and password are required"
        );
      }

      const user = await Doctor.findOne({
        where: { email: decryptedData.email },
      });
      if (!user) {
        return sendApiResponse(
          res,
          Codes.UNAUTHORIZED,
          "Invalid login details"
        );
      }

      const isPassCorrect = await bcrypt.compare(
        decryptedData.password,
        user.password
      );
      if (!isPassCorrect) {
        return sendApiResponse(
          res,
          Codes.UNAUTHORIZED,
          "Invalid login details"
        );
      }

      // Generate JWT token
      const tokenPayload = { email: user.email };
      const token = generateToken(user);

      // Update user login info
      user.token = token;
      user.login_status = true;
      user.last_login = new Date();
      await user.save();

      return sendApiResponse(res, Codes.SUCCESS, "User login successful", {
        token,
        user: {
          email: user.email,
        },
      });
    } catch (error) {
      return sendApiResponse(res, Codes.ERROR, error.message);
    }
  },
};
