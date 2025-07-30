import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subdomain: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9-]+$/
    }
  },
  description: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  timezone: {
    type: DataTypes.STRING,
    defaultValue: 'America/New_York'
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD'
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
});

// Associations
Business.hasMany(User, { as: 'users', foreignKey: 'businessId' });
User.belongsTo(Business, { as: 'business', foreignKey: 'businessId' });

export default Business; 