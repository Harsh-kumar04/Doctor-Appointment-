import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Clinic extends Model {
    static associate(models) {
      Clinic.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "doctor",
      });

      // Make sure foreignKey matches column name in DB
      Clinic.belongsTo(models.City, { foreignKey: "cityId", as: "city" });
      Clinic.belongsTo(models.State, { foreignKey: "stateId", as: "state" });
    }
  }

  Clinic.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Doctors", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      clinic_name: { type: DataTypes.STRING, allowNull: false },
      speciality: { type: DataTypes.STRING, allowNull: false },
      multi_speciality: { type: DataTypes.JSON, allowNull: false },
      clinic_order: { type: DataTypes.INTEGER, allowNull: false },

      address: { type: DataTypes.STRING },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Cities", key: "id" },
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "States", key: "id" },
      },

      pincode: { type: DataTypes.STRING },
      log: { type: DataTypes.STRING },
      lat: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Clinic",
      tableName: "Clinics",
      timestamps: true,
    }
  );

  return Clinic;
};
