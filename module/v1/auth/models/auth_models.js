import db from "../../../../database/models/index.js";
import Codes from "../../../../config/status_code.js";
import en from "../../../../document/v1/languages/en.js";
import {
  sendApiResponse,
  hashPassword,
  generateToken,
} from "../../../../config/common.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = db.User;

export const authmodel = {
  async signup(decryptedData, res) {
    try {
      // Check if email exists
      const isEmailExist = await User.findOne({
        where: { email: decryptedData.email },
      });

      if (isEmailExist) {
        return sendApiResponse(
          res,
          Codes.VALIDATION_ERROR,
          en.rest_keywords_duplicate_email,
          null
        );
      }

      // Hash password if provided
      if (decryptedData.password) {
        decryptedData.password = await hashPassword(decryptedData.password);
      }

      // Default role
      if (!decryptedData.role) decryptedData.role = "User";

      // Create user
      const user = await User.create(decryptedData);

      return sendApiResponse(res, Codes.SUCCESS, en.rest_signup_added_success, {
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      return sendApiResponse(res, Codes.ERROR, error.message, null);
    }
  },

  async login(decryptedData, res) {
    try {
      let user;

      // Normal login
      if (decryptedData.login_type === "n") {
        if (!decryptedData.email || !decryptedData.password) {
          return sendApiResponse(
            res,
            Codes.VALIDATION_ERROR,
            "Email and password are required",
            null
          );
        }

        user = await User.findOne({ where: { email: decryptedData.email } });
        if (!user) {
          return sendApiResponse(
            res,
            Codes.UNAUTHORIZED,
            en.rest_keywords_invalid_logindetails,
            null
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
            en.rest_keywords_invalid_logindetails,
            null
          );
        }
      } else {
        // Social login
        if (!decryptedData.social_id || !decryptedData.login_type) {
          return sendApiResponse(
            res,
            Codes.VALIDATION_ERROR,
            "Social ID and login type are required",
            null
          );
        }

        user = await User.findOne({
          where: {
            login_type: decryptedData.login_type,
            social_id: decryptedData.social_id,
          },
        });

        if (!user) {
          user = await User.create({
            name: decryptedData.name || "New User",
            email: decryptedData.email,
            login_type: decryptedData.login_type,
            social_id: decryptedData.social_id,
          });
        }
      }

      // Generate JWT token
      const tokenPayload = { id: user.id, email: user.email };
      const token = generateToken(tokenPayload);

      // Update user login info
      user.token = token;
      user.login_status = true;
      user.last_login = new Date();
      await user.save();

      return sendApiResponse(
        res,
        Codes.SUCCESS,
        en.rest_keywords_user_login_success,
        {
          token,
          user: {
            id: user.id,
            login_type: user.login_type,
            user_name: user.name,
            email: user.email,
            role: user.role,
          },
        }
      );
    } catch (error) {
      return sendApiResponse(res, Codes.ERROR, error.message, null);
    }
  },
  async logout(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ where: { id: decoded.id, token } });
      if (!user) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      await User.update({ token: null }, { where: { id: user.id } });

      return res.json({ code: 200, message: "Logout successful" });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
  },
};
