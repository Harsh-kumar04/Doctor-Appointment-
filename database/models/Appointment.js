import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Appointment extends Model {
    static associate(models) {
      // Appointment belongs to User
      Appointment.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      // Appointment belongs to Doctor
      Appointment.belongsTo(models.Doctor, {
        foreignKey: "doctor_id",
        as: "doctor",
      });
    }
  }

  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Approved", "Pending"),
        defaultValue: "Approved",
      },
    },
    {
      sequelize,
      modelName: "Appointment",
      tableName: "Appointments",
      timestamps: true,
    }
  );

  return Appointment;
};
