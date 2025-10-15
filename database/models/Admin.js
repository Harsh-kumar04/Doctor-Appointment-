import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class AccessCode extends Model {}

  AccessCode.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "AccessCode",
      tableName: "AccessCodes",
      timestamps: true,
    }
  );

  return AccessCode;
};
