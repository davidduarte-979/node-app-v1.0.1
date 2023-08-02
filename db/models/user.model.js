import sequelize from 'sequelize';
const { Model, DataTypes, Sequelize } = sequelize;
const USER_TABLE = 'users';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  displayName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      ModelName: 'User',
      timestamps: false,
    };
  }
}

export {
  USER_TABLE,
  User,
  userSchema,
};
