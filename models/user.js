'use strict';
var CustomValidations = require('../CustomValidations');
const Speakeasy = require('speakeasy');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: CustomValidations.isUnique('User', 'tagName')
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: CustomValidations.isUnique('User', 'email')
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          min: 6,
          msg: "Password must be atleast 6 characters in length"
        }
      }
    },
    companyOid: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    },
    scopes: {
      withPassword: {
        attributes: { exclude: ['active', 'createdAt', 'updatedAt'] },
      }
    },
    hooks: {
      beforeCreate: function (user) {
        const bcrypt = require('bcryptjs');
        user.password = user.password ? user.password : "";
        user.password = bcrypt.hashSync(user.password, 10);
      },
      beforeSave: async function (user) {
        const bcrypt = require('bcryptjs');
        if (user.password) {
          if (user.password.length !== 60) {
            user.password = user.password ? user.password : "";
            user.password = bcrypt.hashSync(user.password, 10);
          }
        }
      }
    }
  });
  User.associate = function (models) {
    User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'userOid', as: 'roles' });
    User.belongsToMany(models.Action, { through: models.UserAction, foreignKey: 'userOid', as: 'actions' });
    User.belongsTo(models.Company, { foreignKey: 'companyOid', as: 'company' });
    User.hasOne(models.Employee, { foreignKey: 'userOid', as: 'employee' });
  };

  User.prototype.getPrivileges = async function () {
    const roles = await this.getRoles();
    const allPrivileges = [];
    await Promise.all(roles.map(async role => {
      const privileges = await role.getPrivileges();
      privileges.forEach(privilege => allPrivileges.push(privilege));
      return privileges;
    }));
    return allPrivileges;
  };

  User.prototype.validatePassword = function (confirmPassword) {
    const bcrypt = require('bcryptjs');
    this.password = this.password ? this.password : "";
    return bcrypt.compareSync(confirmPassword, this.password)
  };

  User.prototype.generateLocalTfaToken = async function () {
    const secret = Speakeasy.generateSecret().base32;
    return Speakeasy.totp({
      secret,
      encoding: 'base32',
      step: 60, // Seconds by step
      window: 5 // Number of steps
    });
  };

  return User;
};