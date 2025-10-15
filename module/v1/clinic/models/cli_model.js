import db from "../../../../database/models/index.js";
const { Clinic, Category, City, State } = db;

export const clinc = {
  addBasic: async (decryptedData, user_id, res) => {
    try {
      const speciality = await Category.findOne({
        where: { id: decryptedData.speciality },
      });

      if (!speciality) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "Invalid speciality",
        });
      }

      const clinicCount = await Clinic.count({ where: { doctorId: user_id } });
      const clinic_order = clinicCount + 1;

      const newClinic = await Clinic.create({
        doctorId: user_id,
        clinic_name: decryptedData.clinic_name,
        speciality: speciality.id,
        multi_speciality: decryptedData.multi_speciality || [speciality.id],
        clinic_order,
      });

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Clinic info added successfully",
        data: {
          clinic_name: newClinic.clinic_name,
          clinic_speciality: speciality.name,
          clinicId: newClinic.id,
          clinic_order: newClinic.clinic_order,
        },
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Error adding clinic info",
        error: error.message,
      });
    }
  },
  async state(decryptedData, res) {
    try {
      const { stateId } = decryptedData;

      const cities = await City.findAll({
        where: { stateId },
        attributes: ["id", "name"],
        order: [["name", "ASC"]],
      });

      if (!cities.length) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: "No cities found for this state",
        });
      }

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Cities fetched successfully",
        data: cities,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Error fetching cities",
        error: error.message,
      });
    }
  },

  async address(decryptedData, user_id, res) {
    try {
      const clinic = await Clinic.findOne({
        where: { doctorId: user_id },
      });

      if (!clinic) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: "Clinic not found for this doctor",
        });
      }

      clinic.address = decryptedData.address;
      clinic.cityId = decryptedData.cityId;
      clinic.stateId = decryptedData.stateId;
      clinic.pincode = decryptedData.pincode;
      clinic.log = decryptedData.log;
      clinic.lat = decryptedData.lat;

      await clinic.save();

      // Reload with associations
      await clinic.reload({
        include: [
          { model: db.City, as: "city", attributes: ["id", "name"] },
          { model: db.State, as: "state", attributes: ["id", "name"] },
        ],
      });

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Clinic address updated successfully",
        data: {
          address: clinic.address,
          cityId: clinic.cityId,
          stateId: clinic.stateId,
          pincode: clinic.pincode,
          log: clinic.log,
          lat: clinic.lat,
        },
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Error updating clinic address",
        error: error.message,
      });
    }
  },
};
