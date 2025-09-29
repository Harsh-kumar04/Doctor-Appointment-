import jwt from "jsonwebtoken";
import db from "../../../../database/models/index.js";

const User = db.User;
const Category = db.Category;
const doctor = db.doctor;

export const profilemodule = {
  async get(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const user = await User.findByPk(userId, {
        attributes: {
          exclude: [
            "password",
            "token",
            "social",
            "login_type",
            "login_status",
            "last_login",
            "createdAt",
            "updatedAt",
          ],
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ code: 200, message: "User profile", data: user });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
  },

  async getcategory(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      jwt.verify(token, process.env.JWT_SECRET);

      const categories = await Category.findAll({
        attributes: ["id", "name"],
      });

      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }

      return res.json({
        code: 200,
        message: "All categories",
        data: categories,
      });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
  },

  async doctor(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      jwt.verify(token, process.env.JWT_SECRET);

      // Get filters & pagination
      const { categoryId, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (categoryId) {
        where.categoryId = categoryId; // filter by category
      }

      const data = await doctor.findAndCountAll({
        where,
        attributes: ["id", "name", "email", "phone", "details"],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      if (!data.rows.length) {
        return res.status(404).json({ message: "No data found" });
      }

      return res.json({
        code: 200,
        message: "All Doctors",
        total: data.count,
        page: parseInt(page),
        limit: parseInt(limit),
        data: data.rows,
      });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
  },

  async docterid(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      jwt.verify(token, process.env.JWT_SECRET);

      const { id } = req.params;

      const data = await doctor.findByPk(id, {
        attributes: ["id", "name", "email", "phone", "details"],
      });

      if (!data) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      return res.json({
        code: 200,
        message: "Doctor details",
        data: data,
      });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
  },
};
