import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // associations yaha banegi
      User.hasMany(models.Appointment, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      social: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      login_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "n",
      },
      login_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};
