import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class State extends Model {
    static associate(models) {
      State.hasMany(models.City, { foreignKey: "stateId", as: "cities" });
    }
  }

  State.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "State", tableName: "States", timestamps: true }
  );

  return State;
};
