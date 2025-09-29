import db from "../../../../database/models/index.js";
const Favourite = db.Favourite;
const Doctor = db.doctor;

export const fav = {
  async add({ user_id, doctor_id }) {
    const doctor = await Doctor.findByPk(doctor_id);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const existingFav = await Favourite.findOne({
      where: { user_id, doctor_id },
    });
    if (existingFav) {
      throw new Error("Already in favourites");
    }

    const favDoctor = await Favourite.create({ user_id, doctor_id });
    return favDoctor;
  },

  async remove({ user_id, doctor_id }) {
    const existingFav = await Favourite.findOne({
      where: { user_id, doctor_id },
    });
    if (!existingFav) throw new Error("Doctor not in favourites");

    await Favourite.destroy({ where: { user_id, doctor_id } });
    return { user_id, doctor_id };
  },
};
