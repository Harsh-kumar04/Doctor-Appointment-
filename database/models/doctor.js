import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Doctor extends Model {
    static associate(models) {
      // Link doctor to main category only
      Doctor.belongsTo(models.Category, {
        foreignKey: "main_speciality",
        as: "mainCategory",
      });
      Doctor.hasMany(models.Clinic, {
        foreignKey: "doctorId",
        as: "clinics",
      });

      // Remove association for multiple_speciality because it's JSON
      // If you want, you can handle it manually in code
    }
  }

  Doctor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: { type: DataTypes.STRING, allowNull: true },
      last_name: { type: DataTypes.STRING, allowNull: true },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: true },
      token: { type: DataTypes.STRING, allowNull: true },
      otp: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      experience: { type: DataTypes.JSON, allowNull: true },
      state_medical_council: { type: DataTypes.STRING, allowNull: true },
      year_of_graduation: { type: DataTypes.STRING, allowNull: true },
      multiple_speciality: { type: DataTypes.JSON, allowNull: true }, // Keep as JSON, no foreign key
      main_speciality: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      access_code: { type: DataTypes.STRING, allowNull: true },
      notification: { type: DataTypes.BOOLEAN, defaultValue: true },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Doctor",
      tableName: "Doctors",
      timestamps: true,
    }
  );

  return Doctor;
};
