'use strict';
var CustomValidations = require('../CustomValidations');
const Speakeasy = require('speakeasy');
const MailController = require('../controllers/MailController');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    Oid: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: CustomValidations.isUnique('Company', 'email')
      },
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: CustomValidations.isUnique('Company', 'rfc')
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    paypalSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    localSubscriptionActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  }, {});
  Company.associate = function (models) {
    Company.hasMany(models.User, { foreignKey: 'companyOid', as: 'users' });
    Company.hasMany(models.Evaluation, { foreignKey: 'companyOid', as: 'evaluations' });
    Company.belongsTo(models.Status, { foreignKey: 'statusId', as: 'status' });
    Company.hasMany(models.Question, { foreignKey: 'companyOid', as: 'questions' });
    Company.hasMany(models.Category, { foreignKey: 'companyOid', as: 'categories' });
    Company.hasMany(models.Domain, { foreignKey: 'companyOid', as: 'domains' });
    Company.hasMany(models.Dimension, { foreignKey: 'companyOid', as: 'dimensions' });
    Company.hasMany(models.SurveySection, { foreignKey: 'companyOid', as: 'surveySections' });
    Company.hasMany(models.SurveyCat, { foreignKey: 'companyOid', as: 'surveyCats' });
    Company.hasMany(models.EmployeeEvaluation, { foreignKey: 'companyOid', as: 'employeeEvaluations' });
  };

  Company.prototype.getAvailableCategories = async function () {
    const Category = require('../models').Category;
    const publicCategories = await Category.findAll({ where: { companyOid: null } });
    const companyCategories = await this.getCategories();
    return [...publicCategories, ...companyCategories];
  };

  Company.prototype.getAvailableDomains = async function () {
    const Domain = require('../models').Domain;
    const publicDomains = await Domain.findAll({ where: { companyOid: null } });
    const companyDomains = await this.getDomains();
    return [...publicDomains, ...companyDomains];
  };

  Company.prototype.getAvailableDimensions = async function () {
    const Dimension = require('../models').Dimension;
    const publicDimensions = await Dimension.findAll({ where: { companyOid: null } });
    const companyDimensions = await this.getDimensions();
    return [...publicDimensions, ...companyDimensions];
  };

  Company.prototype.getAvailableQuestions = async function () {
    const Question = require('../models').Question;
    const publicQuestions = await Question.findAll({ where: { companyOid: null } });
    const companyQuestions = await this.getQuestions();
    return [...publicQuestions, ...companyQuestions];
  };

  Company.prototype.getAvailableSurveySections = async function () {
    const SurveySection = require('../models').SurveySection;
    const publicSurveySections = await SurveySection.findAll({ where: { companyOid: null } });
    const companySurveySections = await this.getSurveySections();
    return [...publicSurveySections, ...companySurveySections];
  };

  Company.prototype.newEmployee = async function (userData, employeeData, roleId = 4) {
    const User = require('../models').User;
    const Employee = require('../models').Employee;
    userData.companyOid = this.Oid;
    userData.password = await this.randomUserPassword();
    return sequelize.transaction(transaction => {
      return User.create(userData, { transaction }).then(user => {
        return user.addRole(roleId, { transaction }).then(async () => {
          employeeData.userOid = user.Oid;
          return Employee.create(employeeData, { transaction }).then(employee => {
            MailController.sendMail(user.email, "Nuevo usuario",
              `Estimado ${employee.fullName}, se ha dado de alta un nuevo usuario para la empresa ${this.name}, se recomienda cambiar la contraseña. \n 
            Los datos de usuario son: \n \n 
            Correo: ${user.email} \n
            Contraseña: ${userData.password}`);
            return employee;
          });
        });
      });
    });
  };

  Company.prototype.randomUserPassword = async function () {
    const secret = Speakeasy.generateSecret().base32;
    return Speakeasy.totp({
      secret,
      encoding: 'base32',
      step: 60, // Seconds by step
      window: 5 // Number of steps
    });
  };

  Company.prototype.getEmployees = async function () {
    const users = await this.getUsers();
    const employees = [];
    await Promise.all(users.map(async user => {
      const employee = await user.getEmployee();
      if (employee) {
        employees.push(employee);
      }
      return employee;
    }));
    return employees;
  };

  return Company;
};