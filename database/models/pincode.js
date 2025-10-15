import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Pincode extends Model {
    static associate(models) {
      Pincode.belongsTo(models.City, { foreignKey: "cityId", as: "city" });
    }
  }

  Pincode.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      code: { type: DataTypes.STRING, allowNull: false },
      cityId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "Pincode", tableName: "Pincodes", timestamps: true }
  );

  return Pincode;
};
