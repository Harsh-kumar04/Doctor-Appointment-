import db from "../../../../database/models/index.js";
const Doctor = db.doctor;
const Appointment = db.Appointment;

export const appoint = {
  async add(decryptedData, userId) {
    const { doctor_id, date, time } = decryptedData;

    if (!userId) throw new Error("User ID missing");

    const doctor = await Doctor.findByPk(doctor_id);
    if (!doctor) throw new Error("Doctor not found");

    const existingApp = await Appointment.findOne({
      where: { user_id: userId, doctor_id, date, time },
    });

    if (existingApp) throw new Error("Already Booked Appointment");

    const newApp = await Appointment.create({
      user_id: userId,
      doctor_id,
      date,
      time,
    });

    return newApp;
  },
};
