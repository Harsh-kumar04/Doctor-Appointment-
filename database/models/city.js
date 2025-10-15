import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class City extends Model {
    static associate(models) {
      // Correct association — matches column 'stateId'
      City.belongsTo(models.State, { foreignKey: "stateId", as: "stateData" });
      City.hasMany(models.Pincode, { foreignKey: "cityId", as: "pincodes" });
    }
  }

  City.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      stateId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "City",
      tableName: "Cities",
      timestamps: true,
    }
  );

  return City;
};
