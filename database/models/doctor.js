import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Doctor extends Model {
    static associate(models) {
      // Link doctor to category
      Doctor.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
    }
  }

  Doctor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
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
