import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Favourite extends Model {
    static associate(models) {
      Favourite.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Favourite.belongsTo(models.Doctor, {
        foreignKey: "doctor_id",
        as: "doctor",
      });
    }
  }

  Favourite.init(
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
    },
    {
      sequelize,
      modelName: "Favourite",
      tableName: "Favourites",
      timestamps: true,
    }
  );

  return Favourite;
};
